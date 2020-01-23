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

            console.log(company.subscribed_policy);
        }
    })
};
exports.subscribedPolicyPost = (req, res) => {


};