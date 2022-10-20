import { Shopify } from "@shopify/shopify-api";
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";

import setupCheck from "../devUtils/setupCheck.js";
import sessionStorage from "../utils/sessionStorage.js";
import proxyRouter from "./app_proxy_routes/_index.js";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./controllers/_index.js";
import authMiddleware from "./middlewares/auth.js";
import csp from "./middlewares/csp.js";
import isShopActive from "./middlewares/isShopActive.js";
import verifyHmac from "./middlewares/verifyHmac.js";
import verifyProxy from "./middlewares/verifyProxy.js";
import verifyRequest from "./middlewares/verifyRequest.js";
import userRoutes from "./routes/_index.js";
import webhookRegistrar from "./webhooks/_index.js";

setupCheck();

const PORT = parseInt(process.env.PORT, 10) || 8081;

// MongoDB Connection
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-express-app";

mongoose.connect(mongoUrl, (err) => {
  if (err) {
    console.error(
      `---> There was an error connecting to MongoDB: ${e.message}`,
      e
    );
  } else {
    console.log("--> Connected to MongoDB");
  }
});

// Initialize Shopify Context
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_API_SCOPES,
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  HOST_SCHEME: "https",
  API_VERSION: process.env.SHOPIFY_API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: sessionStorage,
});

// Webhook registrar adds all handlers
webhookRegistrar();

const app = express();
authMiddleware(app);

// Handle all webhooks in one route
app.post("/webhooks/:topic", async (req, res) => {
  const { topic } = req.params;
  const shop = req.headers["x-shopify-shop-domain"];

  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log(`--> Processed ${topic} webhook for ${shop}`);
  } catch (e) {
    console.log(`--> Error while registering ${topic} webhook for ${shop}`, e);

    if (!res.headersSent) {
      res.status(401).send(e.message);
    }
  }
});

// GraphQL Proxy
app.post("/graphql", verifyRequest(app), async (req, res) => {
  try {
    const response = await Shopify.Utils.graphqlProxy(req, res);
    res.status(200).send(response.body);
  } catch (err) {
    console.error(err.response);
    res.status(401).send(err.response);
  }
});

app.use(express.json());
app.use(csp);
app.use(isShopActive);
app.use("/apps", verifyRequest(app), userRoutes);
app.use("/proxy_route", verifyProxy, proxyRouter);

// Handle GDPR routes

app.post("/gdpr/:topic", verifyHmac, async (req, res) => {
  const { body } = req;
  const { topic } = req.params;
  const shop = req.body.shop_domain;

  console.warn(`--> GDPR request for ${shop} / ${topic} recieved.`);

  let response;
  switch (topic) {
    case "customers_data_request":
      response = await customerDataRequest(topic, shop, body);
      break;
    case "customers_redact":
      response = await customerRedact(topic, shop, body);
      break;
    case "shop_redact":
      response = await shopRedact(topic, shop, body);
      break;
    default:
      console.error(
        "---> Congratulations on breaking the GDPR route! Here's the topic that broke it: ",
        topic
      );
      response = "broken";
      break;
  }

  if (response.success) {
    res.status(200).send();
  } else {
    res.status(400).send("An error occured");
  }
});

app.use(express.static("dist/"));
app.get("*/", (req, res, next) => {
  //MARK:- The official template checks for app installation and redirect accordingly.
  // Build a better way to do that.

  const isDev = process.env.NODE_ENV === "dev";
  let clientPath;
  if (isDev) {
    path.join(process.cwd(), "index.html");
  } else {
    path.join(process.cwd(), "dist", "index.html");
  }
  res.status(200).set("Content-Type", "text/html").sendFile(clientPath);
});

app.listen(PORT, () => {
  console.log(`--> Server is running on localhost:${PORT}`);
});
