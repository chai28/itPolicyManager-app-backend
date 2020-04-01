/*!

=========================================================
* IT Policy Manager - v1.1.0
=========================================================

* Coded by IT Policy Team

=========================================================

* Policy subscription component for server side.
*/


const mongoose = require('mongoose');
require("../models/company.model.js");
require("../models/policy.model");
require("../models/SubscribedPolicy.model")
const Company = mongoose.model('Company');
const SubscribedPolicy=mongoose.model('SubscribedPolicy');
const Policy = mongoose.model('Policy');
const User=mongoose.model('User');

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
    SubscribedPolicy.find({
        company_id: req.query.company_id
    }, function (error, response) {
        subscribedPolicy=response;
        if (error) {
            console.log("Error: " + error);
        } else {
            if (subscribedPolicy!== null) {
                if(req.query.policy_id!==""){
                    console.log("I am in if 1")
                    for(let i=0;i<subscribedPolicy.length;i++){
                        console.log("I am in for"+req.query.policy_id+" "+subscribedPolicy[i].policy_id)
                        if(subscribedPolicy[i].policy_id===req.query.policy_id){
                            console.log("I am in if 2")
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
            status:subscribedPolicyDetails.status,
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
                            console.log("Subscribed Policy Reviewers: "+subscribedPolicyDetails.reviewer_list)
                            subscribedPolicy.reviewer_list=subscribedPolicyDetails.reviewer_list;
                            subscribedPolicy.save();
                        console.log("response is: "+SubscribedPolicy)
                        res.json({
                            status :"success"
                        });
                    } else {
                        console.log(error);
                    }
                });
        
    }     
    
}
 