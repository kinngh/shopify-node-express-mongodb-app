# Platform Features

## GraphQL and REST clients

I highly recommend using GraphQL instead of REST and setting up client server side as much as possible. To create a new client

- First grab the session.

```javascript
const session = await Shopify.Utils.loadCurrentSession(req, res, true); //online token
const session = await Shopify.Utils.loadCurrentSession(req, res, false); //offline token
```

- Then create an instance of `Shopify.Clients`

  - GraphQL

  ```javascript
  const client = new Shopify.Clients.GraphQL(session.shop, session.accessToken);
  ```

  - REST

  ```javascript
  const client = new Shopify.Clients.Rest(session.shop, session.accessToken);
  ```

- Making calls

  - GraphQL

  ```javascript
  const response = await client.query({
    data: `GraphQL Query{}`,
  });

  console.log(response);
  ```

  - REST

  ```javascript
  const response = await restClient.get("REST QUERY"); //replace get with post/put/delete for your query type

  console.log(response);
  ```

## Billing API

I see a lot of devs getting confused with setting up Billing API and recurring subscriptions on where to make the call and how to handle it. The repo comes with Billing API setup already for recurring subscriptions. Setting up Billing API is a two step process, first the Server setup and then the Client.

### Server

The setup is available at `server/routes/recurringSubscriptions.js` and `src/pages/ServerSideRecurringSubscriptions.jsx`.

- First we create a route. I prefer making GET requests here so I can build a separate route for each tier, making it easier to manage and avoid unnecessary fiddling with code from poky merchants / developers (like me).
- Create a GraphQL client by loading current session.
- Setup a return url. If a merchant goes through the subscription process, this is where they land up after accepting the subscription. I redirect to `/auth` so I don't have to worry about unnecessary redirects and with Shopify moving to `admin.shopify.com`, I don't want apps to break.
- Create your GQL query.
  - If you struggle with creating GQL queries and mutations, just head over to [Shopify Graphiql Interface](https://shopify.dev/graphiql/admin-graphiql), build your query and paste it here. Then replace values with variables and you're good to go.
- Send the `confirmationUrl` as a response to the client.

### Client

- Make a request to your subscription route and expect either an error message or a `confirmationUrl`.
- If error (unlikely), throw the error.
- If `confirmationUrl`, create an instance of `useAppBridge()` and `Redirect.create()`.
- Once the `confirmationUrl` is recieved, `redirect.dispatch()` to the `confirmationUrl`.

TL;DR: Client makes a call to route on the backend. Server makes the GQL call to Shopify and returns the confirmation url. Client redirects to confirmation url where the transcation happens, then redirects to `returnUrl` when the transaction is complete.
