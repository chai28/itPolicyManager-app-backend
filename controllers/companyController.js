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
    console.log(matchPolicy.policies);
    console.log("company id: "+matchPolicy.id);
    Company.findByIdAndUpdate(matchPolicy.id, {"$push": { "match_policy": matchPolicy.policies } }, function(err, response) {
        if(!err){
        //console.log(response);
        }else{
            console.log(err);
        }
     });
}