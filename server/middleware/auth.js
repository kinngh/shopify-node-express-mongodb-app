import {
  BotActivityDetected,
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
} from "@shopify/shopify-api";
import StoreModel from "../../utils/models/StoreModel.js";
import sessionHandler from "../../utils/sessionHandler.js";
import shopify from "../../utils/shopify.js";

const authMiddleware = (app) => {
  app.get("/api/auth", async (req, res) => {
    try {
      if (!req.query.shop) {
        return res.status(500).send("No shop provided");
      }

      if (req.query.embedded === "1") {
        const shop = shopify.utils.sanitizeShop(req.query.shop);
        const queryParams = new URLSearchParams({
          ...req.query,
          shop,
          redirectUri: `https://${shopify.config.hostName}/api/auth?shop=${shop}`,
        }).toString();

        return res.redirect(`/exitframe?${queryParams}`);
      }

      return await shopify.auth.begin({
        shop: req.query.shop,
        callbackPath: "/api/auth/tokens",
        isOnline: false,
        rawRequest: req,
        rawResponse: res,
      });
    } catch (e) {
      console.error(`---> Error at /api/auth`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/api/auth?shop=${shop}`);
          break;
        case e instanceof BotActivityDetected:
          res.status(410).send(e.message);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/api/auth/tokens", async (req, res) => {
    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;

      await sessionHandler.storeSession(session);

      const webhookRegisterResponse = await shopify.webhooks.register({
        session,
      });
      console.dir(webhookRegisterResponse, { depth: null });

      return await shopify.auth.begin({
        shop: session.shop,
        callbackPath: "/api/auth/callback",
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
    } catch (e) {
      console.error(`---> Error at /api/auth/tokens`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/api/auth?shop=${shop}`);
          break;
        case e instanceof BotActivityDetected:
          res.status(410).send(e.message);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/api/auth/callback", async (req, res) => {
    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;
      await sessionHandler.storeSession(session);

      const host = req.query.host;
      const { shop } = session;

      await StoreModel.findOneAndUpdate(
        { shop },
        { isActive: true },
        { upsert: true }
      ); //Update store to true after auth has happened, or it'll cause reinstall issues.

      return res.redirect(`/?shop=${shop}`);
    } catch (e) {
      console.error(`---> Error at /api/auth/callback`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof CookieNotFound:
        case e instanceof InvalidOAuthError:
        case e instanceof InvalidSession:
          res.redirect(`/api/auth?shop=${shop}`);
          break;
        case e instanceof BotActivityDetected:
          res.status(410).send(e.message);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });
};

export default authMiddleware;
