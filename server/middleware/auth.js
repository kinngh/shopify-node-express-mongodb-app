import { Shopify } from "@shopify/shopify-api";
import { gdprTopics } from "@shopify/shopify-api/dist/webhooks/registry.js";

import authRedirect from "../../utils/authRedirect.js";
import SessionModel from "../../utils/models/SessionModel.js";
import StoreModel from "../../utils/models/StoreModel.js";

const authMiddleware = (app) => {
  app.get("/auth", async (req, res) => {
    try {
      await authRedirect(req, res);
    } catch (e) {
      const { shop } = req.query;
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400).send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          // Delete sessions and restart installation
          await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          console.error(`---> Error at /auth`, e.message);
          break;
      }
    }
  });

  app.get("/auth/tokens", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const { shop, accessToken } = session;

      const webhookRegistrar = await Shopify.Webhooks.Registry.registerAll({
        shop,
        accessToken,
      });

      Object.entries(webhookRegistrar).map(([topic, response]) => {
        if (!response.success && !gdprTopics.includes(topic)) {
          console.error(
            `--> Failed to register ${topic} for ${shop}.`,
            response.result.errors[0].message
          );
        } else if (!gdprTopics.includes(topic)) {
          console.log(`--> Registered ${topic} for ${shop}`);
        }
      });

      const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/callback",
        true //online tokens
      );

      return res.redirect(redirectUrl);
    } catch (e) {
      const { shop } = req.query;
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          // Delete sessions and restart installation
          await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          console.error(`---> Error at /auth/tokens`, e.message);
          break;
      }
    }
  });

  app.get("/auth/callback", async (req, res) => {
    try {
      const session = await Shopify.Auth.validateAuthCallback(
        req,
        res,
        req.query
      );

      const host = req.query.host;
      const { shop } = session;

      await StoreModel.findOneAndUpdate({ shop }, { isActive: true }); //Update store to true after auth has happened, or it'll cause reinstall issues.

      // Redirect to app with shop parameter upon auth
      res.redirect(`/?shop=${shop}&host=${host}`);
    } catch (e) {
      const { shop } = req.query;
      switch (true) {
        case e instanceof Shopify.Errors.InvalidOAuthError:
          res.status(400);
          res.send(e.message);
          break;
        case e instanceof Shopify.Errors.CookieNotFound:
        case e instanceof Shopify.Errors.SessionNotFound:
          // This is likely because the OAuth session cookie expired before the merchant approved the request
          // Delete sessions and restart installation
          await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
          await SessionModel.deleteMany({ shop });
          res.redirect(`/auth?shop=${shop}`);
          break;
        default:
          res.status(500).send(e.message);
          console.error(`---> Error at /auth/callback`, e.message);
          break;
      }
    }
  });
};

export default authMiddleware;
