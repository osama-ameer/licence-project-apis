const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Account",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  computerSerial: {
    type: String,
  },
  usageCounter: {
    type: Number,
  },
  lastUsedDate: {
    type: String,
  },
  status: {
    type: String,
  },
  date: {
    type: String,
    required: true,
    default: Date.now(),
  },
});

module.exports = mongoose.model("user", UserSchema);
