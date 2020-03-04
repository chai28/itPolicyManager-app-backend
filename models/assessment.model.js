const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const assessmentSchema = new Schema({
    assessment_content: String,
    options: [{
      name:String,
      policy:{
        type:Schema.Types.ObjectId,
        ref:"Policy"
      }
    }],
  });

  module.exports = mongoose.model("Assessment", assessmentSchema);