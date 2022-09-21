# Deployment

## Northflank

The docs make it very easy to deploy on Northflank. You just need to make sure your `env` variables contain `NPM_CONFIG_FORCE=true` to ensure `npm i --force` is run to install your dependencies.

## Railway.app

If you're deploying on Railway.app, chances are you'll run into issues at install step. To ensure `Nixpacks` actually installs dependencies, you'll need to create a new file at root called `nixpacks.toml` with the following content:

```
[phases.install]
nixCmds = ['npm','install','--force']
```

This ensures it force installs all npm packages.

## Heroku

Ensure your config variables have an entry for `NPM_CONFIG_FORCE=true` to force install packages.
