const { Shopify } = require("@shopify/shopify-api");

const webhookRegistrar = async (session) => {
  const { shop, accessToken } = session;

  await app_uninstalled(shop, accessToken);
};

const app_uninstalled = async (shop, accessToken) => {
  const webhookTopic = "APP_UNINSTALLED";
  const response = await Shopify.Webhooks.Registry.register({
    path: "/webhooks/app_uninstalled",
    topic: webhookTopic,
    accessToken,
    shop,
  });

  if (response["APP_UNINSTALLED"].success) {
    console.log(`--> Registered ${webhookTopic} for ${shop}`);
  } else {
    `--> Error registering ${webhookTopic} for ${shop}`;
  }
};

module.exports = webhookRegistrar;
