const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const policy = mongoose.model('Policy');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

exports.surveyResultGet = (req, res) => {
    var surveyResult= [];
    function getSurveyResult(company,i){
        policy.findById(company.match_policy[i], function(err,goalPolicy){
            surveyResult=goalPolicy.policy_name;
            console.log("first log:"+surveyResult);
            return surveyResult;
         });
    }
    
    Company.findOne({company_name:req.query.companyName}, function (error, company){
        if (error) {
            console.log("Error: " + error);
        } else {
         for(var j=1;j<company.match_policy.length;j++){
            getSurveyResult(company,j);
         }
         console.log("second log:"+getSurveyResult(company,0)); 
         res.json(surveyResult);
        }
    })
};

exports.surveyResultPost = (req, res) => {
    
    
};