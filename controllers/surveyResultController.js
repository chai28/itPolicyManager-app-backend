const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const policy = mongoose.model('Policy');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

exports.surveyResultGet = async (req, res) => {
    var surveyResult= [];
    
    Company.findOne({company_name:req.query.companyName}, async function (error, company){
        if (error) {
            console.log("Error: " + error);
            return;
        } 

        match_policies = await policy.find().where('_id').in(company.match_policy).exec();
        surveyResult = match_policies.map(match_policy => match_policy.policy_name);

        res.json( surveyResult );
    })


};

exports.surveyResultPost = (req, res) => {
    
    
};