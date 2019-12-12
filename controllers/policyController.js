const mongoose = require('mongoose');
const Policies = require("../models/policy.model.js");


exports.policiesGet = (req, res) => {
    Policies.find(function(err, policies) {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.json(policies);
        }
    });
};

exports.policiesPost = (req, res) => {
    res.send({
        message: "Register Post is working"
    });
};
