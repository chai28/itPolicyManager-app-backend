const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const policy = mongoose.model('Policy');

exports.subscribedPolicyGet = (req, res) => {
    Company.findOne({company_name:req.query.companyName}, function (error, company){
        if (error) {
            console.log("Error: " + error);
        } else {
                for( var i=0;i<company.subscribed_policy.length;i++){
                       sub_policy[i]=company.sub_policy[i].name; 
                }
         res.json(sub_policy);
        }
    })
};
exports.subscribedPolicyPost = (req, res) => {
    
    
};