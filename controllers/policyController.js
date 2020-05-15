const mongoose = require('mongoose');
const Policies = require("../models/policy.model.js");


exports.policiesGet = (req, res) => {
    console.log(req.query._id);
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

exports.updatePolicy = (req, res) => {
    const policyDetails=req.body;
    console.log(policyDetails.content)
    debugger;
    if(!(policyDetails._id===undefined)){
        Policies.findOneAndUpdate({
            "_id":policyDetails._id
        },{
            "content":policyDetails.content           
        },
        function (err, policy) {
            if (err) {
                console.log("Error: " + err);
            } else {
                res.status(204).json(policy);
            }
        });
    }
    
};

exports.getAllPolicies = (req, res) => {
    Policies.find({}, (err, policies) => {
        if (err){
            console.log("Error: " + err);
        } else {
            res.json(policies); // returns all policy
        }
    });

}

exports.getOnePolicy = (req, res) => {
    let id = req.params.id;
    Policies.findById({_id: id}, (err, policy) => {
        if (err){
            console.log("Error: " + err);
        } else {
            res.json(policy);
        }

    });

}



exports.getAssessment = async (req, res) => {
    let id = req.body.policy_id;
    
    const policy = await Policies.findOne(
        { "_id": id }
    );

    console.log(policy);
}