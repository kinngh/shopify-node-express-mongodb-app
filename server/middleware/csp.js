import shopify from "../../utils/shopify.js";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const csp = (req, res, next) => {
  const shop = req.query.shop || "*.myshopify.com";
  if (shopify.config.isEmbeddedApp && shop) {
    res.setHeader(
      "Content-Security-Policy",
      `frame-ancestors https://${shop} https://admin.shopify.com;`
    );
  } else {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
  }

  next();
};

export default csp;
