const express = require("express");
const router = express.Router();

// define controllers here
const loginController = require('./controllers/loginController');

router.get('/signin', loginController.signInGet);
router.post('/signin', loginController.signInPost);

module.exports = router;