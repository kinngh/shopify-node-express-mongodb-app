# Server

## Overview

The server is setup to be as straight forward as possible, with middlewares pulled out of the server to keep the code clean. The `server/index.js` is setup as:

- Package imports
- Initialize MongoDB (or your database tech + Redis)
- Initialize Shopify Context
- Add all webhook handlers
- Create an express server
  - Webhook routes
  - Setup `/graphql` route for gql requests
  - middlewares
  - Vite setup
  - Compression package and serving from Vite's output directory

## Middlewares

### Auth

Auth deals with the initial installation and grabbing online and offline tokens for the app. We start by landing on `/auth` and checking for signed cookies, then create a `beginAuth` instance for offline tokens first and redirect to `/auth/tokens`, where we grab the online tokens. After that we redirect to `/auth/callback` which validates our tokens, registers webhooks and marks our `shop` as `active`. In case anything fails, we mark the `shop` as `false` because as we'll see later on, the `isActive` instance decides if we redirect to `/auth` or proceed to the app.

### CSP

CSP stands for Content Security Policy. here we're setting headers to allow our embedded app to run either in the `shop` domain or `https://admin.shopify.com`, which will be coming up later.

Setting `frame-ancestors` to `none` allows us to stop the app from being embedded outside of Shopify / Shopify store, as the `frame-ancestors` define what domains are allowed to embedd the page in `frame`, `iframe`, `object`, `embed` or `applet`. Read more on `frame-ancestors` at [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors)

### isActiveShop

Here is where we check for active installation of the app in the shop.

### verifyRequest

`verifyRequest` is for validating current sessions, that allows for checking if the shop is still active. A thing to note here is if you're using a custom storage strategy `session.isActive()` doesn't work and is replaced by a custom `isSessionActive` function. It also allows to cross check for updated scopes and the user is redirected to auth to ensure the updated scopes take effect.

A thing to note here is since `verifyRequest` middleware is called every single time you create a query, it is quite redundant but a check needs to happen at every step to ensure the app isn't being fiddled around with.

## Webhooks

Dealing with webhooks is a three point strategy, as defined in `__templates/webhooks.js`. A common problem I see is dealing with the `app_uninstalled` webhook, since most apps fail to pass the check in reinstallation because they're storing active shops in memory and fail to deal with it in a proper manner. Using the required `app_uninstalled` implementation as an example, here's how to deal with webhooks:

1. Register webhook in `server/index.js` in the `Shopify.Webhooks.Registry.addHandlers()` function.
2. Check for webhook registration status in `server/webhooks/_webhookRegistrar.js` by creating a dedicated route for the webhook and checking for response.
   - I've seen developers use one route for all webhooks and cycle through the topic, but I like to keep my logs extremely clear and this redundancy is required for easier debugging. Irritating, but works great on the longer run especially for debugging.
3. Create a new file with the subscription topic in `server/webhook` folder. Here we have the `app_uninstalled.js` file that creates a handler function that defines what to do when the webhook is called, and a route to log if the webhook was processed successfully or not.

There's a lot of redundancy here but I've personally experienced it to be much easier to debug, since we only do this once and then deal with the handler functions.

An alternate way of _streamlining_ the process (for the lack of a better term) is to use case/switch statements for handler functions.

- In `server/index.js`, add `handlerFunction(TOPIC)` as your webhook handler for the topics.
- Create a new file called `handler_functions.js` in `server/`:

```javascript
const handlerFunction = (webhook_topic) => {
  switch (webhook_topic) {
    case TOPIC:
      handlerFunction();
      break;
    default:
      console.log("Unknown webhook topic", webhook_topic);
  }
};
```

I still don't see this as a better option, but just in case you want all your handlers in one place, this is one way to go. I still recommend sticking to isolating handlers into their topic files so it's easier to maintain and debug, the way it's setup in the repo.

## Session Storage

Check [Database.md](./database.md)
