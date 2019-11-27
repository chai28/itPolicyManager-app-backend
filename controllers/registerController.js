const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');


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
            console.log("Address: " + Address);
            if (!company) {
                var NewCompany = new Company({
                    company_name: RegInfo.bNameInput,
                    company_email: RegInfo.bEmail,
                    nzbn: RegInfo.nzbnInput,
                    address: Address,
                    contact: RegInfo.bCOntact,
                    date_registered: Date.now(),
                    description: RegInfo.bDescription
                    // logo: RegInfo,
                })
                console.log(NewCompany);
                NewCompany.save(function(err, Company){
                    if(err){
                        res.json({
                            message: "Registration failed!"
                        })
                    }else{
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