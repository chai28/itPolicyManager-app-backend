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
                                message: "editProfileGet is working"
                            });
                        }

                    });
            } else {
                console.log(err);
            }

        });
};

exports.editProfilePost = (req, res) => {
    console.log("company id: " + req.body._id);
    console.log(req.body);
    let companyInfo = req.body;

    Company.findById({
            "_id": companyInfo._id
        },
        function (err, company) {
            if (err) {
                console.log(err);
            } else {
                   company.company_name = companyInfo.company_name;
                   company.company_email = companyInfo.company_email;
                   company.nzbn = companyInfo.nzbn;
                   company.address = companyInfo.address;
                   company.contact = companyInfo.contact;
                   company.description = companyInfo.description;
                   company.logo =companyInfo.logo;
                   company.save();
                   status = "success";
                   res.json({
                       status
                     });
            }
        })

}