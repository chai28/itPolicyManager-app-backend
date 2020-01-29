const mongoose = require('mongoose');
require("../models/company.model.js");
const User = mongoose.model('User');

exports.userGet = (req, res) => {
    let users = [];
    //Get user information to get the company ID
    User.find({
        company: req.query.companyId
        }, function (err, response) {
            if (!err) {
                console.log("key contacts: " + response);
                users = response;
                console.log("users: " + users);
                res.json(users);
            } else {
                console.log(err);
            }
        }
    );
};

exports.userPost = (req, res) => {
    let contactInfo = req.body; //Get the parsed information
    console.log(contactInfo);
    if(contactInfo.action === "delete"){
        User.findByIdAndRemove({
            _id: contactInfo.userId
        },
        function (error, response) {
            if (!error) {
                console.log("response: " + response);
                res.json({
                    status: "success",
                    message: "Delete Successful!"
                });
                //console.log(response);
            } else {
                console.log(err);
            }
        });
    }else if(contactInfo.action === "add"){
        let contactInfo = req.body; //Get the parsed information
        console.log(contactInfo);
        if (!contactInfo) {
            res.json({
            message: "No Input",
            value: false
            });
        } else {
        User.findOne({
            _id: contactInfo.userId},"company",
        function(error, response) {
            console.log(response.company);
            if (error) {
            res.json({
                message: "no company details" + response,
                value: false
            });
            } else {
                User.findOne({
                    email: contactInfo.email},"email",
                    function(err, email) {
                    if (!email) {
                        console.log(email);
                        var NewUser = new User({
                        company: response.company,
                        fname: contactInfo.fname,
                        lname: contactInfo.lname,
                        email: contactInfo.email,
                        position: contactInfo.position
                        });
                        console.log(NewUser);
                        NewUser.save(function(err) {
                        res.json({
                            message: "Add Successful!",
                            status :"success"
                        });
                        });
                        // Company.findById(response.company, function(err,goalCompany) {
                        //     numberOfUsers=goalCompany.user.length;
                        //     console.log(numberOfUsers);
                        //    goalCompany.user[numberOfUsers]=NewUser._id;
                        //    console.log(goalCompany.user[numberOfUsers]);
                        //    console.log(goalCompany);
                        //     goalCompany.save()
                        // });
                    } else {
                        res.json({
                        message: "User already exists",
                        status : "fail"
                        });
                    }
                });
            }
        });
    }
    }
}