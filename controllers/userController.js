const mongoose = require('mongoose');
require("../models/company.model.js");
const User = mongoose.model('User');

exports.userGet = (req, res) => {
    let users = [];
    //Get user information to get the company ID
    User.find({
        company: req.query.companyId
        }, function (err, response) {
            if (!err) {
                console.log("key contacts: " + response);
                users = response;
                console.log("users: " + users);
                res.json(users);
            } else {
                console.log(err);
            }
        }
    );
};

exports.userPost = (req, res) => {
    let contactInfo = req.body; //Get the parsed information
    console.log(contactInfo);
    if(contactInfo.action === "delete"){
        User.findByIdAndRemove({
            _id: contactInfo.userId
        },
        function (error, response) {
            if (!error) {
                console.log("response: " + response);
                res.json({
                    status: "success",
                    message: "Delete Successful!"
                });
                //console.log(response);
            } else {
                console.log(err);
            }
        });
    }   
    else if(contactInfo.action === "add"){
        let contactInfo = req.body; //Get the parsed information
        console.log(contactInfo);
        if (!contactInfo) {
            res.json({
            message: "No Input",
            value: false
            });
        } else {
        User.findOne({
            _id: contactInfo.userId},"company",
        function(error, response) {
            console.log(response.company);
            if (error) {
            res.json({
                message: "no company details" + response,
                value: false
            });
            } else {
                User.findOne({
                    email: contactInfo.email, company:response.company},"email",
                    function(err, email) {
                    if (!email) {
                        console.log(email);
                        var NewUser = new User({
                        company: response.company,
                        fname: contactInfo.fname,
                        lname: contactInfo.lname,
                        email: contactInfo.email,
                        position: contactInfo.position,
                        Status:false
                        });
                        console.log(NewUser);
                        NewUser.save(function(err) {
                        res.json({
                            message: "Add Successful!",
                            status :"success"
                        });
                        });
                        // Company.findById(response.company, function(err,goalCompany) {
                        //     numberOfUsers=goalCompany.user.length;
                        //     console.log(numberOfUsers);
                        //    goalCompany.user[numberOfUsers]=NewUser._id;
                        //    console.log(goalCompany.user[numberOfUsers]);
                        //    console.log(goalCompany);
                        //     goalCompany.save()
                        // });
                    } else {
                        res.json({
                        message: "User already exists",
                        status : "fail"
                        });
                    }
                });
            }
        });
    }
    
    }
    
}

exports.addAccountablePerson=(req,res)=>{
    let userDetails=req.body;
    console.log("userDetails"+userDetails);
    if (!userDetails) {
        res.json({
            message: "No Input"
        })
    } else {
                   // console.log("response: " + company);
            // console.log("error: " + error);
            //Save the Address
            let Address;
            if(userDetails.AAddr && userDetails.AAddr2 && userDetails.ACity&&userDetails.AState&&userDetails.AState&&userDetails.AZip){
                Address = userDetails.AAddr + " " + userDetails.AAddr2 + " " + userDetails.ACity + " " + userDetails.AState + " " + userDetails.AZip;
            }else{
                 Address="";
            }
            let username=setupUsername(userDetails.fNameInput,userDetails.lNameInput);
            let password=setupPassword();
            // console.log("Address: " + Address);
                var NewUser = new User({
                    fname: userDetails.fNameInput,
                    lname: userDetails.lNameInput,
                    email: userDetails.AEmail,
                    // nzbn: userDetails.nzbnInput,
                    address: Address,
                    contact: userDetails.AContact,
                    position: "Accountable Person",
                    username:username,
                    password:password,
                    company:userDetails.company
                    // logo: RegInfo,
                })
                console.log(NewUser);
                        NewUser.save(function(err){
                          //set up email content
                            const mailOptions = {
                                from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                                to: NewUser.email, // list of receivers
                                subject: 'Your IT Policy Manager Login Credentials', // Subject line
                                html: '<h2>Welcome to IT Policy Manager!</h2>' + '<p> Thank you for registering. <br>' +
                                'Below is your login details, use these credential to acces your IT Policy Manager Account.<br><br>' +
                                'User Name:' + NewUser.username + ' <br> Temporary Password: ' + NewUser.password + ' </p>' +
                                '<p>Please click on the link to sign-in. </p> <a href="http://localhost:3000/signin-page">IT Policy Manager Login</a>  '
                            };
                            transporter.sendMail(mailOptions, function (err, info) {
                                if(err)
                                console.log(err)
                                else
                                console.log(info);
                            });


                        })
                        res.json({
                            message: "Registration Successful!",
                            value:true,
                        })
                        console.log("res: "+res.id);
                    }
            
}

const Nodemailer = require('nodemailer');

//generate username
function setupUsername(bNameInput,nzbnInput){
    //remove space
    bNameInput=bNameInput.replace(/\s/g,'');
    //get the first2 and last2 characters
    f2=bNameInput.slice(0,2);
    l2=bNameInput.slice(-2);
    //capital
    f2=changeUppercase(f2);
    l2=changeUppercase(l2);
    //generate username
    username=f2+nzbnInput+l2;
    return username;
}
function changeUppercase(inputString){
    re=inputString.split("");
    lengths=re.length;
    inputString=inputString.slice(0,-1).toLowerCase();
    capital=re[lengths-1].toUpperCase();
    inputString=inputString+capital;
    return inputString;
}

//generate password
function setupPassword(){
    var length = 8,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    pass = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
    pass += charset.charAt(Math.floor(Math.random() * n));
    }
    return pass;
}

// Email Notification for Registration 
//set up transporter
const transporter = Nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'itpsychiatrist.policymanager@gmail.com',
           pass: 'Aspire2CKD'
       }
});