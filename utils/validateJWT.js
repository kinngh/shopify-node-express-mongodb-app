import crypto from "crypto";

/**
 *
 * Validate your JWT token against the secret.
 * @param {String} token - JWT Token
 * @param {String} secret - Signature secret. By default uses the `process.env.SHOPIFY_API_SECRET` value
 * @returns {Object} Decoded JWT payload.
 */
function validateJWT(token, secret = process.env.SHOPIFY_API_SECRET) {
  // Split the token into parts
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT: Token structure incorrect");
  }

  const header = parts[0];
  const payload = parts[1];
  const signature = parts[2];

  // Base64 decode and parse the header and payload
  const headerJson = Buffer.from(header, "base64").toString();
  const payloadJson = Buffer.from(payload, "base64").toString();

  // Verify the signature
  const signatureCheck = crypto
    .createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64");

  // Replace '+' with '-', '/' with '_', and remove '='
  const safeSignatureCheck = signatureCheck
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  if (safeSignatureCheck !== signature) {
    throw new Error("Invalid token signature");
  }

  // Optionally, you can add more checks here for the payload
  // e.g., check the expiration, issuer, audience, etc.

  return JSON.parse(payloadJson);
}

export default validateJWT;
