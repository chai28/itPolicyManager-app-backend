const mongoose = require('mongoose');
//require("../models/assessment.model.js");
// const Assessment = mongoose.model('Assessment');
const Policies = require("../models/policy.model.js");

exports.assessmentGet = (req, res) => {
    // Assessment.find(function (err, assessment) {
    //     if (err) {
    //         console.log("Error: " + err);
    //     } else {
    //         res.json(assessment);
    //     }
    // });
};

exports.assessmentDelete = (req,res) => {
    console.log(req.body._id);
    Questions.findByIdAndRemove({_id:req.body._id},
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

function addAssessment(assessment,id){
    Policies.findByIdAndUpdate(id,
        {assessments:assessment}
        ),
    function(error){
        if(error){
            res.json({
                status:"Not Successful!"
            })
        }
    }
    
}

exports.updateAssessment = (req, res) => {
    let id = req.body.policy_id;
    let new_assessment = req.body.assessmentInputs;
    console.log(id);
    console.log(new_assessment);
    new_assessment.map(assessment=>{
        if(assessment._id===null){
            console.log(id);
            addAssessment(assessment,id);
        }        
    });
    
        console.log(id)
        Policies.findByIdAndUpdate(
            {"_id":id},
            {"assessments":new_assessment}
            ,function(error){
            if(error){res.json({status:"Not successful!"});}
        });
    
    // const policy = Policies.findOneAndUpdate(
    //     { "_id": _id }, // find id 
    //     { "assessments": new_assessment},
    //     function (err, managerparent) {
    //         if (err) throw err;
    //         console.log(managerparent);
    //     }
    // );

    res.json({
        message:"Added successfully!",
        status:"success"
    })
}



    // let assessmentDetails = req.body;

    // // console.log(assesmentDetails);

    // assessmentDetails.map((assessment) => {

    //     let assessment_id = assessmentDetails._id;
    //     let assessment_content = assessment.assessment_content;

    //     if (assessment_id){
    //         Assessment.findById(assessment_id, function (err, dataAssessment) {
    //             dataAssessment.assessment_content = assessment_content;
    //             for (var i = 0; i < dataAssessment.options.length; i++) {
    //                 dataAssessment.options[i].name = assessment.options[i].name;
    //                 dataAssessment.options[i].policy = assessment.options[i].policy;
    //             }
    //             dataAssessment.save();
    //         });
    //     } else{     

    //         Assessment.create({ 
    //             assessment_content : assessment.assessment_content,
    //             options: assessment.options
        
    //         }, function (err, small) {
    //             if (err) return handleError(err);
    //             // saved!
    //             //console.log("YAY!");
    //             });
    //     }
        
    // })


    // res.send({
    //     result: "success",
    //     // message: " Post is working",
    //     message: "Post is working",
    //     assessmentInputs: req.body.assessmentInputs
    // });
//};