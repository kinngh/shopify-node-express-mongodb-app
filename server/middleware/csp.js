import shopify from "../../utils/shopifyConfig.js";

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
