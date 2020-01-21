const stripe = require("stripe")("sk_test_b4RazEy7RKCGfsUZsUXO6Ttl000FGxW42E");
const uuid = require("uuid/v4");
var moment = require('moment');
require("../models/company.model.js");
const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const policy = mongoose.model('Policy');

exports.createPaymentGet = (req, res) => {
  res.send({
    message: "Get is working Add your Stripe Secret Key to the .require('stripe') statement!"
  });
};

exports.createPaymentPost = async (req, res) => {
  console.log("createPaymentPost");
  console.log("Request:", req.body);
  let error;
  let status;
  async function getPolicy(policyId){
    let goalPolicy = await policy.findById(policyId);
    return goalPolicy;
  }

  async function ggg(policies) {
    return Promise.all(policies.map(async (policy) => {
      return await getPolicy(policy)
    }));
  }


  try {
    const product = req.body.product;
    const token = req.body.token;
    console.log("token email: " + token.email);
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });
    console.log("product.price" + product.amount);
    const idempotency_key = uuid();
    const charge = await stripe.charges.create({
      amount: product.amount * 100,
      currency: "NZD",
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchased the ${product.name}`,
    }, {
      idempotency_key
    });
    console.log("Charge:", {
      charge
    });

    // save subscribtion policy
    
    const subscibed_policies =  await ggg(product.policies)
    console.log('kkkkkjkljljllk', subscibed_policies)

    subscibed_policies.forEach(policy => {
      let subscribedPolicy = {
        name: policy.policy_name,
        status: "confirmation",
        accesslink: "",
        date_subscribed: moment(),
        date_expired: moment().add(12, 'M'),
        content: policy.content
      }

      console.log("subscribedPolicy name: "+subscribedPolicy.name)
      Company.findOne({company_name:product.name}, function (error, company) {
        console.log("company: "+company);
       company.subscribed_policy.push(subscribedPolicy);
        company.save();
        //remove match policy
      }) 
      status = "success";
    })
  
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({
    error,
    status
  });
};