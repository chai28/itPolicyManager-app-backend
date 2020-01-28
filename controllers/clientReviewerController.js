const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const User = mongoose.model('User');
const Nodemailer = require('nodemailer');

exports.clientReviewerGet = (req, res) => {
    Company.findOne({
            _id: req.query._id
        },
        function (err, response) {
            if (!err) {
                // console.log("company: " + response);
                res.json(response);
            } else {
                console.log(err);
            }
        });
};

// Email Notification for Registration 
//set up transporter
const transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'itpsychiatrist.policymanager@gmail.com',
        pass: 'Aspire2CKD'
    }
});

exports.clientReviewerPost = (req, res) => {
    let data = req.body
    Company.findOne({
        _id: data.companyId
    }, function (err, response) {
        if (err) {
            console.log(err);
        } else {
            // console.log("response.company_email ==> " + response.company_email);
            if (data.review === "REJECTED") {
                //remove reviewer
                Company.updateOne({
                    _id: data.companyId
                }, {
                    $pull: {
                        [`subscribed_policy.${data.index}.reviewer`]: data.userId
                    }
                }, function (err, res){
                    if (err) {
                        console.log(err);
                    } else { 
                        //set up email content
                        const mailOptions = {
                            from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                            to: response.company_email, // list of receivers
                            subject: data.policyName + ' Review Update', // Subject line
                            html: '<h1> ' + data.policyName +
                                ' has been reviewed.</h1>' + '<br><p>' +
                                data.fname + ' ' + data.lname + ' has reviewed the policy. <br>' +
                                'Below is the detail of the review:</p><br>' +
                                'Review Feedback:' + ' ' + data.review +
                                '<p>Please sign-in to your account to view Policy details. </p>'
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                console.log(err)
                            else
                                console.log(info);
                        });
                    } 
                })
            }else if(data.review === "ACCEPTED"){
                //remove reviewer
                Company.updateOne({
                    _id: data.companyId
                }, {
                    $pull: {
                        [`subscribed_policy.${data.index}.reviewer`]: data.userId
                    }
                }, function (err, res){
                    if (err) {
                        console.log(err);
                    } else { 
                        const mailOptions = {
                            from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                            to: response.company_email, // list of receivers
                            subject: data.policyName + ' Review Update', // Subject line
                            html: '<h1> ' + data.policyName +
                                ' has been reviewed.</h1>' + '<br><p>' +
                                data.fname + ' ' + data.lname + ' has reviewed the policy. <br>' +
                                'Below is the detail of the review:</p><br>' +
                                'Review Feedback:' + ' ' + data.review +
                                '<p>Please sign-in to your account to view Policy details. </p>'
                        };
                        transporter.sendMail(mailOptions, function (err, info) {
                            if (err)
                                console.log(err)
                            else
                                console.log(info);
                        });
                    }
                })
            }else{
                // console.log("####LEFT COMMENT")
                const mailOptions = {
                    from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                    to: response.company_email, // list of receivers
                    subject: data.policyName + ' Review Update', // Subject line
                    html: '<h1> ' + data.policyName +
                        ' has been reviewed.</h1>' + '<br><p>' +
                        data.fname + ' ' + data.lname + ' has reviewed the policy. <br>' +
                        'Below is the detail of the review:</p><br>' +
                        'Review Comment:<br>' + data.comment +
                        '<p>Please sign-in to your account to view Policy details. </p>'
                };
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });
            }
            if(data.review !== "COMMENT"){
                User.updateOne({
                    _id: data.userId
                }, {
                    $unset: {
                        user_type: ""
                    }
                }, function (err, res) {
                    if (err) {
                        console.log(err);
                    }
                })
            }
            res.json({
                value: "success",
                message: "User details updated"
            });
        }
    });
}