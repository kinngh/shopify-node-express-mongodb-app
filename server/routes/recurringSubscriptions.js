const { default: Shopify } = require("@shopify/shopify-api");
const subscriptionRoute = require("express").Router();

// Note:
// I would recommend creating a seaprate route for every plan you have, to avoid users meddling with React side of code.
// I usually convert the processing code into it's own function and pass plan name, price and test via different routes, and test charges strictly available to stores from a database.
// Create a new MongoDB collection and just store test store names in it.

subscriptionRoute.get("/api/recurringSubscription", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);
  const returnUrl = `${process.env.SHOPIFY_APP_URL}/auth/toplevel?shop=${session.shop}`;

  const planName = "$10.25 plan";
  const planPrice = 10.25; //Always a decimal

  const response = await client.query({
    data: `mutation CreateSubscription{
    appSubscriptionCreate(
      name: "${planName}"
      returnUrl: "${returnUrl}"
      test: true
      lineItems: [
        {
          plan: {
            appRecurringPricingDetails: {
              price: { amount: ${planPrice}, currencyCode: USD }
            }
          }
        }
      ]
    ) {
      userErrors {
        field
        message
      }
      confirmationUrl
      appSubscription {
        id
        status
      }
    }
  }
`,
  });

  if (response.body.data.appSubscriptionCreate.userErrors) {
    console.log(
      `--> Error subscribing ${session.shop} to plan:`, response.body.data.appSubscriptionCreate.userErrors
    );
    res
      .status(418) //Brew.
      .send({ error: "An error occured. Please contact customer support." });
    return;
  }

  res.status(200).send({
    confirmationUrl: `${response.body.data.appSubscriptionCreate.confirmationUrl}`,
  });
});

module.exports = subscriptionRoute;
