# Client

We use React.js and Vite to run our client side / front facing operations. The `src/` folder, that houses the frontend code, is setup the way I like it so feel free to change the folder structure with the way you prefer. A thing to note is you cannot use Next.js with Vite. We use `raviger` package to navigate, which is also swappable with your preferred strategy. I moved over to `raviger` because it sets up routing just like Next.js does, making it easier for me to migrate my code and eventually, the familiarity made me use it outside the Shopify apps.

I don't use Tailwind or other libraries because Shopify Polaris is great enough to handle all my needs and make the app feel native - which is what we usually go for and it's recommended because it needs to feel like the embedded app _belongs_ in the admin.

## Entry Client

This is to embed the React app in `./index.html`

## App.jsx

- We start with defining our `appBridgeConfig` for App Bridge to get the required params to function.
- `App()` renders the final app that we see.
  - `RouteComponents` is imported from `GlobalRoutes.jsx` to render the right page.
- `MyProvider()` builds our Apollo client.
- `userLoggedInFetch` is how we fetch content from our server. This is easy since it uses a similar structure `fetch` API that most JS developers are familiar with, and takes care of headers so no more unnecessary code.

## Routing

We're using `raviger` for navigation to have a Next.js like experience. I highly recommend checking out `raviger` docs for a better understanding of the package.

The `GlobalRoutes.jsx` is to define all our routes and telling what component to render. The export is sent over to `App.jsx`, creating an instance of the `useRoutes()` hook to render our routes.

## Fetching Data

Fetching data from the server is easier when using an instance of `userLoggedInFetch()`. An example for this is setup in `src/pages/GetData.jsx`, demonstrating GET and POST requests. A thing to note here is to POST JSON data to the server, you have to manually add headers in the request for it to function properly, as added in `fetchContentPost()`.
