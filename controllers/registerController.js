const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');
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


exports.registerGet = (req, res) => {
    res.send({
        message: "Register Get is working"
    });
};

exports.registerPost = (req, res) => {
    let RegInfo = req.body; //Get the parsed information
    console.log(RegInfo);
    if (!RegInfo) {
        res.json({
            message: "No Input"
        })
    } else {
        Company.findOne({nzbn: RegInfo.nzbnInput}, function (error, company) {
            console.log("response: " + company);
            console.log("error: " + error);
            //Save the Address
            let Address = RegInfo.bAddr + " " + RegInfo.bAddr2 + " " + RegInfo.bCity + " " + RegInfo.bState + " " + RegInfo.bZip;
            let username=setupUsername(RegInfo.bNameInput,RegInfo.nzbnInput);
            let password=setupPassword();
            console.log("Address: " + Address);
            if (!company) {
                var NewCompany = new Company({
                    company_name: RegInfo.bNameInput,
                    company_email: RegInfo.bEmail,
                    nzbn: RegInfo.nzbnInput,
                    address: Address,
                    contact: RegInfo.bContact,
                    date_registered: Date.now(),
                    description: RegInfo.bDescription
                    // logo: RegInfo,
                })
                console.log(NewCompany);
                companyId=NewCompany._id;
                NewCompany.save(function(err, Company){
                    if(err){
                        res.json({
                            message: "Registration failed!"
                        })
                    }else{
                        var NewUser=new User({
                            user_type:'comp_initiator',
                            company:companyId,
                            username:username,
                            password:password
                        })
                        console.log(NewUser);
                        NewUser.save(function(err){
                          //set up email content
                            const mailOptions = {
                                from: 'itpsychiatrist.policymanager@gmail.com', // sender address
                                to: NewCompany.company_email, // list of receivers
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
                            message: "Registration Successful!"
                        })
                    }
                })
            }else{
                res.json({
                    message: "Company already existed! Login Instead"
                })
            }
        });
    };
    
};