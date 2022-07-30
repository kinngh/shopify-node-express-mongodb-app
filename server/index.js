const Express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Shopify } = require("@shopify/shopify-api");
const { resolve } = require("path");

require("dotenv").config();
require("../devUtils/setupCheck.js")(); //Run a check to see if everything is setup properly.

const sessionStorage = require("../utils/sessionStorage.js");
const csp = require("./middleware/csp.js");
const verifyRequest = require("./middleware/verifyRequest.js");
const isActiveShop = require("./middleware/isActiveShop.js");
const applyAuthMiddleware = require("./middleware/auth.js");
const hmacVerify = require("./middleware/hmacVerify.js");
const userRoutes = require("./routes/index.js");
const { appUninstallHandler } = require("./webhooks/");
const {
  customerDataRequest,
  customerRedact,
  shopRedact,
} = require("./controllers/gdpr.js");
const proxyRouter = require("./routes/app_proxy/index.js");
const proxyVerification = require("./middleware/proxyVerification.js");

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isDev = process.env.NODE_ENV === "dev";

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

//MARK:- Add handlers for webhooks here.

Shopify.Webhooks.Registry.addHandlers({
  APP_UNINSTALLED: {
    path: "/webhooks/app_uninstalled",
    webhookHandler: appUninstallHandler,
  },
});

const createServer = async (root = process.cwd()) => {
  const app = Express();

  app.set("top-level-oauth-cookie", "shopify_top_level_oauth");
  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  //Handle all webhooks in one route
  app.post("/webhooks/:topic", async (req, res) => {
    const { topic } = req.params;
    const shop = req.headers["x-shopify-shop-domain"];

    try {
      await Shopify.Webhooks.Registry.process(req, res);
      console.log(`--> Processed ${topic} webhook for ${shop}`);
    } catch (e) {
      console.log(
        `--> Error while registering ${topic} webhook for ${shop}`,
        e
      );

      if (!res.headersSent) {
        res.status(500).send(e.message);
      }
    }
  });

  app.post("/graphql", verifyRequest(app), async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (err) {
      console.error(err.response);
      res.status(500).send(err.response);
    }
  });

  app.use(Express.json());
  app.use(csp);
  app.use(isActiveShop);
  app.use("/apps", verifyRequest(app), userRoutes); //Verify user route requests
  app.use("/proxy_route", proxyVerification, proxyRouter); //MARK:- App Proxy routes

  app.post("/gdpr/:topic", hmacVerify, async (req, res) => {
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
module.exports = createServer;
