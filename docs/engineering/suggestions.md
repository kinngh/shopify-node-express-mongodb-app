# Suggestions

The repo is pretty barebones and is intended to be used as a starting point. Personally, I do the following when using in production.

## Debugging

Having access to server logs is necessary, especially when working with a team. I use [Pino](https://getpino.io/) + [Logflare](http://logflare.app) to dump all my logs and have a history of what's happening. This is why this repo uses the `---> Console message` format so I can have an idea of developer written logs.

## Uptime

Checking for uptime can get quite cumbersome. I prefer creating a route that makes a call, done on our test store, and responds back with query response time and dumps on Slack or Discord. If the response is anything but a `200`, it pings `@everyone` with the error so we're notified the app is either down or the query failed.

## Database

Don't just rely on MongoDB / SQL for your database needs. Use a Redis instance to store frequently fetched content like session storage and other app specific content.
