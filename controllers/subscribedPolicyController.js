/*!

=========================================================
* IT Policy Manager - v1.1.0
=========================================================

* Coded by IT Policy Team

=========================================================

* Policy subscription component for server side.
*/
require('dotenv').config();

const mongoConnectionString = "mongodb://127.0.0.1/it_psych_db";
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: mongoConnectionString } });

const mongoose = require('mongoose');
require("../models/company.model.js");
require("../models/policy.model");
require("../models/SubscribedPolicy.model")
const Company = mongoose.model('Company');
const SubscribedPolicy=mongoose.model('SubscribedPolicy');
const Policy = mongoose.model('Policy');
const User=mongoose.model('User');
const NodeMailer=require('nodemailer');
var moment = require('moment');


/*!
    Getting the Subscribed Policy Details for the Company
    req: Company Name = company_name
*/
exports.subscribedPolicyGet = async (req, res) => {
    //find company details in the company table
    Company.findOne({
        company_name: req.query.company_name
    }, function (error, company) {
        if (error) {
            console.log("Error: " + error);
        } else {
            //get subscribed policy/ies in the company
            if (company.subscribed_policy !== null) {
                res.json(company.subscribed_policy);
            } else {
                res.json({
                    message: "empty"
                });
            }
            // console.log(company.subscribed_policy);
        }
    })
};

/*!
    Updating the Subscribed Policy Details for the Company
    req: Company Name = company_name,
        Subscribed Policy Details = [
            policy name,
            policy version,
            policy content
        ]
*/
exports.getSubscribedPolicy = async (req, res) => {
    let subscribedPolicy=[];
    console.log("CompanyID: "+req.query.company_id)
    if(req.query.policy_type==="one"){
        console.log(req.query.policyId)
        SubscribedPolicy.findOne({
            policy_id:req.query.policyId
        },function(error,subscribedPolicy){
            if(!error){
                res.json(subscribedPolicy)
            }
            else{
                console.log(error)
            }
        })
     }
     else{
        SubscribedPolicy.find({
            company_id: req.query.company_id
        }, function (error, response) {
            subscribedPolicy=response;
            if (error) {
                console.log("Error: " + error);
            } else {
                if (subscribedPolicy!== null) {
                    if(req.query.policy_id!==""){
                        for(let i=0;i<subscribedPolicy.length;i++){
                            if(subscribedPolicy[i].policy_id===req.query.policy_id){
                                subscribedPolicy=subscribedPolicy[i];
                                break;
                            }
                        }
                    }
                    res.json(subscribedPolicy);
                } else {
                    res.json({
                        message: "empty"
                    });
                }
                 console.log(subscribedPolicy);
            }
        })
     }
    
};

exports.subscribedPolicyPost = (req, res) => {
    let contentDetails = req.body;
    //Get company details in the company table
    Company.findOne({
        company_name: contentDetails.company_name
    }, function (error, company) {
        if (error) {
            console.log("Error: " + error);
        } else {
            //Update subscribed policy details
            let index;
            for (let i = 0; i < company.subscribed_policy.length; i++) {
                if (company.subscribed_policy[i].name === contentDetails.policy_name) {
                    // console.log(company.subscribed_policy[i]);
                    index = i;
                    break;
                }
            }
            let version = company.subscribed_policy[index].version;
            company.subscribed_policy[index].content = contentDetails.updatedcontent;
            company.subscribed_policy[index].version = version + 0.1;
            // console.log( "version: "+company.subscribed_policy[index].version);

            //save updated details for the company
            company.save();
            SubscribedPolicy.findOneAndUpdate(
                {company_id:localStorage.getItem("session_id")},
                {version:version+0.1}
                );
            status = "success";
            res.json({
                status
            });
        }
    })

};


  

exports.subscribedPolicySave = (req, res) => {
    let subscribedPolicyDetails=req.body; 
    console.log("subscribedPolicyDetails"+subscribedPolicyDetails.content)    
        var subscribedPolicy = new SubscribedPolicy({
            company_id:subscribedPolicyDetails.companyId,
            policy_id:subscribedPolicyDetails.policyId,
            policy_name:subscribedPolicyDetails.name,  
            content:subscribedPolicyDetails.content,          
            reviewed_date:subscribedPolicyDetails.reviewed_date,
            approval_date:subscribedPolicyDetails.approval_date,
            date_subscribed:subscribedPolicyDetails.date_subscribed,
            status:subscribedPolicyDetails.status,
            date_subscribed: moment(),
            date_expired: moment().add(12, 'M'),
            version:subscribedPolicyDetails.version
           // reviewer_list:subscribedPolicyDetails.reviewer_list
    //         review_status: subscribedPolicyDetails.review_status,
    //         review_reminder_email_sent:subscribedPolicyDetails.review_reminder_email_sent,
    //         review_reminder_email_error:subscribedPolicyDetails.review_reminder_email_error,
    //         review_first_email_sent_time:subscribedPolicyDetails.review_first_email_sent_time,
    //   reviewer_list:[{
    //     review_status: false,
    //     review_reminder_email_sent:false,
    //     review_reminder_email_error:false,
    //     review_first_email_sent_time:"",
    //   }]
        });
        subscribedPolicy.save();        
}

exports.subscribedPolicyUpdate = (req,res) => {
    let subscribedPolicyDetails=req.body;
    console.log(subscribedPolicyDetails.company_name)
    if(subscribedPolicyDetails.content!==null){
        SubscribedPolicy.findOneAndUpdate(
            {
                "policy_id":subscribedPolicyDetails.policy_id
            },
            {
                "content":subscribedPolicyDetails.updatedcontent
            }
            ,function(error){
                if (!error) {
                    res.json({
                        result :"success"
                    });
                } else {
                    console.log(error);
                }
            });
    } else {
        console.log("SUBSCRIBERS==>"+subscribedPolicyDetails.reviewerList.length);
        console.log("Policy Id"+subscribedPolicyDetails.policy_id)
            SubscribedPolicy.findOne(
                {
                    policy_id:subscribedPolicyDetails.policy_id
                }
                // {
                // //     // "reviewed_date":subscribedPolicyDetails.reviewed_date,
                // //     // "review_status": subscribedPolicyDetails.review_status,
                // //     // "review_reminder_email_sent":subscribedPolicyDetails.review_reminder_email_sent,
                // //     // "review_reminder_email_error":subscribedPolicyDetails.review_reminder_email_error,
                // //     // "review_first_email_sent_time":new Date(),
                //      "reviewer_list.review_status":"not reviewed"//subscribedPolicyDetails.reviewer_list
                //  }
                ,function(error,subscribedPolicy){
                    if (!error) {
                        let user=[];
                            console.log("Subscribed Policy Reviewers: "+subscribedPolicyDetails.reviewer_list)
                            subscribedPolicy.reviewer_list=subscribedPolicyDetails.reviewer_list;
                            subscribedPolicy.save();
                            for(let i=0;i<subscribedPolicyDetails.reviewer_list.length;i++){
                                 User.findOne({
                                    _id:subscribedPolicyDetails.reviewer_list[i].reviewer_id
                                },function(error,response){
                                    user=response;
                                    console.log("Subscribed: "+subscribedPolicyDetails.companyId + "/" + subscribedPolicy.policy_name + "/" + user._id);
                                    let pName = subscribedPolicy.policy_name.replace(/\s+/g, "-");
                                    let generalLink = ("http://localhost:3000/review-policy/" +
                                    subscribedPolicyDetails.companyId + "/" + pName + "/" + user._id);
                                    const mailOptions={
                                                from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                                                to: user.email, 
                                                subject:subscribedPolicy.policy_name + " " + 'review request',
                                                html: '<h2>Welcome to IT Policy Manager!</h2>' +
                                                        '<p> You have been set as a reviewer for ' + subscribedPolicy.policy_name + '<br>' +
                                                        'Below is the link to view and review the policy.<br><br>' +
                                                        'Below is the link to view and review the policy.<br><br>' +
                                                        '<a href=' + generalLink + '>CLICK HERE: Policy document to be reviewed.</a>  '
                                            };
                                            transporter.sendMail(mailOptions,function(err,info){
                                                if(err){
                                                    console.log(err);
                                                }
                                                else{
                                                    console.log(info);
                                                }
                                            })
                                })
                            }
                                
                            // function(error){
                            //     
                            // });
                        console.log("response is: "+SubscribedPolicy)
                        res.json({
                            status :"success"
                        });
                    } else {
                        console.log(error);
                    }
                });
        
    }     
    
};

exports.sendAssessmentToReviewers=(req,res)=>{
    var details=req.body;
    console.log("ID: "+details.policyId)

    Policy.findById({
        _id:details.policyId
    },function(error,response){
        if(!error){            
            let generalLink=("http://localhost:3000/send-assessment/"+response._id + "/" + details.userId);
            const mailOptions={
                from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                to: details.email, 
                subject:'The policy is not reviewed',
                html: 'You have been set to take a short test for ' + response.policy_name + '</br></br>' +
                      'Below is the link to view and review the policy.<br><br>' +
                      '<a href=' + generalLink + '>CLICK HERE: Policy Assessment to be taken.</a>' +
                     '</br></br></br></br></br></br></br>' +
                     'Thank you.</br></br>'+
                     'Regards,</br'+
                     'IT Policy Manager'
            };
            transporter.sendMail(mailOptions,function(err,info){
                if(err){
                    console.log(err);
                }
                else{
                    
                    console.log(info);
                }
            })
            res.json({
                status:"success"
            })
        }
        else{
            console.log(error)
        }
    });                
}

const transporter=NodeMailer.createTransport({
    service:'gmail',
    auth:{
        user: 'itpsychiatrist.policymanager@gmail.com',
        pass: 'Aspire2CKD'
    }
});
 