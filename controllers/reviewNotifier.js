// see usage: https://www.npmjs.com/package/dotenv
require('dotenv').config();

const mongoConnectionString = process.env.DB_URL;
const Agenda = require('agenda');
const agenda = new Agenda({ db: { address: mongoConnectionString } });
const nodemailer = require('nodemailer');

const mail = require("./helpers/mail"); //mail.send


agenda.define('send email', (job, done) => {

  // Initialize
  let email_client = "robbinhood999@gmail.com";
  let templateToRender = "email-sample";
  let firstName = "Melvin";
  let policyId= "02"
  let policyName = "Information Technology";
  let localURL = "generalLink";


  // send the mail - see also helpers/mail.js
  mail.send({
    to: email_client, // receiver
    filename: templateToRender, // see template @ email-templates/email-sample.pug
    subject: 'Expiration Date', // custom_subject
    firstName,
    policyId, // custom variables 
    policyName,
    localURL
  });

  console.log("Message sent to: " + email_client);
  done();
});

(async function() {
	await agenda.start();

	await agenda.every('7 days', 'send email');
})();
