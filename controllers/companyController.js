const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const User = mongoose.model('User');

exports.companyGet = (req, res) => {
    //Get user information to get the company ID
    if (req.query.type === "company") {
        Company.findOne({
                company_name: req.query._id
            },
            function (err, response) {
                if (!err) {
                    // console.log("company: " + response);
                    res.json(response);
                } else {
                    console.log(err);
                }
            });
    } else {
        User.findOne({
                _id: req.query._id
            },
            function (err, response) {
                if (!err) {
                    // console.log("user: " + response);
                    res.json(response);
                } else {
                    console.log(err);
                }
            });
    }
};

exports.companyPost = (req, res) => {
    let matchPolicy = req.body;
    console.log(matchPolicy.policies);
    console.log("company id: " + matchPolicy.id);
    Company.findByIdAndUpdate(matchPolicy.id, {
        "$push": {
            "match_policy": matchPolicy.policies
        }
    }, function (err, response) {
        if (!err) {
            //console.log(response);
        } else {
            console.log(err);
        }
    });
}