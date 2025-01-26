import shopify from "../../utils/shopify.js";
import validateJWT from "../../utils/validateJWT.js";

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
    if (!authHeader) {
      throw Error("No authorization header found");
    }

    const payload = validateJWT(authHeader.split(" ")[1]);

    let shop = shopify.utils.sanitizeShop(payload.dest.replace("https://", ""));

    if (!shop) {
      throw Error("No shop found, not a valid request");
    }

    res.locals.user_shop = shop;

    next();
  } catch (e) {
    console.error(
      `---> An error happened at verifyCheckout middleware: ${e.message}`
    );
    return res.status(401).send({ error: "Unauthorized call" });
  }
};

export default verifyCheckout;
