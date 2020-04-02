const mongoose = require("mongoose");
require("../models/company.model.js");
const Company = mongoose.model("Company");
const User = mongoose.model("User");
const Nodemailer = require('nodemailer');

exports.reviewPolicyGet = async (req, res) => {
    console.log("company name" + req.query.company_name);
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
            for(let i=0;i<policy.length;i++){
                if(dataInfo.status==="not reviewed" && policy[i].name===dataInfo.policyName){                    
                    policy[i].reviewer=dataInfo.reviewerList;
                    if(dataInfo.isPolicyBlocked===false){
                        policy[i].status="confirmation";
                    }
                }
                
            }

            //update policy status
            // for (let i = 0; i < policy.length; i++) {
            //     if (policy[i].name === dataInfo.policyName) {
            //         console.log(policy[i].name); //test
            //         if (dataInfo.status === "not reviewed") {
            //             // console.log("confirmation")
            //             policy[i].status = "confirmation";
            //             policy[i].reviewer = dataInfo.reviewerList;
            //             // console.log("policy[i].reviewer" + policy[i].reviewer)
            //         } else if (dataInfo.status === "confirmation") {
            //             // console.log("adoption")
            //             policy[i].status = "adoption";
            //             policy[i].reviewer = dataInfo.reviewerList;
            //             // console.log("policy[i].reviewer" + policy[i].reviewer)
            //         } else if (dataInfo.status === "adoption") {
            //             // console.log("awareness")
            //             policy[i].status = "awareness";
            //             policy[i].reviewer = dataInfo.reviewerList;
            //             // console.log("policy[i].reviewer" + policy[i].reviewer)
            //         } else if (dataInfo.status === "awareness") {
            //             // console.log("reporting")
            //             policy[i].status = "reporting";
            //             policy[i].reviewer = dataInfo.reviewerList;
            //             // console.log("policy[i].reviewer" + policy[i].reviewer)
            //         } else {
            //             // console.log("done")
            //             policy[i].status = "done";
            //         }
            //         break;
            //     }
            // }
            companyDetails.subscribed_policy = policy;
            console.log("companyDetails.subscribed_policy ==> " + companyDetails.subscribed_policy)
            Company.updateOne({_id: companyDetails._id},{
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
                                userDetails.user_type = "";
                                console.log("Datainfo"+companyDetails.subscribed_policy.name)
                                userDetails.reviewPolicyList.push(dataInfo.policy_name);
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
                                        subject: pName + 'review request', // Subject line
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