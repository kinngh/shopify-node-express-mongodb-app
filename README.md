# Shopify Node.js x Express.js x React.js Boilerplate

An embedded app starter template to get up and ready with Shopify app development with JavaScript. This is heavily influenced by the choices Shopify Engineering team made in building their [starter template](https://github.com/Shopify/shopify-app-template-node) to ensure smooth transition between templates.

I've included [notes](/docs/NOTES.md) on this repo which goes over the repo on why certain choices were made.

I also did make a video going over the entire repo. If you want to learn Shopify app dev in-depth, I also sell a course _[How To Build Shopify Apps](https://kinngh.gumroad.com/l/how-to-make-shopify-apps?utm_source=github&utm_medium=express-repo)_

[![How To Build Shopify Apps Course](https://raw.githubusercontent.com/kinngh/extras/main/csa_promo.png)](https://kinngh.gumroad.com/l/how-to-make-shopify-apps?utm_source=github&utm_medium=express-repo)

[![Creating a Shopify app from scratch](https://img.youtube.com/vi/iV_3ENCraaM/0.jpg)](https://www.youtube.com/watch?v=iV_3ENCraaM)

## Supporting repositories

- [`@kinngh/shopify-nextjs-prisma-app`](https://github.com/kinngh/shopify-nextjs-prisma-app): A Shopify app boilerplate built with Next.js and Prisma ORM, with deployments available on Vercel.
- [`@kinngh/shopify-polaris-playground`](https://github.com/kinngh/shopify-polaris-playground): Build your app's UI using Polaris, without an internet connection.

## Tech Stack

- React.js
  - `raviger` for routing.
- Express.js
- MongoDB
- Vite
- Ngrok

## Why I made this

The Shopify CLI generates an amazing starter app but it still needs some more boilerplate code and customizations so I can jump on to building apps with a simple clone. This includes:

- MongoDB based session and database management.
- Monetization (recurring subscriptions) ready to go.
- Webhooks isolated and setup.
- React routing taken care of (I miss Next.js mostly because of routing and under the hood improvements).
- Misc boilerplate code and templates to quickly setup inApp subscriptions, routes, webhooks and more.

## Notes

### Setup

- Refer to [SETUP](/docs/SETUP.md)
- Migrations are available in [DOCS](/docs/migrations/)

### Misc

- Storing data is kept to a minimal to allow building custom models for flexibility.
  - Session persistence is also kept to a minimal and based on the Redis example provided by Shopify, but feel free to modify as required.
