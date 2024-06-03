import { DeliveryMethod, shopifyApi } from "@shopify/shopify-api";
import "dotenv/config";
import appUninstallHandler from "../server/webhooks/app_uninstalled.js";

const isDev = process.env.NODE_ENV === "dev";

// Setup Shopify configuration
const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_API_SCOPES,
  hostName: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  hostScheme: "https",
  apiVersion: process.env.SHOPIFY_API_VERSION,
  isEmbeddedApp: true,
  logger: { level: isDev ? 1 : 0 }, //Error = 0,Warning = 1,Info = 2,Debug = 3
  future: {
    unstable_tokenExchange: true,
  },
});

/*
  Template for adding new topics:
  ```
  TOPIC: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks/topic",
      callback: topicHandler,
    },
  ```

    - Webhook topic and callbackUrl topic should be exactly the same because it's using catch-all
    - Don't change the delivery method unless you know what you're doing
      - the method is `DeliveryMethod.Http` and not `DeliveryMethod.http`, mind the caps on `H` in `http`
*/

shopify.webhooks.addHandlers({
  APP_UNINSTALLED: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks/app_uninstalled",
    callback: appUninstallHandler,
  },
});

export default shopify;
