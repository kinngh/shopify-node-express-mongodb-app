# Running on Microsoft Windows

The repo was built to run on macOS and Linux systems and Windows users may run into some problems while working with the repo. The specific changes are for Windows users only, and is limited to issues that are brought up by the developers using the platform. Since my entire team and I use macOS and Linux based systems, we don't really spend a lot of time making it cross environment by choice.

If you don't see a solution, please open an issue and it'll be added to the list.

## Crossenv

`npm run dev` and `npm run start` might just not work on Windows machines. To get around this, install `crossenv` package and in your `package.json`, add `crossenv` at the beginning of both the scripts so it works as intended.

## Paths

Path joining fails the way it's written in the repo for some users. Use the `path.join()` API to get around this issue. Currently, the path fails when serving static files generated from Vite, available in `server/index.js` at

```javascript
app.use("/*", (req, res, next) => {
  res
    .status(200)
    .set("Content-Type", "text/html")
    .send(fs.readFileSync(`${root}/dist/client/index.html`));
});
```

## Dev mode

Running `npm run dev` directly might fail since there is no `dist/` folder generated. Run `npm run build` before `npm run dev` to get it up and running as intened.
