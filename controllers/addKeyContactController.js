require("../models/company.model.js");
const mongoose = require('mongoose'); 
const User = mongoose.model('User');
const Company = mongoose.model('Company');

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
                    // Company.findById(response.company, function(err,goalCompany) {
                    //     numberOfUsers=goalCompany.user.length;
                    //     console.log(numberOfUsers);
                    //    goalCompany.user[numberOfUsers]=NewUser._id;
                    //    console.log(goalCompany.user[numberOfUsers]);
                    //    console.log(goalCompany);
                    //     goalCompany.save()
                    // });
                      
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