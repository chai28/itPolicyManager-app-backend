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
            company.subscribed_policy.forEach(policy => {
                if (policy.name === req.query.policy_name) {
                    console.log(policy);
                    res.json(policy);
                } else {
                    res.json({
                        message: "empty"
                    });
                }
            });


        }
    })
};

exports.reviewPolicyPost = (req, res) => {


};