const mongoose=require("mongoose");
require("../models/assessmentResult.model.js");
const AssessmentResult=mongoose.model("AssessmentResult");

//Save the score from assessment result
exports.PostResult=(req,res)=>{
   var data=req.body;
   var result=new AssessmentResult({
        score:data.score,
        assessment_taken_date:Date.now(),
        status:true.query,
        reviewer_id:data.reviewerId,

   })
   result.save(function(err,res){
       if(!err){
           console.log(res)
       }
       else{
           console.log(err)
       }
   });
};