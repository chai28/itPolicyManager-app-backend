require("../models/company.model.js");
const mongoose = require('mongoose'); 
const User = mongoose.model('User');

exports.addKeyContactGet = (req, res) => {
    res.send({
        message: "add key contact is working"
    });
};

exports.addKeyContactPost = (req, res) => {
    let contactInfo = req.body; //Get the parsed information
    console.log(contactInfo);
    if (!contactInfo) {
        res.json({
            message: "No Input",
            value:false
        })
    } else {
        User.findOne({_id:contactInfo.userId},"company", function (error, response){
            console.log(response.company)
            if (error) {
                res.json({
                    message: "no company details" + response,
                    value:false
                })
            } else {
                User.findOne({email:contactInfo.email},"email",function(err,email){
                 if(!email){
                     console.log(email);
                    var NewUser=new User({
                        company:response.company,
                        fname:contactInfo.fname,
                        lname:contactInfo.lname,
                        email:contactInfo.email,
                        position:contactInfo.position
                    })
                    console.log(NewUser);
                    NewUser.save(function(err){
                        res.json({
                            message: "Add Successful!",
                            value:true
                        })
                    })
                    
                 }else{
                    res.json({
                        message: "User already exists",
                        value:false
                    })
                 }
                })

               
            }
        })   
    }
    
};