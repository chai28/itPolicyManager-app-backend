const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const subscribedPolicy = mongoose.model('SubscribedPolicy');

exports.subscribedPolicyGet = (req, res) => {
    Company.findOne({company_name:company_name}, function (error, company){
        if (error) {
            console.log("Error: " + error);
        } else {
                for( var i=0;i<company.subscribed_policy.length;i++){
                    subscribedPolicy.findById(company.subscribed_policy[i], function(err,goalSubscribedPolicy){
                       sub_policy[i]=goalSubscribedPolicy; 
                 })
            }
         res.json(sub_policy);
        }
    })
};
exports.subscribedPolicyPost = (req, res) => {
    
    
};