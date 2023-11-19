const mongoose = require("mongoose");

const AccountSchema = mongoose.Schema({
  licence: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "License",
  },
  name: {
    type: String,
    required: true,
  },
  softwareType: {
    type: String,
    required: true,
  },
  licenceStatus: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  country: {
    type: String,
  },
  contactName: {
    type: String,
  },
  maxUsers: {
    type: Number,
  },

  usageCounter: {
    type: Number,
  },
  expiryDate: {
    type: Date,
  },
  lastUsageDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["trial", "ok", "expired"],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("account", AccountSchema);
