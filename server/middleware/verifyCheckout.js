import shopify from "../../utils/shopify.js";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyCheckout = async (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    const authHeader = req.headers["authorization"];
    const match =
      typeof authHeader === "string" && authHeader.match(/^Bearer (\S+)$/);
    if (!match) {
      throw Error("No valid bearer token found.");
    }

    const payload = await shopify.session.decodeSessionToken(match[1]);

    if (!Number.isFinite(payload.exp) || !Number.isFinite(payload.nbf)) {
      throw Error("Session token is missing required timestamps.");
    }

    const shop =
      typeof payload.dest === "string" &&
      shopify.utils.sanitizeShop(payload.dest.replace(/^https:\/\//, ""));
    if (!shop) {
      throw Error("No shop found, not a valid request");
    }

    res.locals.user_shop = shop;

    next();
  } catch {
    console.error("---> An error happened at verifyCheckout middleware.");
    return res.status(401).send({ error: "Unauthorized call" });
  }
};

export default verifyCheckout;
