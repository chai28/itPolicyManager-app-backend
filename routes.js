const express = require("express");
const router = express.Router();

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
const assessmentResultController=require("./controllers/assessmentResultController");

//Login
router.get("/signin", loginController.signInGet);
router.post("/signin", loginController.signInPost);

//company controller
router.get("/company", companyController.companyGet);
router.post("/company", companyController.companyPost);
router.post("/register", companyController.registerPost);


//company controller
router.get("/user", userController.userGet);
router.post("/user", userController.userPost);
router.post("/addUser", userController.addAccountablePerson);

//policy
router.get("/policies", policyController.policiesGet);

router.post("/policies", policyController.policiesPost);
//router.get("/getSuggestedPolicy", companyController.getSuggestedPolicy);


router.put("/edit-policy", policyController.updatePolicy);

//get questions
router.get("/questions", questionController.questionsGet);
router.post("/questions", questionController.questionsPost);
router.post("/deleteQuestions",questionController.questionsDelete);

//get assessment
router.get("/assessment", policyController.getAssessment);
router.put("/assessment", assessmentController.updateAssessment);
router.post("/deleteassessment",assessmentController.assessmentDelete);
//payment
router.get("/create_paymentintent", createPaymentController.createPaymentGet);
router.post("/create_paymentintent", createPaymentController.createPaymentPost);

//edit profile
router.get("/editprofile/:id", editProfileController.editProfileGet);
router.get("/edituserprofile/:id", editProfileController.editUserProfileGet);
router.post("/editprofile", editProfileController.editProfilePost);
router.post("/deleteprofile",editProfileController.editProfilePut);

//match policy or survey result
router.get("/surveyResult", surveyResultController.surveyResultGet);
router.post("/surveyResult", surveyResultController.surveyResultPost);

//subscribed policy
router.get("/subscribedPolicy", subscribedPolicyController.subscribedPolicyGet);
router.get("/getSubscribedPolicy", subscribedPolicyController.getSubscribedPolicy);
router.post("/subscribedPolicy",subscribedPolicyController.subscribedPolicyPost);
router.post("/addSubscribedPolicy/",subscribedPolicyController.subscribedPolicySave);
router.post("/updateSubscribedPolicy",subscribedPolicyController.subscribedPolicyUpdate);
router.post("/sendAssessmentToReviewers",subscribedPolicyController.sendAssessmentToReviewers);

//review subscribed policy

router.get("/getAllPolicies/", policyController.getAllPolicies);
router.get("/getOnePolicy/:id", policyController.getOnePolicy);
router.get("/reviewPolicy", reviewPolicyController.reviewPolicyGet);
router.post("/reviewPolicy", reviewPolicyController.reviewPolicyPost);

//Client review subscribed policy
router.get("/clientReviewer", clientReviewPolicyController.clientReviewerGet);
router.post("/clientReviewer", clientReviewPolicyController.clientReviewerPost);

//Assessment Result
router.post("/assessmentResult",assessmentResultController.PostResult);
module.exports = router;
