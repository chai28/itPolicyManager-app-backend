const mongoose = require("mongoose");
require("../models/company.model.js");
const Company = mongoose.model("Company");
const User = mongoose.model("User");
const Nodemailer = require('nodemailer');

exports.reviewPolicyGet = async (req, res) => {
    console.log("company name"+ req.query.company_name);
    Company.findOne({
            company_name: req.query.company_name
        },
        function (error, company) {
            if (error) {
                console.log("Error: " + error);
            } else {
                let singlePolicy;
                for (let i = 0; i < company.subscribed_policy.length; i++) {
                    if (company.subscribed_policy[i].name === req.query.policy_name) {
                        // console.log(company.subscribed_policy[i]);
                        singlePolicy = company.subscribed_policy[i];
                        break;
                    }
                }
                res.json({
                    singlePolicy,
                    company
                });
            }
        }
    );
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


exports.reviewPolicyPost = async (req, res) => {
    let dataInfo = req.body.data; //Get the parsed information
    Company.findOne({
        company_name: dataInfo.company_name
    }, function (error, companyDetails) {
        if (error) {
            console.log("Error: " + error);
        } else {
            let policy = companyDetails.subscribed_policy;

            //update policy status
            for (let i = 0; i < policy.length; i++) {
                if (policy[i].name === dataInfo.policyName) {
                    console.log(policy[i].name); //test
                    if (dataInfo.status === "not reviewed") {
                        // console.log("1")
                        policy[i].status = "confirmation";
                        policy[i].reviewer = dataInfo.reviewerList;
                        // console.log("policy[i].reviewer" + policy[i].reviewer)
                    } else if (dataInfo.status === "confirmation") {
                        // console.log("2")
                        policy[i].status = "adoption";
                        policy[i].reviewer = dataInfo.reviewerList;
                        // console.log("policy[i].reviewer" + policy[i].reviewer)
                    } else if (dataInfo.status === "adoption") {
                        // console.log("3")
                        policy[i].status = "awareness";
                        policy[i].reviewer = dataInfo.reviewerList;
                        // console.log("policy[i].reviewer" + policy[i].reviewer)
                    } else {
                        // console.log("4")
                        policy[i].status = "done";
                    }
                    break;
                }
            }
            companyDetails.subscribed_policy = policy;
            // console.log("companyDetails.subscribed_policy ==> " + companyDetails.subscribed_policy)
            Company.updateOne({
                subscribed_policy: companyDetails.subscribed_policy
            }, function (err, response) {
                if (err) {
                    console.log(err);
                    res.json({
                        value: "failure"
                    })
                } else {
                    //add update user
                    // console.log("=======> " + dataInfo.reviewerList)
                    for (let i = 0; i < dataInfo.reviewerList.length; i++) {
                        User.findOne({
                            _id: dataInfo.reviewerList[i]
                        }, function (error, userDetails) {
                            if (err) {
                                console.log(err);
                            } else {
                                let status
                                if (dataInfo.status === "not reviewed") {
                                    status = "confirmation";
                                } else if (dataInfo.status === "confirmation") {
                                    status = "adoption";
                                } else if (dataInfo.status === "adoption") {
                                    status = "awareness";
                                } else {
                                    status = "reviewed";
                                }
                                userDetails.user_type = status;
                                //Generate access link
                                let pName = dataInfo.policyName.replace(/\s+/g, "-");
                                let generalLink = ("http://localhost:3000/review-policy/" +
                                    companyDetails._id + "/" + pName + "/" + userDetails._id);
                                // console.log("generalLink ===> " + generalLink);
                                userDetails.save(function (err) {
                                    //set up email content
                                    const mailOptions = {
                                        from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                                        to: userDetails.email, // list of receivers
                                        subject: 'Your IT Policy Manager Login Credentials', // Subject line
                                        html: '<h2>Welcome to IT Policy Manager!</h2>' +
                                            '<p> You have been set as a reviewer for dataInfo.policyName. <br>' +
                                            'Below is the link to view and review the policy.<br><br>' +
                                            'Below is the link to view and review the policy.<br><br>' +
                                            '<a href=' + generalLink + '>CLICK HERE: Policy document to be reviewed.</a>  '
                                    };
                                    transporter.sendMail(mailOptions, function (err, info) {
                                        if (err)
                                            console.log(err)
                                        else
                                            console.log(info);
                                    });


                                })
                            }
                        })
                    }
                    res.json({
                        message: "review workflow post is working",
                        value: "success"
                    });
                }
            })
        }
    });
};