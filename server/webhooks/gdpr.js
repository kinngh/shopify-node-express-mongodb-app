const gdprRoutes = require("express").Router();
/**
 *
 * CUSTOMER_DATA_REQUEST
 *
 */

const customerDataRequest = async (topic, shop, webhookRequestBody) => {
  try {
    const {
      shop_domain,
      customer: { id, email },
      orders_requested,
    } = JSON.parse(webhookRequestBody);

    console.log("Handle customer_data_request");
  } catch (e) {
    console.error(e);
  }
};

gdprRoutes.post("/gdpr/customers_data_request", async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("--> CUSTOMER_DATA_REQUEST processed");
  } catch (error) {
    console.log("--> Error in processing CUSTOMER_DATA_REQUEST:", error);
    res.status(500).send(error.message);
  }
});

/**
 *
 * CUSTOMER_REDACT
 *
 */

const customerRedact = async (topic, shop, webhookRequestBody) => {
  try {
    const {
      shop_domain,
      customer: { id, email },
      orders_to_redact,
    } = JSON.parse(webhookRequestBody);

    console.log("Handle customer_redact");
  } catch (e) {
    console.error(e);
  }
};

gdprRoutes.post("/gdpr/customer_redact", async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("--> CUSTOMER_REDACT processed");
  } catch (error) {
    console.log("--> Error in processing CUSTOMER_REDACT:", error);
    res.status(500).send(error.message);
  }
});

/**
 *
 * SHOP_REDACT
 *
 */

const shopRedact = async (topic, shop, webhookRequestBody) => {
  try {
    const { shop_domain } = JSON.parse(webhookRequestBody);

    console.log("Handle shop_redact");
  } catch (e) {
    console.error(e);
  }
};

gdprRoutes.post("/gdpr/shop_redact", async (req, res) => {
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("--> SHOP_REDACT processed");
  } catch (error) {
    console.log("--> Error in processing SHOP_REDACT:", error);
    res.status(500).send(error.message);
  }
});

module.exports = {
  gdprRoutes,
  customerDataRequest,
  customerRedact,
  shopRedact,
};
