const { default: Shopify } = require("@shopify/shopify-api");
const userRoutes = require("express").Router();

const subscriptionRoute = require("./recurringSubscriptions");
userRoutes.use(subscriptionRoute);

userRoutes.get("/api", (req, res) => {
  const sendData = { text: "This is coming from /apps/api route." };
  res.status(200).json(sendData);
});

userRoutes.post("/api", (req, res) => {
  res.status(200).json(req.body);
});

userRoutes.get("/api/gql", async (req, res) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res);
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken);

  const shop = await client.query({
    data: `{
      shop {
        name
      }
    }`,
  });

  res.status(200).send(shop);
});

module.exports = userRoutes;
