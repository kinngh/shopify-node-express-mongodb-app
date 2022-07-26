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

`verifyRequest` is for validating current sessions, that allows for checking if the shop is still active. Something to note here is since `verifyRequest` middleware is called every single time you create a query, it is quite redundant but a check needs to happen at every step to ensure the app isn't being fiddled around with.

## Webhooks

Working with webhooks is now only a matter of setting up a handler function (the function that runs when the webhook is triggered) and registering it in `server/index.js` at `//MARK:- Add handlers for webhooks here.` As an example, the `app_uninstalled` and the three GDPR webhooks are registered and you can just add to that list. All webhooks are routed to `/webhooks/topic`, including GDPR routes. To keep things tidy, all webhook handler functions are at `server/webhooks` and the files are named after the webhooks they handle.

`webhookRegistrar` handles webhook registration at `server/middleware/auth.js` and the routes are available in `server/index.js`.

## Session Storage

Check [Database.md](./database.md)
