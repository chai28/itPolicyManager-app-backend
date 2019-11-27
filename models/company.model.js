const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscribedPolicy = require("../models/subscribed_policy.model.js");
const User = require("../models/user.model.js");

//company collection
var companySchema = new Schema({
  comapny_name: String,
  company_email: String,
  nzbn: String,
  address: String,
  contact: String,
  date_registered: Date,
  logo: String,
  username: String,
  password:String
  // user: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  subscribed_policy: [{
    type: Schema.Types.ObjectId,
    ref: 'SubscribedPolicy'
  }]
});

module.exports = mongoose.model("Company", companySchema);