const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const policySchema = new Schema({
    policy_name: String,
    content: {
        content1: String,
        content2: String,
        content3: String,
        content4: String,
        content5: String,
        content6: String,
        content7: String,
        content8: String,
        content9: String,
        content10: String,
        content11: String,
        content12: String
    }
  });

  module.exports = mongoose.model("Policy", policySchema);