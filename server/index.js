import { Shopify } from "@shopify/shopify-api";
import cookieParser from "cookie-parser";
import "dotenv/config";
import Express from "express";
import mongoose from "mongoose";
import { resolve } from "path";

import setupCheck from "../devUtils/setupCheck.js";
import webhookRegistrar from "./webhooks/index.js";

import sessionStorage from "../utils/sessionStorage.js";
import {
  customerDataRequest,
  customerRedact,
  shopRedact,
} from "./controllers/gdpr.js";
import applyAuthMiddleware from "./middleware/auth.js";
import csp from "./middleware/csp.js";
import verifyHmac from "./middleware/verifyHmac.js";
import isShopActive from "./middleware/isShopActive.js";
import verifyProxy from "./middleware/verifyProxy.js";
import verifyRequest from "./middleware/verifyRequest.js";
import proxyRouter from "./routes/app_proxy/index.js";
import userRoutes from "./routes/index.js";

setupCheck(); // Run a check to ensure everything is setup properly

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = process.env.NODE_ENV === "dev";

// MongoDB Connection
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-express-app";

mongoose.connect(mongoUrl, (err) => {
  if (err) {
    console.log(
      "--> An error occured while connecting to MongoDB",
      err.message
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

// Register all webhook handlers
webhookRegistrar();

const createServer = async (root = process.cwd()) => {
  const app = Express();

  app.set("top-level-oauth-cookie", "shopify_top_level_oauth");
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  // Incoming webhook requests
  app.post("/webhooks/:topic", async (req, res) => {
    const { topic } = req.params;
    const shop = req.headers["x-shopify-shop-domain"];

    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`--> Processed ${topic} webhook for ${shop}`);
    } catch (e) {
      console.error(
        `---> Error while registering ${topic} webhook for ${shop}`,
        e
      );

      if (!res.headersSent) {
        res.status(403).send(e.message);
      }
    }
  });

  app.post("/graphql", verifyRequest, async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (err) {
      console.error(err.response);
      res.status(400).send(err.response);
    }
  });

  app.use(Express.json());
  app.use(csp);
  app.use(isShopActive);
  app.use("/apps", verifyRequest, userRoutes); //Verify user route requests
  app.use("/proxy_route", verifyProxy, proxyRouter); //MARK:- App Proxy routes

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
          "--> Congratulations on breaking the GDPR route! Here's the topic that broke it: ",
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

  let vite;
  if (isDev) {
    vite = await import("vite").then(({ createServer }) =>
      createServer({
        root,
        logLevel: isDev ? "error" : "info",
        server: {
          port: PORT,
          hmr: {
            protocol: "ws",
            host: "localhost",
            port: 64999,
            clientPort: 64999,
          },
          middlewareMode: "html",
        },
      })
    );

    app.use(vite.middlewares);
  } else {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    const fs = await import("fs");

    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
  }

  return { app, vite };
};

createServer().then(({ app }) => {
  app.listen(PORT, () => {
    console.log(`--> Running on ${PORT}`);
  });
});
