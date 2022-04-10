// Session store model to preserve sessions across restarts.
// MARK:- Needs updating.
const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
});

const SessionModel = mongoose.model("session", sessionSchema);

module.exports = SessionModel;
