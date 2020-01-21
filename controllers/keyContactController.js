require("../models/company.model.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Company = mongoose.model("Company");

exports.keyContactGet = (req, res) => {
    let users = [];
    //Get user information to get the company ID
    User.find({
            company: req.query.companyId
        },
        function (err, response) {
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

exports.keyContactPost = (req, res) => {
    let contactInfo = req.body; //Get the parsed information
    console.log(contactInfo);
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
        }
    );
}