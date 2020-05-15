const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const assessmentResultSchema=new Schema({
    assessment_taken_date:Date,
    score:Number,
    status:Boolean,
    reviewer_id:Schema.Types.ObjectId
})

module.exports = mongoose.model("AssessmentResult", assessmentResultSchema);
