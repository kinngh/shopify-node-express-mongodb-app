const { Shopify } = require("@shopify/shopify-api");
const { gdprTopics } = require("@shopify/shopify-api/dist/webhooks/registry");

const SessionModel = require("../../utils/models/SessionModel");
const StoreModel = require("../../utils/models/StoreModel");
const topLevelAuthRedirect = require("../../utils/topLevelAuthRedirect");

const applyAuthMiddleware = (app) => {
  app.get("/auth", async (req, res) => {
    if (!req.signedCookies[app.get("top-level-oauth-cookie")]) {
      return res.redirect(`/auth/toplevel?shop=${req.query.shop}`);
    }

    const redirectUrl = await Shopify.Auth.beginAuth(
      req,
      res,
      req.query.shop,
      "/auth/tokens",
      false //offline token
    );
    res.redirect(redirectUrl);
  });

  app.get("/auth/tokens", async (req, res) => {
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

    res.redirect(redirectUrl);
  });

  app.get("/auth/toplevel", (req, res) => {
    res.cookie(app.get("top-level-oauth-cookie"), "1", {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    });

    res.set("Content-Type", "text/html");

    res.send(
      topLevelAuthRedirect({
        apiKey: Shopify.Context.API_KEY,
        hostName: Shopify.Context.HOST_NAME,
        shop: req.query.shop,
      })
    );
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
          res.status(500);
          res.send(e.message);
          break;
      }
    }
  });
};

module.exports = applyAuthMiddleware;
