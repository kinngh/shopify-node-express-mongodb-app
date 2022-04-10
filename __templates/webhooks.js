/**
 * Registering webhooks is a three part process:
 * Add handlers
 * Register
 * Process
 * 
 * https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/webhooks.md [Accessed April 10, 2022]
 * 
 * Some webhooks will not register if you don't have the required scopes. 
 * Please check the documentation for more info.
 * https://shopify.dev/api/admin-graphql/latest/enums/WebhookSubscriptionTopic [Accessed April 10, 2022]
 */

/** Part-1/3
 * Replace/rename following variables:
 * webhookRoute
 * webhookPath
 * webhookHandler
 * 
 * Place it in server/webhooks with name `webhook_topic.js`
 * 
 * Add webhookHandler to server/index.js
 * Add webhookRoute to webhooks/_routes.js
 */
const { Shopify } = require("@shopify/shopify-api");

const webhookRoute = require("express").Router();
const webhookPath = "/webhook_topic"

const webhookHandler = async (topic, shop, webhookRequestBody) => {
    //Process webhook here
};

webhookRoute.post(`${webhookPath}`, async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("--> WEBHOOK_TOPIC processed");
  } catch (error) {
    console.log("--> Error in processing WEBHOOK_TOPIC:", error);
    res.status(500).send(error.message);
  }
});

module.exports = { webhookHandler, webhookRoute };

/** Part-2/3
 * Replace / rename the following:
 * 
 * WEBHOOK_TOPIC
 * webhook_topic
 * 
 * Search for "MARK:- Add handlers for webhooks here" in server/index.js and paste this snippet
*/

Shopify.Webhooks.Registry.addHandler("WEBHOOK_TOPIC", {
  path: "/webhooks/webhook_topic",
  webhookHandler: webhookHandler,
});


/** Part-3/3
 * Register webhook in server/webhooks/_webhookRegistrar.js
 * Replace / rename the following:
 * 
 * WEBHOOK_TOPIC
 * webhook_topic
 * 
 * Add the webhook_topic const to webhookRegistrar:
 * await webhook_topic(shop,accessToken)
 */

const {Shopify} = require("@shopify/shopify-api")

const webhook_topic = async (shop, accessToken) => {
  const webhookTopic = "WEBHOOK_TOPIC";
  const response = await Shopify.Webhooks.Registry.register({
    path: "/webhooks/webhook_topic",
    topic: webhookTopic,
    accessToken,
    shop,
  });

  if (response["WEBHOOK_TOPIC"].success) {
    console.log(`--> Registered ${webhookTopic} for ${shop}`);
  } else {
    `--> Error registering ${webhookTopic} for ${shop}`;
  }
};
module.exports = webhook_topic