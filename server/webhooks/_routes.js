const webhookRoutes = require("express").Router();

const { appUninstallRoute } = require("./app_uninstalled");
const gdprRoutes = require("./gdpr");

//Combine all routes here.
webhookRoutes.use("/", gdprRoutes);
webhookRoutes.use("/", appUninstallRoute);

module.exports = webhookRoutes;
