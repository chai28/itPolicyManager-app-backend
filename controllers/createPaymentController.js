const mongoose = require('mongoose');
const Company = require("../models/company.model.js");
const User = mongoose.model('User');
const stripe = require('stripe')('sk_test_b4RazEy7RKCGfsUZsUXO6Ttl000FGxW42E');

exports.createPaymentGet = (req, res) => {

    res.send({
        message: "Get is working"
    });

};

exports.createPaymentPost = async (req, res) => {
    let paymentInfo = req.body;
    try{
       paymentIntent = await stripe.paymentIntents.create({
        amount: paymentInfo.amount,
        currency: 'nzd',
        setup_future_usage: 'off_session',
        //save the card
        payment_method: paymentInfo.paymentMethod,
        customer:user.id
      });
      const paymentMethod = await stripe.paymentMethods.attach(
        intent.payment_method,
        {
          customer: user.id,
          type:"card",
          car_number:paymentInfo.carNumber
        }
      );
      res.send({
        succeeded: true,
        clientSecret: paymentIntent.client_secret,
        publicKey: 'pk_test_6KfHVFBMFj3g5bsKv6qIiXbV00zomUO8sV'
      });

    }catch(err){
        if (err.code === "authentication_required") {
            res.send({
              error: "authentication_required",
              clientSecret: err.raw.payment_intent.client_secret,
              amount: paymentInfo.amount,
              card: {
                brand: err.raw.payment_method.card.brand,
                last4: err.raw.payment_method.card.last4
              }
            });
          }else if(err.code) {
            res.send({
              error: err.code,
              clientSecret: err.raw.payment_intent.client_secret,
            });
          } else {
            console.log("Unknown error occurred", err);
          }
        }
}