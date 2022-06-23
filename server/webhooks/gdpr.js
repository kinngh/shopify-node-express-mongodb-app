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

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
};

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

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
};

/**
 *
 * SHOP_REDACT
 *
 */

const shopRedact = async (topic, shop, webhookRequestBody) => {
  try {
    const { shop_domain } = JSON.parse(webhookRequestBody);

    console.log(`Handle ${topic} for ${shop}`);
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  customerDataRequest,
  customerRedact,
  shopRedact,
};
