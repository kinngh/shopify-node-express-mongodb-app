const { default: Shopify } = require("@shopify/shopify-api");

const csp = (req, res, next) => {
  const { shop } = req.query;
  if (Shopify.Context.IS_EMBEDDED_APP && shop) {
    res.setHeader(
      "Content-Security-Policy",
      `frame-ancestors https://${shop} https://admin.shopify.com;`
    );
  } else {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
  }

  next();
};

module.exports = csp;
