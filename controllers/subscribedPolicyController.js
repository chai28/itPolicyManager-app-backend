const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');

exports.subscribedPolicyGet = async (req, res) => {
    Company.findOne({
        company_name: req.query.company_name
    }, function (error, company) {
        if (error) {
            console.log("Error: " + error);
        } else {
            if (company.subscribed_policy !== null) {
                res.json(company.subscribed_policy);
            } else {
                res.json({
                    message: "empty"
                });
            }

            // console.log(company.subscribed_policy);
        }
    })
};
exports.subscribedPolicyPost = (req, res) => {
   let contentDetails=req.body;
    Company.findOne({
        company_name: contentDetails.company_name
    }, function (error, company) {
        if (error) {
            console.log("Error: " + error);
        } else {
            let index;
            for (let i = 0; i < company.subscribed_policy.length; i++) {
                if (company.subscribed_policy[i].name ===contentDetails.policy_name) {
                    console.log(company.subscribed_policy[i]);
                    index= i;
                    break;
                }
            }
            company.subscribed_policy[index].content=contentDetails. updatedcontent;
            company.subscribed_policy[index].version = company.subscribed_policy[index].version+0.1;
            console.log(company.subscribed_policy[index].version);
            company.save();
            
        }
    })

};