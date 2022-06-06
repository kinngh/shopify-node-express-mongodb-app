# Database

The documentation is not for a specific technology, but I'm using MongoDB as an example to showcase implementation and the same can be directly transpiled to most other database technologies like SQL or using ORMs like Prisma.

## Session Storage

I've seen a lot of struggle around creating a custom sessions storage solution and it's weird given there's [this great example by the Shopify team in Redis](https://github.com/Shopify/shopify-node-api/blob/main/docs/usage/customsessions.md) to implement it and this repo uses this as a guide to write MongoDB version of it.

The custom session storage is in `utils/sessionStorage.js` and is written for MongoDB, with `Cryptr` for encrypting strings.

### Store

- First check for an existing session using the session id.
- If it exists, update it.
- If it doesn't exist, create it.

Shopify sometimes sends it twice, so it makes sense to use a unique ID to just update whatever the latest response is. Also a thing to note is for every shop you'll have two instances in your database. One is `offline_shopname` for offline tokens, and `shopname_XXXXX` for online tokens. The entire response is encrypted so you don't have to worry about leaks.

### Load

- Grab the instance by id.
- Decrypt `content`, where the token and other response is stored.

### Delete

- Grab the instance by id.
- Delete.

After the three components are built, you can create a new instance using `Shopify.Session.CustomSessionStorage()` and add your Store, Load and Delete functions.

Then, head over to `server/index.js` and add it in your `Shopify.Context.initialize()` instance with the `SESSION_STORAGE` param.
