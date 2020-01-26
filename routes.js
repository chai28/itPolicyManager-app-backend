const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const questionController = require('./controllers/questionController');
const companyController = require('./controllers/companyController');
const policyController = require('./controllers/policyController');
const subscribedPolicyController = require('./controllers/subscribedPolicyController');
const surveyResultController = require('./controllers/surveyResultController');
const logoutController = require('./controllers/logoutController');
const addKeyContactController = require('./controllers/addKeyContactController');
const createPaymentController = require('./controllers/createPaymentController');
const editProfileController = require('./controllers/editProfileController');
const keyContactController = require('./controllers/keyContactController');
const pdfGenerationController = require('./controllers/pdfGenerationController.js');
const reviewPolicyController = require('./controllers/reviewController');

//Login
router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);


//Register
router.get('/register', registerController.registerGet);
router.post('/register', registerController.registerPost);

//policy 
router.get('/policies', policyController.policiesGet);
router.post('/policies', policyController.policiesPost);

//get questions
router.get('/questions', questionController.questionsGet);
router.post('/questions', questionController.questionsPost);

//add key contact
router.get('/addKeyContact', addKeyContactController.addKeyContactGet);
router.post('/addKeyContact', addKeyContactController.addKeyContactPost);

//Key contact
router.get('/keyContact', keyContactController.keyContactGet);
router.post('/keyContact', keyContactController.keyContactPost);

//payment
router.get('/create_paymentintent', createPaymentController.createPaymentGet);
router.post('/create_paymentintent', createPaymentController.createPaymentPost);

//match policy 
router.get('/company', companyController.companyGet);
router.post('/company', companyController.companyPost);

//edit profile
router.get('/editprofile', editProfileController.editProfileGet);
router.post('/editprofile', editProfileController.editProfilePost);

//match policy or survey result
router.get('/surveyResult', surveyResultController.surveyResultGet);
router.post('/surveyResult', surveyResultController.surveyResultPost);

//subscribed policy
router.get('/subscribedPolicy', subscribedPolicyController.subscribedPolicyGet);
router.post('/subscribedPolicy', subscribedPolicyController.subscribedPolicyPost);

//review subscribed policy
router.get('/reviewPolicy', reviewPolicyController.reviewPolicyGet);
router.post('/reviewPolicy', reviewPolicyController.reviewPolicyPost);

//logout
router.get('/logout', logoutController.logout);

//pdf generation
router.get('/pdfGeneration',pdfGenerationController.pdfGenerationGet);

module.exports = router;