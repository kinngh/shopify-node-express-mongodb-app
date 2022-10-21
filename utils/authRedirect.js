import { Shopify } from "@shopify/shopify-api";

const authRedirect = async (req, res) => {
  if (req.query.embedded === "1") {
    const shop = Shopify.Utils.sanitizeShop(req.query.shop);

    const redirectUriParams = new URLSearchParams({
      shop,
      host: req.query.host,
    }).toString();

    const queryParams = new URLSearchParams({
      ...req.query,
      shop,
      redirectUri: `https://${Shopify.Context.HOST_NAME}/auth?${redirectUriParams}`,
    }).toString();

    return res.redirect(`/exitiframe?${queryParams}`);
  }

  const redirectUrl = await Shopify.Auth.beginAuth(
    req,
    res,
    req.query.shop,
    "/auth/tokens",
    false //offline tokens
  );
  return res.redirect(redirectUrl);
};
export default authRedirect;
