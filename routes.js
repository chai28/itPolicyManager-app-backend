const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const questionController = require('./controllers/questionController');
const addKeyContactController=require('./controllers/addKeyContactController');
const createPaymentController=require('./controllers/createPaymentController');
const companyController=require('./controllers/companyController');
const policyController=require('./controllers/policyController');
const subscribedPolicyController=require('./controllers/subscribedPolicyController');
const surveyResultController=require('./controllers/surveyResultController');
const logoutController=require('./controllers/logoutController');
//Login
router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);


//Register
router.get('/register', registerController.registerGet);
router.post('/register', registerController.registerPost);

//policy 
router.get('/policies',policyController.policiesGet);
router.post('/policies',policyController.policiesPost);

//get questions
router.get('/questions', questionController.questionsGet);
router.post('/questions', questionController.questionsPost);

//add key contact
router.get('/addKeyContact', addKeyContactController.addKeyContactGet);
router.post('/addKeyContact', addKeyContactController.addKeyContactPost);

//payment
router.get('/create_paymentintent',createPaymentController.createPaymentGet);
router.post('/create_paymentintent',createPaymentController.createPaymentPost);

//match policy 
router.get('/company',companyController.companyGet);
router.post('/company',companyController.companyPost);

//match policy or survey result
router.get('/surveyResult',surveyResultController.surveyResultGet);
router.post('/surveyResult',surveyResultController.surveyResultPost);

//subscribed policy
router.get('/subscribedPolicy',subscribedPolicyController.subscribedPolicyGet);
router.post('/subscribedPolicy',subscribedPolicyController.subscribedPolicyPost);

//logout
router.get('/logout',logoutController.logout);

module.exports = router;