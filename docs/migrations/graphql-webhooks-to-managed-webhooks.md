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

## GDPR webhooks

GDPR callbacks have moved from `server/controllers/gdpr.js` into separate files under `server/webhooks/gdpr/`. They use the existing `(topic, shop, webhookRequestBody, webhookId, apiVersion)` signature, with `webhookRequestBody` containing the verified JSON string. Their imports and cases are fixed in `server/webhooks/_index.js`, outside the generated custom webhook sections.

| Previous URL                       | New URL                                     |
| ---------------------------------- | ------------------------------------------- |
| `/api/gdpr/customers_data_request` | `/api/webhooks/gdpr/customers_data_request` |
| `/api/gdpr/customers_redact`       | `/api/webhooks/gdpr/customers_redact`       |
| `/api/gdpr/shop_redact`            | `/api/webhooks/gdpr/shop_redact`            |

Move any custom GDPR processing into the matching callback. The shared route reads the raw body and validates it with `shopify.webhooks.validate` before dispatching; no installed session is required. The separate GDPR route and `verifyHmac` middleware are removed.

Run `npm run update:config` or `bun run update:config` as usual to update the URLs in the existing `[webhooks.privacy_compliance]` configuration.

## Read More

- https://shopify.dev/docs/apps/build/webhooks/customize
