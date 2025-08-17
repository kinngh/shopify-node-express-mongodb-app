import { Router } from "express";
import clientProvider from "../../utils/clientProvider.js";
import MetricsModel from "../../utils/models/MetricsModel.js";

const userRoutes = Router();

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.post("/metrics", async (req, res) => {
  try {
    let webVitals = {
      INP: 0.0,
      FID: 0.0,
      CLS: 0.0,
      LCP: 0.0,
      FCP: 0.0,
      TTFB: 0.0,
    };
    req?.body?.metrics?.forEach((metr) => {
      webVitals[metr?.name] = Number(parseFloat(metr?.value).toFixed(2));
    });

    const writeMetrics = await MetricsModel.create({
      shop: res.locals.user_session.shop,
      appLoadId: req.body.appLoadId,
      INP: webVitals?.INP,
      FID: webVitals?.FID,
      CLS: webVitals?.CLS,
      LCP: webVitals?.LCP,
      FCP: webVitals?.FCP,
      TTFB: webVitals?.TTFB,
      raw_json: JSON.stringify(req.body),
    });

    return res.status(200).send({ text: "Success!" });
  } catch (e) {
    console.error("---> An error occured at /api/apps/", e);
    return res.status(403).send({ error: true });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.get("/", (req, res) => {
  try {
    const sendData = { text: "This is coming from /api/apps/ route." };
    return res.status(200).json(sendData);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.post("/", (req, res) => {
  try {
    return res.status(200).json(req.body);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.get("/debug/gql", async (req, res) => {
  try {
    //false for offline session, true for online session
    const { client } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_session.shop,
    });

    const shop = await client.request(/* GraphQL */ `
      {
        shop {
          name
        }
      }
    `);

    return res.status(200).json({ text: shop.data.shop.name });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true, text: "GQL Query broke" });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.get("/debug/activeWebhooks", async (req, res) => {
  try {
    const { client } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_session.shop,
    });
    const activeWebhooks = await client.request(/* GraphQL */ `
      {
        webhookSubscriptions(first: 25) {
          edges {
            node {
              topic
              endpoint {
                __typename
                ... on WebhookHttpEndpoint {
                  callbackUrl
                }
              }
            }
          }
        }
      }
    `);
    return res.status(200).json(activeWebhooks);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.get("/debug/getActiveSubscriptions", async (req, res) => {
  try {
    const { client } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_session.shop,
    });
    const response = await client.request(/* GraphQL */ `
      {
        appInstallation {
          activeSubscriptions {
            name
            status
            lineItems {
              plan {
                pricingDetails {
                  ... on AppRecurringPricing {
                    __typename
                    price {
                      amount
                      currencyCode
                    }
                    interval
                  }
                }
              }
            }
            test
          }
        }
      }
    `);

    return res.status(200).send(response);
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

/**
 * @param {import('express').Request} req - Express request object
 * @param {import('express').Response} res - Express response object
 */
userRoutes.get("/debug/createNewSubscription", async (req, res) => {
  try {
    const { client, shop } = await clientProvider.offline.graphqlClient({
      shop: res.locals.user_session.shop,
    });
    const returnUrl = `${process.env.SHOPIFY_APP_URL}/?shop=${shop}`;

    const planName = "$10.25 plan";
    const planPrice = 10.25; //Always a decimal

    const response = await client.request(
      /* GraphQL */ `
        mutation CreateSubscription(
          $name: String!
          $lineItems: [AppSubscriptionLineItemInput!]!
          $returnUrl: URL!
          $test: Boolean
        ) {
          appSubscriptionCreate(
            name: $name
            returnUrl: $returnUrl
            lineItems: $lineItems
            test: $test
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
      {
        variables: {
          name: planName,
          returnUrl: returnUrl,
          test: true,
          lineItems: [
            {
              plan: {
                appRecurringPricingDetails: {
                  price: {
                    amount: planPrice,
                    currencyCode: "USD",
                  },
                  interval: "EVERY_30_DAYS",
                },
              },
            },
          ],
        },
      }
    );

    if (response.data.appSubscriptionCreate.userErrors.length > 0) {
      console.log(
        `--> Error subscribing ${shop} to plan:`,
        response.data.appSubscriptionCreate.userErrors
      );
      res.status(400).send({ error: "An error occured." });
      return;
    }

    return res.status(200).send({
      confirmationUrl: `${response.data.appSubscriptionCreate.confirmationUrl}`,
    });
  } catch (e) {
    console.error(e);
    return res.status(400).send({ error: true });
  }
});

export default userRoutes;
