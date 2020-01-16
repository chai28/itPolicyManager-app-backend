const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
// var passport = require('passport')
exports.logout = (req, res) => {
    // let userId = req.body.userId;
    // sessions.findOneAndRemove({userId: userId});
    
    // if (req.session) {

    //     // delete session object
    //     req.session.destroy(error => {

    //         req.session = null;
    //         if (error) return next(error);

    //         res.send({ logout: true })
    //     });
    // }
    //console.log(req.body.userId);
    req.session.destroy(function(err) {
        console.log("After destroy "+req.session)
    })

};