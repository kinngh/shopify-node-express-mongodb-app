const SessionModel = require("../../utils/models/SessionModel");
const StoreModel = require("../../utils/models/StoreModel");

const appUninstallHandler = async (topic, shop, webhookRequestBody) => {
  await StoreModel.findOneAndUpdate({ shop }, { isActive: false });
  await SessionModel.deleteMany({ shop });
};

module.exports = appUninstallHandler;
