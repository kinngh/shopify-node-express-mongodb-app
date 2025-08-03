import crypto from "crypto";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyProxy = (req, res, next) => {
  const { signature } = req.query;

  const queryURI = req._parsedUrl.query
    .replace("/?", "")
    .replace(/&signature=[^&]*/, "")
    .split("&")
    .map((x) => decodeURIComponent(x))
    .sort()
    .join("");

  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(queryURI, "utf-8")
    .digest("hex");

  if (calculatedSignature === signature) {
    res.locals.user_shop = req.query.shop;
    next();
  } else {
    return res.sendStatus(401);
  }
};

export default verifyProxy;
