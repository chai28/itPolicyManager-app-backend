const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("./policy.model.js");
const Policy = mongoose.model('Policy');
const SubscribedPolicy = new Schema({
    company_id:String,
    policy_id:String,
    policy_name:String,
    content:Array,
    reviewed_date:Date,
    status:String, 
    version:Number,  
    reviewer_list:[{
      reviewer_id:String,
      review_status: {type: Boolean, default: false},
      email:String,
      review_reminder_email_sent:Boolean,
      review_reminder_email_error:Boolean,
      review_first_email_sent_time:Date,
    }]
      });
  
  
  
  module.exports = mongoose.model("SubscribedPolicy", SubscribedPolicy);