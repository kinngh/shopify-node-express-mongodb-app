const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
  shop: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, default: false },
});

const StoreModel = mongoose.model("Active_Stores", StoreSchema);

module.exports = StoreModel;
