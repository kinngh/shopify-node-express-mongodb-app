const Express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { Shopify } = require("@shopify/shopify-api");
const { resolve } = require("path");

require("dotenv").config();

const sessionStorage = require("../utils/sessionStorage.js");
const webhookRoutes = require("./webhooks/_routes.js");
const csp = require("./middleware/csp.js");
const verifyRequest = require("./middleware/verifyRequest.js");
const isActiveShop = require("./middleware/isActiveShop.js");
const applyAuthMiddleware = require("./middleware/auth.js");
const userRoutes = require("./routes/index.js");
const { appUninstallHandler } = require("./webhooks/app_uninstalled.js");
const {
  customerDataRequest,
  customerRedact,
  shopRedact,
} = require("./webhooks/gdpr.js");

const PORT = parseInt(process.env.PORT, 10) || 8081;
const isTest = process.env.NODE_ENV === "dev";
const isProd = process.env.NODE_ENV === "prod";

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
  CUSTOMERS_DATA_REQUEST: {
    path: "/webhooks/gdpr/customers_data_request",
    webhookHandler: customerDataRequest,
  },
  CUSTOMERS_REDACT: {
    path: "/webhooks/gdpr/customers_redact",
    webhookHandler: customerRedact,
  },
  SHOP_REDACT: {
    path: "/webhooks/gdpr/shop_redact",
    webhookHandler: shopRedact,
  },
});

const createServer = async (root = process.cwd()) => {
  const app = Express();
  app.set("top-level-oauth-cookie", "shopify_top_level_oauth");
  app.set("use-online-tokens", true);

  app.use(cookieParser(Shopify.Context.API_SECRET_KEY));

  applyAuthMiddleware(app);

  app.use("/webhooks", webhookRoutes); //webhookRotues

  app.post("/graphql", verifyRequest(app), async (req, res) => {
    try {
      const response = await Shopify.Utils.graphqlProxy(req, res);
      res.status(200).send(response.body);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  app.use(Express.json());
  app.use(csp);
  app.use(isActiveShop);

  let vite;
  if (!isProd) {
    vite = await import("vite").then(({ createServer }) =>
      createServer({
        root,
        logLevel: isTest ? "error" : "info",
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

  app.use("/", userRoutes);

  return { app, vite };
};

if (!isTest) {
  createServer().then(({ app }) => {
    app.listen(PORT, () => {
      console.log(`Running on ${PORT}`);
    });
  });
}
module.exports = createServer;
