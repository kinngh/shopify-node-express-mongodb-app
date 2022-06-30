//Combine all your webhooks here
const appUninstallHandler = require("./app_uninstalled.js");
const { customerDataRequest, customerRedact, shopRedact } = require("./gdpr");

module.exports = {
  appUninstallHandler,
  customerDataRequest,
  customerRedact,
  shopRedact,
};
