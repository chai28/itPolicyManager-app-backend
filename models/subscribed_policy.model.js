const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//subscribed policy collection
var subscribed_policySchema = new Schema({
    // policy: {
    //    type: Schema.Types.ObjectId,
    //    ref: 'policy'
    // },
    managementStage: {
        type: String,
        enum: ['confirmation', ' adoption', 'awareness', 'reporting']
    },
    accesslink: String,
    date_subscribed: Date,
    date_expired: Date,
    content: {
        content1: String,
        content2: String,
        content3: String,
        content4: String,
        content5: String,
        content6: String,
        content7: String,
        content8: String,
        content9: String,
        content10: String,
        content11: String,
        content12: String
    }

});
module.exports = mongoose.model("SubscribedPolicy", subscribed_policySchema);