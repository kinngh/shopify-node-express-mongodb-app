# Migrating to Managed Webhooks

Managed Webhooks are configured via your TOML file. If you have been using the repo before, the process is almost the same.

- Head over to `utils/shopify.js` and add in your webhook topics.
  - There's autocomplete available for topics
- All webhook URLs start with `/api/webhooks`
  - If you're using AWS, GCP or any other external server to process webhooks, add in the full URL and it'll handle accordingly
- If this server is handling webhooks, the `/server/webhooks/_index.js` will be updated based on `/utils/shopify.js` file
  - Do not write to `/server/webhooks/_index.js` because it'll be overwritten.
- Run `npm run update:config` as usual

## Migration

- Moving to managed webhooks doesn't remove GraphQL webhooks that your app would have registered earlier and these need to be removed manually.

## Read More

- https://shopify.dev/docs/apps/build/webhooks/customize
