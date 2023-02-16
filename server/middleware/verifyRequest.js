import sessionHandler from "../../utils/sessionHandler.js";
import shopify from "../../utils/shopifyConfig.js";

const TEST_QUERY = `
{
  shop {
    name
  }
}`;

const verifyRequest = async (req, res, next) => {
  try {
    let { shop } = req.query;
    const sessionId = await shopify.session.getCurrentId({
      isOnline: true,
      rawRequest: req,
      rawResponse: res,
    });

    const session = await sessionHandler.loadSession(sessionId);

    if (new Date(session?.expires) > new Date()) {
      // if (session?.isActive()) {
      const client = new shopify.clients.Graphql({ session });
      await client.query({ data: TEST_QUERY });
      res.setHeader(
        "Content-Security-Policy",
        `frame-ancestors https://${session.shop} https://admin.shopify.com;`
      );
      return next();
    }

    const authBearer = req.headers.authorization?.match(/Bearer (.*)/);
    if (authBearer) {
      if (!shop) {
        if (session) {
          shop = session.shop;
        } else if (shopify.config.isEmbeddedApp) {
          if (authBearer) {
            const payload = await shopify.session.decodeSessionToken(
              authBearer[1]
            );
            shop = payload.dest.replace("https://", "");
          }
        }
      }
      res.status(403);
      res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
      res.header(
        "X-Shopify-API-Request-Failure-Reauthorize-Url",
        `/auth?shop=${shop}`
      );
      res.end();
    } else {
      res.redirect(`/auth?shop=${shop}`);
    }
  } catch (e) {
    console.error(e);
  }
};

export default verifyRequest;
