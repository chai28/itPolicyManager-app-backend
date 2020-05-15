const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const policySchema = new Schema({
    policy_name: String,
    content: {}
  });

  module.exports = mongoose.model("PolicyList", policySchema);