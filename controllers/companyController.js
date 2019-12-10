const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');

exports.companyGet = (req, res) => {
    res.send({
        message: "Get is working"
    });

};

exports.companyPost = (req, res) => {
    let matchPolicy= req.body;
    Company.findOneAndUpdate({_id: matchPolicy.id}, {match_policy: matchPolicy.policies}, function(err, response) {
        if(!err){
        console.log(response);
        }else{
            console.log(err);
        }
     });
}