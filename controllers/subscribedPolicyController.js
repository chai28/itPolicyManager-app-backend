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
const Company = mongoose.model('Company');

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
            status = "success";
            res.json({
                status
            });
        }
    })

};