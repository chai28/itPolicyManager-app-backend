const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');
const questionController = require('./controllers/questionController');
const companyController = require('./controllers/companyController');
const userController = require('./controllers/userController');
const policyController = require('./controllers/policyController');
const subscribedPolicyController = require('./controllers/subscribedPolicyController');
const surveyResultController = require('./controllers/surveyResultController');
const logoutController = require('./controllers/logoutController');
const createPaymentController = require('./controllers/createPaymentController');
const editProfileController = require('./controllers/editProfileController');
const reviewPolicyController = require('./controllers/reviewController');
const clientReviewPolicyController = require('./controllers/clientReviewerController');

//Login
router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);

//company controller
router.get('/company', companyController.companyGet);
router.post('/company', companyController.companyPost);
router.post('/register', companyController.registerPost);

//company controller
router.get('/user', userController.userGet);
router.post('/user', userController.userPost);

//policy 
router.get('/policies', policyController.policiesGet);
router.post('/policies', policyController.policiesPost);

//get questions
router.get('/questions', questionController.questionsGet);
router.post('/questions', questionController.questionsPost);

//payment
router.get('/create_paymentintent', createPaymentController.createPaymentGet);
router.post('/create_paymentintent', createPaymentController.createPaymentPost);

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

//Client review subscribed policy
router.get('/clientReviewer', clientReviewPolicyController.clientReviewerGet);
router.post('/clientReviewer', clientReviewPolicyController.clientReviewerPost);

//logout
router.get('/logout', logoutController.logout);

module.exports = router;