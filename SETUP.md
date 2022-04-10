# Setup

This is an in-depth guide on using this repo. This goes over getting the base repo up and running, to understand how to add your own customizations server side like registering webhooks, routes, etc, refer to [Notes](./NOTES.md).

- [ ] Run `npm i --force` to install dependencies.

  - Substantial efforts have gone into ensuring we're using the latest package versions, and some incompatibility issues always pop up while installing. There are no negative effects on the functionality just yet, but if you find anything please open an issue.

- [ ] Create a new app (Public or Custom) from your [Shopify Partner Dashboard](https://partners.shopify.com).

  - The App URL will be generated later in the setup. Add `https://127.0.0.1` for the moment.

- [ ] Build your `.env` file based on `.env.example`

  - `SHOPIFY_API_KEY`: App API key.
  - `SHOPIFY_API_SECRET`: App secret.
  - `SHOPIFY_API_SCOPES`: Scopes required by your Shopify app. A list of access scopes can be found [here](https://shopify.dev/api/usage/access-scopes)
  - `SHOPIFY_APP_URL`: URL generated from Localtunnel.
  - `SHOPIFY_API_VERSION`: Pre-filled to the latest version. All the calls in the repo are based off this API version so if you're downgrading please refer to the official docs instead. The repo is always kept up to date with the newest practices so you can rely on the basic repo to almost always work without depriciation errors popping up.
  - `MONGO_URL`: Mongo connection URL. If you're using a locally hosted version, you can leave it blank or use `mongodb://127.0.0.1:27017/app-name-here`
  - `ENCRYPTION_STRING`: String to use for Cryption for encrypting sessions token. Add a random salt (or a random string of letters and numbers) and save it. If you loose the string you cannot decrypt your sessions and must be kept safely.
  - `PORT`: Defaults to 8081. If you're using a different port, please update `tunnel` script in `package.json` too.

- [ ] NPM Scripts

  - `update` and `update:check`: Depends on `npm-check-updates` to force update packages to the latest available version. Can potentially break things.
  - `test`: Tests have been ommited in the repo since everyone likes to use their own testing library.
  - `dev`: Run in dev mode. Please run `npm run build` before to compile client side.
  - `build`: Use Vite to build React into `dist/client`. If you don't run build, you cannot serve anything in dev / production modes.
  - `start`: Run in production mode. Please run `npm run build` before to compile client side.
  - `pretty`: Run prettier across the entire project. I personally like my code to be readable and using prettier CLI makes things easier. Refer to `.prettierrc` for configuration and `.prettierignore` to ignore files and folders.
  - `tunnel`: Open source alternative to Ngrok. Localtunnel is used to expose specific ports of your machine to the internet and serve over https. The `--port` parameter exposes a specific port (8081) over https to allow connections. Running `npm run tunnel` auto generates a URL for you. If you need a specific subdomain add `--subdomain <your-url>` to the script and generate if it's available. The URL that's generated here goes in `SHOPIFY_APP_URL` and in the URL section of your app in Partner Dashboard.

- [ ] Setup Partner Dashboard

  - Run `npm run tunnel` to generate your subdomain. Copy the `https://<your-url>.loca.lt` domain and add it in `SHOPIFY_APP_URL` in your `.env` file.
  - Open Shopify Partner Dashboard > Apps > _Your App Name_ > App Setup
  - In the URLs section
    - App URL: `https://<your-url>.local.lt`
    - Allowed Redirection URL(s): `https://<your-url>.local.lt/auth/callback`
  - A common _gotcha_ is ensuring you are using the same URL in your `.env` and App Setup sections and any discrepancy will result in "URI not whitelisted" issue.

- [ ] Running App
  - I prefer running a local `mongo` instance to save on time and ease of setup. Create a new folder in your project called `mongo` (it's added in `.gitignore` so you can git freely) and in a terminal window run `mongod --dbpath mongo/` to start a mongo instance in that folder.
  - In your second terminal window, run `npm run tunnel` to create a Local tunnel instance if you haven't already.
  - In your third terminal window (preferrably in your IDE), `npm run dev` or `npm run start` depending on how you want to test your app. Make sure to add the generated URL to `SHOPIFY_APP_URL` in `.env` file.
