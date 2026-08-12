import shopify from "../../utils/shopify.js";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const verifyProxy = async (req, res, next) => {
  const isValid = await shopify.utils
    .validateHmac(req.query, { signator: "appProxy" })
    .catch(() => false);

  if (isValid) {
    res.locals.user_shop = req.query.shop;
    return next();
  } else {
    return res.status(401);
  }
};

export default verifyProxy;
