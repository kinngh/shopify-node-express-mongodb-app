import sessionHandler from "../../utils/sessionHandler.js";
import shopify from "../../utils/shopify.js";
import { RequestedTokenType, Session } from "@shopify/shopify-api";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyRequest = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const match =
      typeof authHeader === "string" && authHeader.match(/^Bearer (\S+)$/);
    if (!match) {
      throw Error("No valid bearer token found.");
    }

    const sessionToken = match[1];
    const payload = await shopify.session.decodeSessionToken(sessionToken);

    if (!Number.isFinite(payload.exp) || !Number.isFinite(payload.nbf)) {
      throw Error("Session token is missing required timestamps.");
    }
    if (typeof payload.sub !== "string" || !payload.sub) {
      throw Error("Session token is missing the admin user.");
    }

    const shop =
      typeof payload.dest === "string" &&
      shopify.utils.sanitizeShop(payload.dest.replace(/^https:\/\//, ""));
    if (!shop) {
      throw Error("No shop found, not a valid request");
    }

    const sessionId = shopify.session.getJwtSessionId(shop, payload.sub);

    let session = await sessionHandler.loadSession(sessionId);
    if (!session) {
      session = await getSession({ shop, sessionToken });
    }

    if (
      new Date(session?.expires) > new Date() &&
      shopify.config.scopes.equals(session?.scope)
    ) {
    } else {
      session = await getSession({ shop, sessionToken });
    }
    if (!session) {
      throw Error("No session found.");
    }
    res.locals.user_session = session;
    next();
  } catch {
    console.error("---> An error happened at verifyRequest middleware.");
    return res.status(401).send({ error: "Unauthorized call" });
  }
};

export default verifyRequest;

/**
 * Exchanges the verified session token for online and expiring offline sessions.
 *
 * @async
 * @function getSession
 * @param {Object} params - The function parameters.
 * @param {string} params.shop - The xxx.myshopify.com url of the requesting store.
 * @param {string} params.sessionToken - The verified Shopify session token.
 * @returns {Promise<Session>} The online session object
 */

async function getSession({ shop, sessionToken }) {
  try {
    const { session: onlineSession } = await shopify.auth.tokenExchange({
      sessionToken,
      shop,
      requestedTokenType: RequestedTokenType.OnlineAccessToken,
    });

    await sessionHandler.storeSession(onlineSession);

    const { session: offlineSession } = await shopify.auth.tokenExchange({
      sessionToken,
      shop,
      requestedTokenType: RequestedTokenType.OfflineAccessToken,
      expiring: true,
    });

    await sessionHandler.storeSession(offlineSession);

    return new Session(onlineSession);
  } catch {
    console.error("---> Error happened while pulling session from Shopify.");
  }
}
