# Notes

## Index

- Server Side
- Client Side
- Tips and Tricks

## Server

### Boilerplate

- The template uses MongoDB (`mongoose`) as it's database. MongoDB is starter friendly since a lot of tutorials on the internet are based on the MERN stack, it's easier for newbies to understand the structure of the project and working with basic APIs and understand how auth works.

### Middlewares

- The repo comes with all middlewares setup and ready to go to pass auth and ensure things work in accordance to guidelines published by Shopify for app devs.

### Routing

- A basic router is setup at `server/routes/index.js` so you can create your routes and combine them there without having to worry about figuring out where to add in the routers.

---

## Client

### Routing

- Using a new package `raviger` to add in navigation and routing. I've found it to be much easier to work with, since there's no unnecessary need to use Switches and other boilerpate code.
- Add all your routes to `client/GlobalRoutes.jsx` and then you can use `navigate("/path")` to navigate around, just like Next.js' good ol' `router.push("/path")`
- You can refer to raviger [documentation](https://github.com/Paratron/raviger/blob/master/src-docs/pages/en/README.md), and a [quickstart guide](https://blog.logrocket.com/how-react-hooks-can-replace-react-router/) to understand how it works, passing props and other good stuff.

### GraphQL

- In `client/pages/RecurringSubscriptions.jsx`, the `returnUrl` can also be replaced with `const returnUrl = `https://${shopOrigin}/admin/apps/${process.env.SHOPIFY_API_KEY};`.
  - The reason I personally don't prefer this is because Shopify will be moving the admin URL from `store-name.myshopify.com/admin` to `admin.shopify.com` and this specific implementation could break things in the future. Re-running the auth workflow means the redirection would be handled by Shopify and would take us to the right URL directly.
  - Also I find this super interesting on how the API Key can be used as an alternative to redirect the user to the app.

---

## Tips and Tricks

This section is a collection of tips and tricks I use to speed up my workflow. If you have any, please feel free to add 'em. I use `macOS` so if you're on Windows, this may/may not work.

### GitHub Codespaces

- If you're running this project on GitHub Codespaces and want to run MongoDB on the platform, run the following command in terminal:
  `wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -;sudo apt-get install gnupg;wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -;echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu bionic/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list;sudo apt-get update`
  - The above code will install MongoDB. Alternatively, you can follow the official installation guide available [here](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/)
  - MongoDB won't run with `mongod --dbpath mongo/` without root permissions. Run `sudo mongod --dbpath mongo/` instead and it'll work as intended.

### NPM Scripts

- `"env": "cp -R .env.example .env"`: This is to copy the `.env.example` and create a `.env` file (or overwrite it). I usually jump between apps to test functionality or have to switch out variables and this comes really handy in resetting `.env` files.
- `"mongo": "rm -rf mongo/; mkdir mongo; mongod --dbpath mongo/"`: This is to remove the `mongo/` directory if it exists, create a new `mongo` directory and start a MongoDB server in the `mongo/` directory. Comes really handy when you want to start over or test out scenarios like app reinstall, or you just want to start afresh and crash your app to see how it can be improved. You can also break the command into two parts, one to delete and create the `mongo/` directory and the other to start the `mongod` server.
- `"pregit": "clear; npm run pretty; git add ."`: This is really handy to prettify code and adding all files for staging into a `git commit`. Also if you've made any mistakes, `prettier` usually throws an error (if you missed them somewhere) and comes really handy to ensure, yet again, that the code is running and has been prettified.

### Terminals

- `clear; npm run dev`: Dev instance.
- `clear; npm run ngrok`: Tunnel localhost to https server.
- `mongod --dbpath mongo/`: Local mongo server that runs locally in the `mongo/` directory.
- `clear; npm run pretty`: This is usually a spare window that is open depending on what stage of dev I'm in. I like to write the whole code and format for that specific section to be isolated with extra new lines and spaces so it's in focus, then a quick prettify to bring it all together.

### UI

I like to be very clear on how I am building my apps. This is my workflow:

- Use pen and paper to sketch out the app UI, with [Shopify Polaris Components](https://polaris.shopify.com) open.
- Design in [Figma](https://www.figma.com/community/file/930504625460155381).
- Use the [Shopify Polaris Playground](https://github.com/kinngh/shopify-polaris-playground) repo I built to see how the UI feels like.
- Drop in the UI (without the `App.jsx` file) directly into my repo and then start writing my backend / frontend code.

About using a design tool, don't feel forced to use a tool like Figma, Adobe XD, etc. Your tool's job is to give you freedom and sometimes it's not software, but a white board or pen and paper. Do what makes you feel like you have the freedom to build and you can directly skip making a design set in a tool and code it in with your sketches open.

### GraphQL

- Shopify.dev has a [Graphiql interface](https://shopify.dev/graphiql/admin-graphiql) available where you can build your queries and mutations. I personally like to build my queries and mutations here because of how easy it is to test things out and the explore section makes it really easy to build the queries.
- If you want to access queries or mutations, just type in `query` or `mutation` and click on Explore, and it'll open up the latest version of end points available. Build your query, prettify and paste in your repo. Also make sure you have the right scopes added in or you're going to run into errors that you may / may not spend an entire day figuring out.
