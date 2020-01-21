const mongoose = require('mongoose');
const Policies = require("../models/policy.model.js");


exports.policiesGet = (req, res) => {
    if (req.query.type === "one") {
        Policies.findById({
            _id: req.query._id
        }, function (err, policies) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.json(policies);
            }
        });
    } else { //Get all policys
        Policies.find(function (err, policies) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.json(policies);
            }
        });
    }
};

exports.policiesPost = (req, res) => {
    Policies.findById({
            _id: req.body._id
        },
        function (err, policies) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.json(policies);
            }
        });
};