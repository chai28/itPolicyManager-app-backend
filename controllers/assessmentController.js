const mongoose = require('mongoose');
require("../models/assessment.model.js");
const Assessment = mongoose.model('Assessment');

exports.assessmentGet = (req, res) => {
    Assessment.find(function (err, assessment) {
        if (err) {
            console.log("Error: " + err);
        } else {
            res.json(assessment);
        }
    });
};

exports.assessmentPost = (req, res) => {

    let assessmentDetails = req.body.assessmentInputs;

    // console.log(assesmentDetails);

    assessmentDetails.map((assessment) => {

        let assessment_id = assessment._id;
        let assessment_content = assessment.assessment_content;

        if (assessment_id){
            Assessment.findById(assessment_id, function (err, dataAssessment) {
                dataAssessment.assessment_content = assessment_content;
                for (var i = 0; i < dataAssessment.options.length; i++) {
                    dataAssessment.options[i].name = assessment.options[i].name;
                    dataAssessment.options[i].policy = assessment.options[i].policy;
                }
                dataAssessment.save();
            });
        } else{     

            Assessment.create({ 
                assessment_content : assessment.assessment_content,
                options: assessment.options
        
            }, function (err, small) {
                if (err) return handleError(err);
                // saved!
                //console.log("YAY!");
                });
        }
        
    })


    res.send({
        result: "success",
        // message: " Post is working",
        message: "Post is working",
        assessmentInputs: req.body.assessmentInputs
    });
};