const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//company collection
const questionsSchema = new Schema({
    question_content: String,
    option1: String,
    option2: String,
    option3: String,
    option4: String,
    option5: String,
    option6: String,
    option7: String,
    option8: String,
    match: [{
      answer: String,
      match_policy: {
        type: Schema.Types.ObjectId,
        ref: 'Policy'
      }
    }],
  });

  module.exports = mongoose.model("Questions", questionsSchema);