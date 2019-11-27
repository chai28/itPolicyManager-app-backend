const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');
const registerController = require('./controllers/registerController');

//Login
router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);


//Register
router.get('/register', registerController.registerGet);
router.post('/register', registerController.registerPost);

module.exports = router;