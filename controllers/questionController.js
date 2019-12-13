const mongoose = require('mongoose');
require("../models/question.model.js");
const Questions = mongoose.model('Questions');

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
    
     req.body.questionInputs.map((question) => {
         Questions.findById(question._id, function(err,goalQuestion) {
             goalQuestion.question_content=question.question_content;
            for(var i =0; i<goalQuestion.options.length; i++){
                goalQuestion.options[i].name = question.options[i].name;
                goalQuestion.options[i].policy=question.options[i].policy;
            }
            goalQuestion.save()
        });
    })

    
    res.send({
        message: "Register Post is working"
    });
};
