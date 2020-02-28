const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("../models/policy.model.js");
const Policy = mongoose.model('Policy');
const user_subscribed_policy = new Schema({
    company_id:String,
    policy_type_id:String,
    content:Array,
    reviewed_date:Date,
    review_status:Boolean,
    review_reminder_email_sent:Boolean,
    review_firstEmail_sent_time:Date
  });
  
  
  
  module.exports = mongoose.model("user_subscribed_policy", user_subscribed_policy);