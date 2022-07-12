const crypto = require("crypto");
const { default: Shopify } = require("@shopify/shopify-api");

const hmacVerify = (req, res, next) => {
  console.log("HMAC verification");
  try {
    const generateHash = crypto
      .createHmac("SHA256", process.env.SHOPIFY_API_SECRET)
      .update(JSON.stringify(req.body), "utf8")
      .digest("base64");
    const hmac = req.headers["x-shopify-hmac-sha256"];

    if (Shopify.Utils.safeCompare(generateHash, hmac)) {
      console.log("HMAC verified");
      next();
    } else {
      console.error("HMAC verification failed");
      return res.status(401).send();
    }
  } catch (e) {
    console.log(e);
    return res.status(401).send();
  }
};

module.exports = hmacVerify;
