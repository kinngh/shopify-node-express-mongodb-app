# Notes

## Server

### Boilerplate

- The boilerplate is based off off Shopify's tech stack and follows their baseline practices to ensure easy migration between templates. One major difference is we're not treating the server side as a module, so you cannot use `import` statements, instead you're using `require`.
- The template uses MongoDB (`mongoose`) as it's database. MongoDB is starter friendly since a lot of tutorials on the internet are based on the MERN stack, it's easier for newbies to understand the structure of the project and working with basic APIs and understand how auth works.

### Middlewares

- The repo comes with all middlewares setup and ready to go to pass auth and ensure things work in accordance to guidelines published by Shopify for app devs.

### Webhooks

- Working with webhooks is now a little...cumbersome. If you are coming from my [Koa x Next.js repo](https://github.com/kinngh/shopify-node-mongodb-next-app), you would notice registering Webhooks is now a 3 step process, unlike the good ol' register and handle style we had running before.
- `__templates/webhooks.js` goes over setting up multiple webhooks. `APP_UNINSTALLED` is already setup and ready to go, so you can take a look at how that works with it's processing, registry and handlers. Took a while to get hang of it, but since it's a one time setup it works (kinda) once you have the baselines setup.
- GDPR webhooks are setup and ready to process info. All you have to do is add the URLs in your partner dashboard / app setup and head over to `server/webhooks/gdpr.js` and add in how you process these webhooks.
- A _very important_ aspect of working with webhooks is ensuring you're adding the right permission scopes before you try to register the webhook, or you're going to run into issues and the app crashing. (I totally didn't spend an entire day on this before realizing I haven't added the right permissions scopes.)

### Routing

- A basic router is setup at `server/routes/index.js` so you can create your routes and combine them there without having to worry about figuring out where to add in the routers.

---

## Client

### Routing

- Using a new package `hookrouter` to add in navigation and routing. I've found it to be much easier to work with, since there's no unnecessary need to use Switches and other boilerpate code.
- Add all your routes to `src/GlobalRoutes.jsx` and then you can use `navigate("/path")` to navigate around, just like Next.js' good ol' `router.push("/path")`
- You can refer to hookrouter [documentation](https://github.com/Paratron/hookrouter/blob/master/src-docs/pages/en/README.md), and a [quickstart guide](https://blog.logrocket.com/how-react-hooks-can-replace-react-router/) to understand how it works, passing props and other good stuff.
