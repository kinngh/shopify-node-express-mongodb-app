import { RequestedTokenType } from "@shopify/shopify-api";
import StoreModel from "../../utils/models/StoreModel.js";
import sessionHandler from "../../utils/sessionHandler.js";
import shopify from "../../utils/shopify.js";
import freshInstall from "../../utils/freshInstall.js";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const isInitialLoad = async (req, res, next) => {
  try {
    const shop = req.query.shop;
    const idToken = req.query.id_token;

    if (shop && idToken) {
      const { session: offlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OfflineAccessToken,
      });
      const { session: onlineSession } = await shopify.auth.tokenExchange({
        sessionToken: idToken,
        shop,
        requestedTokenType: RequestedTokenType.OnlineAccessToken,
      });

      await sessionHandler.storeSession(offlineSession);
      await sessionHandler.storeSession(onlineSession);

      const webhookRegistrar = await shopify.webhooks.register({
        session: offlineSession,
      });

      const isFreshInstall = await StoreModel.findOne({
        shop: onlineSession.shop,
      });

      if (!isFreshInstall || isFreshInstall?.isActive === false) {
        // !isFreshInstall -> New Install
        // isFreshInstall?.isActive === false -> Reinstall
        await freshInstall({ shop: onlineSession.shop });
      }

      console.dir(webhookRegistrar, { depth: null });
    }
    next();
  } catch (e) {
    console.error(`---> An error occured in isInitialLoad`, e);
    return res.status(403).send({ error: true });
  }
};

export default isInitialLoad;
