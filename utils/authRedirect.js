import { Shopify } from "@shopify/shopify-api";

const authRedirect = async (req, res) => {
  if (!req.query.shop) {
    res.status(500);
    return res.send("No shop provided");
  }

  if (req.query.embedded === "1") {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop);
    const queryParams = new URLSearchParams({
      ...req.query,
      shop,
      redirectUri: `https://${Shopify.Context.HOST_NAME}/auth?shop=${shop}&host=${req.query.host}`,
    }).toString();

    return res.redirect(`/exitframe?${queryParams}`);
  }

  const redirectUrl = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    "/auth/tokens",
    false
  );

  return res.redirect(redirectUrl);
};

export default authRedirect;
