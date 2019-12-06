const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');
const questionController = require('./controllers/questionController');
const addKeyContactController=require('./controllers/addKeyContactController');

//Login
router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);


//Register
router.get('/register', registerController.registerGet);
router.post('/register', registerController.registerPost);

//get questions
router.get('/questions', questionController.questionsGet);
router.post('/questions', questionController.questionsPost);

//add key contact
router.get('/addKeyContact', addKeyContactController.addKeyContactGet);
router.post('/addKeyContact', addKeyContactController.addKeyContactPost);

module.exports = router;