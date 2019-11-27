const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');


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
        User.findOne({username: LoginInfo.username}, function (error, response) {
            console.log("response: " + response);
            console.log("error: " + error);
            if (error) {
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