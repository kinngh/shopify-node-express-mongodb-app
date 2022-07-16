const crypto = require("crypto");

const proxyVerification = (req, res, next) => {
  const { signature } = req.query;

  const queryURI = req._parsedUrl.query
    .replace("/?", "")
    .replace(/&signature=[^&]*/, "")
    .split("&")
    .map((x) => decodeURIComponent(x))
    .sort()
    .join("");

  const calculatedSignature = crypto
    .createHmac("sha256", process.env.SHOPIFY_API_SECRET)
    .update(queryURI, "utf-8")
    .digest("hex");

  if (calculatedSignature === signature) {
    next();
  } else {
    res.send(401);
  }
};

module.exports = proxyVerification;
