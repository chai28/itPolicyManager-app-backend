const mongoose = require('mongoose');
const SubscribedPolicy = require("../models/subscribed_policy.model.js");
const User = require("../models/user.model.js");
const Company = require("../models/company.model.js");


exports.signInGet = (req, res) => {
    res.send({
        message: "Get is working"
    });
};

exports.signInPost = (req, res) => {
    let LoginInfo = req.body; //Get the parsed information
    console.log(LoginInfo);
    if (!LoginInfo.username || !LoginInfo.password) {
        res.json({
            message: "Wrong input"
        })
    } else {
        // res.send(LoginInfo);
        // let NewCompany = new Company
        User.findOne(LoginInfo.username, function (err, response) {
            res.send();
            console.log(response);
            if (err) {
                res.json({
                    message: "No UserName matched for: " + response
                })
            }; //else {
            //         res.send({
            //             "password": LoginInfo.password
            //         });
            //         newCompany.User.findOne({
            //             username: LoginInfo.username
            //         }, "password", function (err, response) {
            //             if (err) {
            //                 res.json(err)
            //             } else {
            //                 if (response === LoginInfo.password) {
            //                     //direct to dashboard
            //                     res.json({
            //                         message: "Welcome " + LoginInfo.username + "!"
            //                     })
            //                 } else {
            //                     res.json({
            //                         message: "Wrong username or password!"
            //                     })
            //                 }
            //             };
            //         })
            //     };
        });
    };
};