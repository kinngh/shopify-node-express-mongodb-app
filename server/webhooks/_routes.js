const webhookRoutes = require("express").Router();

const { appUninstallRoute } = require("./app_uninstalled");

//Combine all routes here.
webhookRoutes.use("/", appUninstallRoute);

module.exports = webhookRoutes;
