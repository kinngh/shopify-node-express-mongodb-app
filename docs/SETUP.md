# Setup

This is an in-depth guide on using this repo. This goes over getting the base repo up and running, to understand how to add your own customizations server side like registering webhooks, routes, etc, refer to [Notes](/docs/NOTES.md).

`Windows` users, run `npm install -g win-node-env` before running the repo since `NODE_ENV` isn't recognized in Windows. Alternatively, you can replace it with `cross-env` and update `package.json` accordingly.

- [ ] Run `npm run g:install` to install Shopify's global dependencies if you haven't already.
- [ ] Run `npm i --force` to install dependencies.
  - Substantial efforts have gone into ensuring we're using the latest package versions, and some incompatibility issues always pop up while installing. There are no negative effects on the functionality just yet, but if you find anything please open an issue.

  - Do not delete `shopify.app.toml` file since that's required by Shopify CLI 3.0 to function properly, even if the file is empty.

- [ ] Create a new app (Public or Custom) from your [Shopify Partner Dashboard](https://partners.shopify.com).
  - The App URL will be generated later in the setup. Add `https://localhost` for now.

- [ ] Build your `.env` file based on `.env.example`
  - `SHOPIFY_API_KEY`: App API key.
  - `SHOPIFY_API_SECRET`: App secret.
  - `SHOPIFY_API_SCOPES`: Scopes required by your Shopify app. A list of access scopes can be found [here](https://shopify.dev/api/usage/access-scopes)
  - `SHOPIFY_API_OPTIONAL_SCOPES`: Optional scopes required by your Shopify app. You can see it in action at `/debug/scopes`.
  - `SHOPIFY_APP_URL`: URL generated from Ngrok/Cloudflare.
  - `SHOPIFY_API_VERSION`: Pre-filled to the latest version. All the calls in the repo are based off this API version so if you're downgrading please refer to the official docs instead. The repo is always kept up to date with the newest practices so you can rely on the basic repo to almost always work without depriciation errors popping up.
  - `MONGO_URL`: Mongo connection URL. If you're using a locally hosted version, you can leave it blank or use `mongodb://127.0.0.1:27017/app-name-here`
  - `ENCRYPTION_STRING`: String to use for Cryption for encrypting sessions token. Add a random salt (or a random string of letters and numbers) and save it. If you loose the string you cannot decrypt your sessions and must be kept safely.
  - `NPM_CONFIG_FORCE`: Set to `true` so if you deploy on spaces like Heroku, it runs `npm install --force` instead of `npm install`.
  -
  - `VITE_SHOPIFY_API_KEY`: Used by Vite, this is the app API key, should be same as `SHOPIFY_API_KEY`.
  -
  - `APP_NAME`: Name of your app, as you've entered in Partner Dashboard.
  - `APP_HANDLE`: The URL handle of your app.
  -
  - `APP_PROXY_PREFIX`: The prefix for your App Proxy's path, can be one of these:
    - apps
    - a
    - community
    - tools
  - `APP_PROXY_SUBPATH`: Subpath for your app proxy.
    - Leave `APP_PROXY_PREFIX` or `APP_PROXY_SUBPATH` blank and no App Proxy entries are created.
  -
  - `POS_EMBEDDED`: Boolean. If your app is embedded in Shopify Point of Sale.

- [ ] NPM Scripts
  - `dev`: Run in dev mode.
  - `build`: Use Vite to build React into `dist/client`. If you don't run build, you cannot serve anything in dev / production modes.
  - `start`: Run in production mode. Please run `npm run build` before to compile client side.
  -
  - `update`: Depends on `npm-check-updates` to force update packages to the latest available version. Can potentially break things.
  - `pretty`: Run prettier across the entire project. I personally like my code to be readable and using prettier CLI makes things easier. Refer to `.prettierrc` for configuration and `.prettierignore` to ignore files and folders.
  -
  - `ngrok:auth`: Add in your auth token from [Ngrok](https://ngrok.com) to use the service.
  - `ngrok`: Ngrok is used to expose specific ports of your machine to the internet and serve over https. Running `npm run ngrok` auto generates a URL for you. The URL that's generated here goes in `SHOPIFY_APP_URL` and in the URL section of your app in Partner Dashboard.
  - `cloudflare`: Starts cloudflare tunnel on port 8081 (make sure you have `cloudflared` installed).
  -
  - `g:install`: Required global installs for buildling Shopify apps.
  - `shopify`: Run `shopify` commands
  - `update:config`: [Managed Installation] Use the Shopify CLI to update your configuration. Auto writes your `toml` file to root and `extension/` for syncing.
  - `update:url`: [OAuth Installation] Use `@shopify/cli-kit` to update URLs to your Shopify partner dashboard. Requires a proper setup of `.env` file.
  -
  - `preserve`: For Vite.

- [ ] Setup Partner Dashboard
  - Run `npm run cloudflare` or `npm run ngrok` to generate your subdomain. Copy the `https://<your-url>` domain and add it in `SHOPIFY_APP_URL` and in your `.env` file.
  - Run `npm run update:config` to generate `shopify.app.toml` files and upload your config to Shopify.
    - ABSOLUTELY DO NOT MODIFY YOUR TOML FILES BY HAND. USE YOUR ENV INSTEAD.
  - A common _gotcha_ is ensuring you are using the same URL in your `.env` and App Setup sections and any discrepancy will result in "URI not whitelisted" issue.
  - GPDR handlers are available at `server/controllers/gdpr.js` and the URLs to register are:
    - Customers Data Request: `https://<your-url>/api/gdpr/customers_data_request`
    - Customers Redact: `https://<your-url>/api/gdpr/customers_redact`
    - Shop Redact: `https://<your-url>/api/gdpr/shop_redact`
  - App Proxy routes are setup to allow accessing data from your app directly from the store. An example proxy route has been setup and is available at `server/index.js` at `//MARK:- App Proxy routes` and the routes are available in `server/routes/app_proxy/`. First you need to setup your base urls. Here's how to get it working:
    - Subpath Prefix: `apps`
    - Subpath: `express-proxy`
    - Proxy URL: `https://<your-url>/api/proxy_route`

    - So when a merchant visits `https://shop-url.com/apps/express-proxy/`, the response to that request will come from `https://<your-url>/proxy_route`. A middleware has already been setup to check signatures so you don't have to worry about authenticating proxy calls, and is available at `server/middleware/proxyVerification.js`.
    - Subsequently, any child requests will be mapped the same way. A call to `https://shop-url.com/apps/express-proxy/json` will be routed to `https://<your-url>/api/proxy_route/json`.
    - To confirm if you've setup app proxy properly, head over to `https://shop-url.myshopify.com/apps/express-proxy/json` to confirm if you get a JSON being returned with the configuration set above^
    - A common _gotcha_ is if you're creating multiple apps that all use the same subpath (`express-proxy` in this case), all susbequent installs will throw a `404` error because Shopify serializes routes based on installation. To avoid this, please change the subpath to something that's unique to your app. I prefer using the format `<<appname>>-proxy`

- [ ] Running App
  - Install the app by heading over to `storename.myshopify.com/admin/oauth/install?client_id=SHOPIFY_API_KEY`.
  - I prefer running a local `mongod` instance to save on time and ease of setup. Create a new folder in your project called `mongo` (it's added in `.gitignore` so you can git freely) and in a terminal window run `mongod --dbpath mongo/` to start a mongo instance in that folder.
  - In your second terminal window, run `npm run cloudflare` or `npm run ngrok` to tunnel your localhost to the web via HTTPS.
  - In your third terminal window (preferrably in your IDE), `npm run dev` or `npm run start` depending on how you want to test your app. Make sure to add the generated URL to `SHOPIFY_APP_URL` in `.env` file.

- [ ] Creating Extensions
  - See [DOCS](./migrations/oauth-to-managed-installation.md) point 8.
