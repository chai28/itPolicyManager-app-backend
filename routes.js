const express = require("express");
const router = express.Router();

/**
 * Controller handling global errors
 */
const errorHandlingController = require("./controllers/errorHandlingController");

// define controllers here
const loginController = require("./controllers/loginController");
const questionController = require("./controllers/questionController");
const assessmentController = require("./controllers/assessmentController");
const companyController = require("./controllers/companyController");
const userController = require("./controllers/userController");
const policyController = require("./controllers/policyController");
const subscribedPolicyController = require("./controllers/subscribedPolicyController");
const surveyResultController = require("./controllers/surveyResultController");
const createPaymentController = require("./controllers/createPaymentController");
const editProfileController = require("./controllers/editProfileController");
const reviewPolicyController = require("./controllers/reviewController");
const clientReviewPolicyController = require("./controllers/clientReviewerController");
const assessmentResultController = require("./controllers/assessmentResultController");

//Login
router.route("/signin")
    .post(loginController.signInPost)
    .all(errorHandlingController.MethodNotAllowed);

//company controller
router.route("/company")
    .get(companyController.companyGet)
    .post(companyController.companyPost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/register")
    .post(companyController.registerPost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/deleteCompany")
    .post(companyController.companyDelete)
    .all(errorHandlingController.MethodNotAllowed);

//company controller
router.route("/user")
    .get(userController.userGet)
    .post(userController.userPost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/addUser")
    .post(userController.addAccountablePerson)
    .all(errorHandlingController.MethodNotAllowed);

//policy
router.route("/policies")
    .get(policyController.policiesGet)
    .post(policyController.policiesPost)
    .all(errorHandlingController.MethodNotAllowed);
//router.get("/getSuggestedPolicy", companyController.getSuggestedPolicy);
router.route("/edit-policy")
    .put(policyController.updatePolicy)
    .all(errorHandlingController.MethodNotAllowed);

//get questions
router.route("/questions")
    .get(questionController.questionsGet)
    .post(questionController.questionsPost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/deleteQuestions")
    .post(questionController.questionsDelete)
    .all(errorHandlingController.MethodNotAllowed);

//get assessment
router.route("/assessment")
    .get(policyController.getAssessment)
    .put(assessmentController.updateAssessment)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/deleteassessment")
    .post(assessmentController.assessmentDelete)
    .all(errorHandlingController.MethodNotAllowed);

//payment
router.route("/create_paymentintent")
    .get(createPaymentController.createPaymentGet)
    .post(createPaymentController.createPaymentPost)
    .all(errorHandlingController.MethodNotAllowed);

//edit profile
router.route("/editprofile/:id")
    .get(editProfileController.editProfileGet)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/edituserprofile/:id")
    .get(editProfileController.editUserProfileGet)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/editprofile")
    .post(editProfileController.editProfilePost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/deleteprofile")
    .post(editProfileController.editProfilePut)
    .all(errorHandlingController.MethodNotAllowed);

//match policy or survey result
router.route("/surveyResult")
    .get(surveyResultController.surveyResultGet)
    .post(surveyResultController.surveyResultPost)
    .all(errorHandlingController.MethodNotAllowed);

//subscribed policy
router.route("/subscribedPolicy")
    .get(subscribedPolicyController.subscribedPolicyGet)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/getSubscribedPolicy")
    .get(subscribedPolicyController.getSubscribedPolicy)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/subscribedPolicy")
    .post(subscribedPolicyController.subscribedPolicyPost)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/addSubscribedPolicy")
    .post(subscribedPolicyController.subscribedPolicySave)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/updateSubscribedPolicy")
    .post(subscribedPolicyController.subscribedPolicyUpdate)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/sendAssessmentToReviewers")
    .post(subscribedPolicyController.sendAssessmentToReviewers)
    .all(errorHandlingController.MethodNotAllowed);

//review subscribed policy
router.route("/getAllPolicies/")
    .get(policyController.getAllPolicies)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/getOnePolicy/:id")
    .get(policyController.getOnePolicy)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/reviewPolicy")
    .get(reviewPolicyController.reviewPolicyGet)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/reviewPolicy")
    .post(reviewPolicyController.reviewPolicyPost)
    .all(errorHandlingController.MethodNotAllowed);

//Client review subscribed policy
router.route("/clientReviewer")
    .get(clientReviewPolicyController.clientReviewerGet)
    .all(errorHandlingController.MethodNotAllowed);
router.route("/clientReviewer")
    .post(clientReviewPolicyController.clientReviewerPost)
    .all(errorHandlingController.MethodNotAllowed);

//Assessment Result
router.route("/assessmentResult")
    .post(assessmentResultController.PostResult)
    .all(errorHandlingController.MethodNotAllowed);

module.exports = router;
