const mongoose = require('mongoose');
const Questions = require("../models/question.model.js");


exports.questionsGet = (req, res) => {
    Questions.find(function(err, questions) {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.json(questions);
        }
    });
};

exports.questionsPost = (req, res) => {
    res.send({
        message: "Register Post is working"
    });
};
