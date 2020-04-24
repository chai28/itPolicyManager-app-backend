const mongoose = require('mongoose');
require("../models/company.model.js");
const Company = mongoose.model('Company');
const User = mongoose.model('User');
const Policy = mongoose.model('Policy');

exports.companyGet = (req, res) => {
    const companyDetails=req.query;
    console.log("Type"+companyDetails._id);
    //Get user information to get the company ID
    if (req.query.type === "company") {
        console.log("I am here");
        Company.findOne({
                company_name: req.query._id
            },
            function (err, response) {
                if (!err) {
                    // console.log("company: " + response);
                    res.json(response);
                } else {
                    console.log(err);
                }
            });
    } else if(req.query.type === "companyAll"){
        Company.find({status:true},
            function (err, response) {
            if (!err) {
                // console.log("company: " + response);
                res.json(response);
            } else {
                console.log(err);
            }
        });
    } else if(req.query.type === "companyAllInactive"){
        Company.find({status:false},
            function (err, response) {
            if (!err) {
                // console.log("company: " + response);
                res.json(response);
            } else {
                console.log(err);
            }
        });
    }else {
        console.log("My role is user"+req.query._id)
        User.findOne({
                "_id": req.query._id
            },
            function (err, response) {
                if (!err) {
                    console.log("user: " + response);
                    res.json(response);
                } else {
                    console.log(err);
                }
            });
    }
};

exports.companyPost = (req, res) => {
    let matchPolicy = req.body;
    console.log("Policies:"+matchPolicy.policies);
    // console.log(matchPolicy.policies);
    // console.log("company id: " + matchPolicy.id);
    if(matchPolicy.status === "new"){
        console.log("I am new");
        Company.findByIdAndUpdate(matchPolicy.id, {
            "$push": {
                "match_policy": matchPolicy.policies
            }
        }, function (err, response) {
            if (!err) {
                res.json({
                    result :"success"
                });
            } else {
                console.log(err);
            }
        }); 
    }
    else if(matchPolicy.status==="delete"){
        console.log("Status"+matchPolicy.status);
            User.findByIdAndRemove({
                _id: matchPolicy.id
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
    else{
        Company.findOneAndUpdate({"company_name": matchPolicy.name}, {
            "$push": {
                "match_policy": matchPolicy.policies
            }, upsert: true,
            new: true
        }, function (err, response) {
            if (!err) {
                res.json({
                    result :"success"
                });
            } else {
                console.log(err);
            }
        });
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

exports.registerPost = (req, res) => {
    let RegInfo = req.body; //Get the parsed information
    console.log(RegInfo);
    if (!RegInfo) {
        res.json({
            message: "No Input"
        })
    } else {
        Company.findOne({nzbn: RegInfo.nzbnInput}, function (error, company) {
            // console.log("response: " + company);
            // console.log("error: " + error);
            //Save the Address
            let Address;
            if(RegInfo.bAddr && RegInfo.bAddr2 &&RegInfo.bCity&&RegInfo.bState&&RegInfo.bState&&RegInfo.bZip){
                Address = RegInfo.bAddr + " " + RegInfo.bAddr2 + " " + RegInfo.bCity + " " + RegInfo.bState + " " + RegInfo.bZip;
            }else{
                 Address="";
            }
            let username=setupUsername(RegInfo.bNameInput,RegInfo.nzbnInput);
            let password=setupPassword();
            // console.log("Address: " + Address);
            if (!company) {
                var NewCompany = new Company({
                    company_name: RegInfo.bNameInput,
                    company_email: RegInfo.bEmail,
                    nzbn: RegInfo.nzbnInput,
                    address: Address,
                    contact: RegInfo.bContact,
                    date_registered: Date.now(),
                    description: RegInfo.bDescription,
                    status:true
                    // logo: RegInfo,
                })
                console.log(NewCompany);
                companyId=NewCompany._id;
                NewCompany.save(function(err, Company){
                    if(err){
                        res.json({
                            message: "Registration failed!",
                            value:false
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
                            message: "Registration Successful!",
                            value:true,
                            id: companyId
                        })
                        console.log("res: "+res.id);
                    }
                })
            }else{
                res.json({
                    message: "Company already existed! Login Instead",
                    value:false
                })
            }
        });
    };
    
};

exports.companyDelete=(req,res)=>{
   let data=req.body;
   Company.findByIdAndRemove({
       _id:data.companyId
   },function(error,response){
       if(!error){
           User.findOneAndRemove({company:data.companyId},function(error2,response2){
               if(!error2){
                res.json({
                    status:"success"
                })
               }
               else{
                   console.log(error2)
               }
           })
           
       }
       else{
           console.log(error)
       }
   })   
}


exports.getSuggestedPolicy = async (req, res) => {

    let user_id = req.query.user_id;

    let query = await User.findOne({_id: user_id})
        .populate({
            path: 'company',
            model: 'Company',
            populate: {
                path: 'match_policy',
                model: 'Policy'
            }
        });

    res.json(query);

}