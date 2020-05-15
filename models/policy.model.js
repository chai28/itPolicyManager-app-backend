const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const policySchema = new Schema({
    policy_name: String,
    content: {},
    assessments: [
      {
        assessment_content: String,
        options: [{
          name: String
        }],
        correct_answer:Number
      }
    ]
  });

  module.exports = mongoose.model("Policy", policySchema);