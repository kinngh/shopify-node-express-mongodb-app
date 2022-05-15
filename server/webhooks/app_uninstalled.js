const { Shopify } = require("@shopify/shopify-api");

const SessionModel = require("../../utils/models/SessionModel");
const StoreModel = require("../../utils/models/StoreModel");

const appUninstallRoute = require("express").Router();

const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
  await SessionModel.deleteMany({ shop });
};

appUninstallRoute.post("/app_uninstalled", async (req, res) => {
  console.log("Processing app_uninstalled webhook");
  try {
    await Shopify.Webhooks.Registry.process(req, res);
    console.log("--> APP_UNINSTALLED processed");
  } catch (error) {
    console.log("--> Error in processing APP_UNINSTALLED:", error);
    res.status(500).send(error.message);
  }
});

module.exports = { appUninstallHandler, appUninstallRoute };
