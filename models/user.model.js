const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Company = require("../models/company.model.js");

//user collection
var userSchema = new Schema({
    user_type: {
        type: String,
        enum: ['comp_initiator', 'confirmation', 'adoption', 'trainee']
    },
    roleStatus: {
        type: String,
        enum: ['accept', 'disput', 'undone', 'compliant']
    },
    fname: String,
    lname: String,
    email: String,
    address: String,
    contact: String,
    position: String,
    username: String,
    password: String,
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    }
});

module.exports = mongoose.model("User", userSchema);