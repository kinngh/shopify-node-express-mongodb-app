import mongoose from "mongoose";

const metricsSchema = new mongoose.Schema({
  appLoadId: {
    type: String,
    required: true,
    unique: true,
  },
  shop: {
    type: String,
    default: null,
  },
  INP: {
    type: Number,
    default: null,
  },
  FID: {
    type: Number,
    default: null,
  },
  CLS: {
    type: Number,
    default: null,
  },
  LCP: {
    type: Number,
    default: null,
  },
  FCP: {
    type: Number,
    default: null,
  },
  TTFB: {
    type: Number,
    default: null,
  },
  raw_json: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const MetricsModel = mongoose.model("metrics", metricsSchema);

export default MetricsModel;
