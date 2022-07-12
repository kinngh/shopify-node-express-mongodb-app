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
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
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
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
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
    return { success: true };
  } catch (e) {
    console.error(e);
    return { success: false };
  }
};

module.exports = {
  customerDataRequest,
  customerRedact,
  shopRedact,
};
