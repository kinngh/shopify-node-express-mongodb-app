import shopify from "./shopifyConfig.js";

const authRedirect = async (req, res) => {
  if (!req.query.shop) {
    res.status(500);
    return res.send("No shop provided");
  }

  if (req.query.embedded === "1") {
    const shop = shopify.utils.sanitizeShop(req.query.shop);
    const queryParams = new URLSearchParams({
      ...req.query,
      shop,
      redirectUri: `https://${shopify.config.hostName}/auth?shop=${shop}&host=${req.query.host}`,
    }).toString();

    return res.redirect(`/exitframe?${queryParams}`);
  }

  return await shopify.auth.begin({
    shop: req.query.shop,
    callbackPath: "/auth/tokens",
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
};

export default authRedirect;
