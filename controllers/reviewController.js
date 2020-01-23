const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const Policy = mongoose.model('Policy');

exports.reviewPolicyGet = async (req, res) => {
    Company.findOne({
        company_name: req.query.company_name
    }, function (error, company) {
        if (error) {
            console.log("Error: " + error);
        } else {
            let singlePolicy
            for(let i=0; i<company.subscribed_policy.length; i++){
                if (company.subscribed_policy[i].name === req.query.policy_name) {
                    console.log(company.subscribed_policy[i]);
                    singlePolicy = company.subscribed_policy[i]
                   break;
                } 
            };
            res.json(singlePolicy.content);


        }
    })
};

exports.reviewPolicyPost = (req, res) => {


};