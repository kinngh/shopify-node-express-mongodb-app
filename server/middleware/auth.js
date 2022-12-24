import {
  CookieNotFound,
  InvalidOAuthError,
  InvalidSession,
} from "@shopify/shopify-api";
import authRedirect from "../../utils/authRedirect.js";
import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";
import sessionHandler from "../../utils/sessionHandler.js";
import shopify from "../../utils/shopifyConfig.js";

const authMiddleware = (app) => {
  app.get("/auth", async (req, res) => {
    try {
      await authRedirect(req, res);
    } catch (e) {
      console.error(`---> Error at /auth`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof InvalidOAuthError:
          res.status(400).send(e.message);
          break;
        case e instanceof CookieNotFound:
        case e instanceof InvalidSession:
          await StoreModel.findOneAndUpdate(
            { shop },
            { isActive: false },
            { upsert: true }
          );
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/auth/tokens", async (req, res) => {
    try {
      const callbackResponse = await shopify.auth.callback({
        rawRequest: req,
        rawResponse: res,
      });

      const { session } = callbackResponse;

      await sessionHandler.storeSession(session);

      const webhookRegisterResponse = await shopify.webhooks.register({
        session,
      }); //Register all webhooks with offline token
      console.log(webhookRegisterResponse); //This is an array that includes all registry responses.

      return await shopify.auth.begin({
        shop: session.shop,
        callbackPath: "/auth/callback",
        isOnline: true,
        rawRequest: req,
        rawResponse: res,
      });
    } catch (e) {
      console.error(`---> Error at /auth/tokens`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof InvalidOAuthError:
          res.status(400).send(e.message);
          break;
        case e instanceof CookieNotFound:
        case e instanceof InvalidSession:
          await StoreModel.findOneAndUpdate(
            { shop },
            { isActive: false },
            { upsert: true }
          );
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });

  app.get("/auth/callback", async (req, res) => {
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

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${shop}&host=${host}`);
    } catch (e) {
      console.error(`---> Error at /auth/callback`, e);
      const { shop } = req.query;
      switch (true) {
        case e instanceof InvalidOAuthError:
          res.status(400).send(e.message);
          break;
        case e instanceof CookieNotFound:
        case e instanceof InvalidSession:
          await StoreModel.findOneAndUpdate(
            { shop },
            { isActive: false },
            { upsert: true }
          );
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          break;
      }
    }
  });
};

export default authMiddleware;
