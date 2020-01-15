const mongoose = require('mongoose');
require("../models/company.model.js");
const User = mongoose.model('User');
const Company = mongoose.model('Company');

exports.editProfileGet = (req, res) => {
    console.log("id: " + req.query._id);
    User.findOne({
            _id: req.query._id
        },
        function (err, response) {
            if (!err) {
                console.log("company ID: " + response.company);
                Company.findById({
                        _id: response.company
                    },
                    function (err, companyDetails) {
                        console.log("companyInfo: " + companyDetails);
                        if (err) {
                            res.json(err);
                        } else {
                            res.json({
                                companyDetails,
                                message: "editProfilePost is working"
                            });
                        }

                    });
            } else {
                console.log(err);
            }

        });
    // res.json({
    //     message: "editProfileGet is working"
    // })

};

exports.editProfilePost = (req, res) => {
    // console.log("id: " + req.body.user_id);
    // User.findOne({
    //         _id: req.body.user_id
    //     },
    //     function (err, res) {
    //         if (!err) {
    //             console.log("company ID: " + res.company);
    //             Company.findById({
    //                     _id: res.company
    //                 },
    //                 function (err, response) {
    //                     console.log("companyInfo: " + response);
    //                     if (err) {
    //                         res.json(err);
    //                     } else {
    //                         res.json({
    //                             company_name: response.company_name,
    //                             message: "editProfilePost is working"
    //                         });
    //                     }

    //                 });
    //         } else {
    //             console.log(err);
    //         }

    //     });
}