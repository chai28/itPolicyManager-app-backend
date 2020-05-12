const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');

exports.signInPost = (request, response) => {
    let loginData = makeFilter(request); //Get the parsed information
    User.findOne(loginData)
        .populate('company', 'company_name')
        .exec()
        .then(result => {
            if (!result) {
                // If no user has been found
                response
                    .status(401)
                    .json(getUserNotFoundMessage());
            } else {
                createSession(result, request);
                response
                    .status(200)
                    .json(getLoginMessage(result));
            }
        })
        .catch(error => {
            if (error) {
                logError(error);
                response
                    .status(500)
                    // TODO change the error's message
                    .json({error: error.toString()});
            }
        });
}

/**
 * Extracts required data form the request
 * in order to create filter for user search
 * @param request
 * @returns Filter
 */
function makeFilter(request) {
    let filter = {};
    filter.username = request.body.username;
    filter.password = request.body.password;
    return filter;
}

/**
 * Processes an error occurrence
 * @param error - Error
 */
function logError(error) {
    console.log("error: " + error);
}

/**
 * Creates a message, if by given credentials not a single user has been found
 * @returns Message object
 */
function getUserNotFoundMessage() {
    return {
        message: "Wrong username or password!",
        value: false
    };
}

/**
 * Creates a message, in case of successful login
 * @param result
 * @returns Message object
 */
function getLoginMessage(result) {
    return {
        message: "Welcome " + result.username,
        value: true,
        userId: result._id,
        userType: result.user_type,
        companyId: result.company._id,
        company_name: result.company.company_name
    };
}

// TODO
//  Find out how to handle sessions within ExpressJS,
//  not sure if this code works properly
/**
 * SUPPOSED to create session, but I am not sure
 * @param result
 * @param request
 */
function createSession(result, request) {
    sess = request.session;
    sess.userId = result._id;
    sess.cmpanyId = result.company._id;
}
