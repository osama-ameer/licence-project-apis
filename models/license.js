const mongoose = require("mongoose");

const LicenseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  durationType: {
    type: String,
  },
  auto: {
    type: String,
  },
});

module.exports = mongoose.model("license", LicenseSchema);
