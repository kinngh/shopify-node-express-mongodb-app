import { Shopify } from "@shopify/shopify-api";
import authRedirect from "../../utils/authRedirect.js";

const TEST_GRAPHQL_QUERY = `
{
  shop {
    name
  }
}`;

const verifyRequest = async (req, res, next) => {
  let { shop } = req.query;
  const session = await Shopify.Utils.loadCurrentSession(req, res, true);

  if (session && shop && session.shop !== shop) {
    return authRedirect(req, res);
  }
  if (session?.isActive()) {
    try {
      const client = new Shopify.Clients.Graphql(
        session.shop,
        session.accessToken
      );
      await client.query({ data: TEST_GRAPHQL_QUERY });
      return next();
    } catch (e) {
      if (
        e instanceof Shopify.Errors.HttpResponseError &&
        e.response.code === 401
      ) {
        res.redirect(`/auth?shop=${shop}`);
      } else {
        throw e;
      }
    }
  }

  if (!shop) {
    if (session) {
      shop = session.shop;
    } else if (Shopify.Context.IS_EMBEDDED_APP) {
      const authHeader = req.headers.authorization?.match(/Bearer (.*)/);
      if (authHeader) {
        const payload = Shopify.Utils.decodeSessionToken(authHeader[1]);
        shop = payload.dest.replace("https://", "");
      }
    }
  }

  if (!shop || shop === "") {
    return res
      .status(400)
      .send(
        `Could not find a shop to authenticate with. Make sure you are making your XHR request with App Bridge's authenticatedFetch method.`
      );
  }

  res.status(403);
  res.header("X-Shopify-API-Request-Failure-Reauthorize", "1");
  res.header(
    "X-Shopify-API-Request-Failure-Reauthorize-Url",
    `/auth?shop=${shop}`
  );
  res.end();
};

export default verifyRequest;
