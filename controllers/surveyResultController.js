const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const policy = mongoose.model('Policy');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

exports.surveyResultGet = (req, res) => {
    function getSurveyResult(company){
        global.surveyResult=[];
        for( var i=0; i < company.match_policy.length; i++){
            policy.findById(company.match_policy[i], function(err,goalPolicy){
               //console.log(goalPolicy);
               surveyResult[i]=goalPolicy.policy_name;
            //    surveyResult.push(goalPolicy);
            console.log("survey result i: "+surveyResult[i]);
         });
         console.log("survey result inside loop: "+surveyResult);
        }
        return surveyResult;
    }
  var surveyResult= [];
    Company.findOne({company_name:req.query.companyName}, function (error, company){
        if (error) {
            console.log("Error: " + error);
        } else {
            surveyResult=getSurveyResult(company);
            console.log(surveyResult);
            res.json(surveyResult);
        }
    })
};

exports.surveyResultPost = (req, res) => {
    
    
};