const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');
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