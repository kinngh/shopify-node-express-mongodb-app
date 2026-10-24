import shopify from "../../utils/shopify.js";

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 * @param {import('express').NextFunction} next - Express next middleware function
 */
const csp = async (req, res, next) => {
  const shop = await getAuthenticatedShop(req.originalUrl);
  if (shopify.config.isEmbeddedApp) {
    res.setHeader(
      "Content-Security-Policy",
      shop
        ? `frame-ancestors https://${shop} https://admin.shopify.com;`
        : "frame-ancestors https://admin.shopify.com;"
    );
  } else {
    res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
  }

  next();
};

export default csp;

async function getAuthenticatedShop(url) {
  try {
    const params = new URL(url, "https://localhost").searchParams;
    if (params.has("id_token")) {
      if (params.getAll("id_token").length !== 1) return null;

      const payload = await shopify.session.decodeSessionToken(
        params.get("id_token")
      );
      if (
        !Number.isFinite(payload.exp) ||
        !Number.isFinite(payload.nbf) ||
        typeof payload.sub !== "string" ||
        !payload.sub ||
        typeof payload.dest !== "string"
      ) {
        return null;
      }

      return shopify.utils
        .sanitizeShop(payload.dest.replace(/^https:\/\//, ""))
        ?.replace(/\/+$/, "");
    }

    if (
      ["shop", "hmac", "timestamp"].every(
        (key) => params.getAll(key).length === 1
      ) &&
      (await shopify.utils.validateHmac(params))
    ) {
      return shopify.utils
        .sanitizeShop(params.get("shop"))
        ?.replace(/\/+$/, "");
    }
  } catch {
    // Never log SDK errors containing launch tokens or trust an unsigned shop.
  }

  return null;
}
