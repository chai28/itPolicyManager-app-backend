const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const questionsSchema = new Schema({
    question_content: String,
    option: [{
      name:String,
      policy:{
        type:Schema.Types.ObjectId,
        ref:"Policy"
      }
    }],
  });

  module.exports = mongoose.model("Questions", questionsSchema);