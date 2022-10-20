import Shopify from "@shopify/shopify-api";
import { gdprTopics } from "@shopify/shopify-api/dist/webhooks/registry";
import StoreModel from "../../utils/models/StoreModel.js";

const authMiddleware = (app) => {
  app.get("/auth", async (req, res) => {
    if (!req.query.shop) {
      return res.status(500).send("No shop provided");
    }

    try {
      if (req.query.embedded === "1") {
        const shop = Shopify.Utils.sanitizeShop(req.query.shop);

        const redirectUriParams = new URLSearchParams({
          shop,
          host: req.query.host,
        }).toString();

        const queryParams = new URLSearchParams({
          ...req.query,
          shop,
          redirectUri: `https://${Shopify.Context.HOST_NAME}/auth?${redirectUriParams}`,
        }).toString();

        return res.redirect(`/exitiframe?${queryParams}`);
      }

      const redirectUrl = await Shopify.Auth.beginAuth(
        req,
        res,
        req.query.shop,
        "/auth/tokens",
        false //offline tokens
      );
      return res.redirect(redirectUrl);
    } catch (e) {
      //TODO: Better error handling
      console.log(e);
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
            `---> Failed to register ${topic} for ${shop}.`,
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
        false //offline tokens
      );

      return res.redirect(redirectUrl);
    } catch (e) {
      //TODO: Better error handling
      console.log(e);
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

      await StoreModel.findOneAndUpdate({ shop }, { isActive: true });

      res.redirect(`/?shop=${shop}&host=${host}`);
    } catch (e) {
      //TODO: Better error handling
      console.log(e);
    }
  });
};

export default authMiddleware;
