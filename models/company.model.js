const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../models/policy.model.js");
const Policy = mongoose.model('Policy');
//company collection
const companySchema = new Schema({
  company_name: String,
  company_email: String,
  nzbn: String,
  address: String,
  contact: String,
  date_registered: Date,
  description: String,
  logo: String,
  user: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  subscribed_policy: [{
    name:String,
    status: String,
    accesslink: String,
    date_subscribed: Date,
    date_expired: Date,
    content: {}
  }],
  match_policy: [{
    type: Schema.Types.ObjectId,
    ref: 'Policy'
  }]
});

//user collection
const userSchema = new Schema({
  user_type: {
    type: String,
    enum: ['comp_initiator', 'confirmation', 'adoption', 'trainee']
  },
  roleStatus: {
    type: String,
    enum: ['accept', 'disput', 'undone', 'compliant']
  },
  fname: String,
  lname: String,
  email: String,
  address: String,
  contact: String,
  position: String,
  username: String,
  password: String,
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company'
  }
});

// var subscribedPolicySchema = new Schema({
//   // policy: {
//   //    type: Schema.Types.ObjectId,
//   //    ref: 'policy'
//   // },
//   managementStage: {
//     type: String,
//     enum: ['confirmation', ' adoption', 'awareness', 'reporting']
//   },
//   accesslink: String,
//   date_subscribed: Date,
//   date_expired: Date,
//   content: {
//     content1: String,
//     content2: String,
//     content3: String,
//     content4: String,
//     content5: String,
//     content6: String,
//     content7: String,
//     content8: String,
//     content9: String,
//     content10: String,
//     content11: String,
//     content12: String
//   }

// });




module.exports = mongoose.model("User", userSchema);
// module.exports = mongoose.model("SubscribedPolicy", subscribedPolicySchema);
module.exports = mongoose.model("Company", companySchema);