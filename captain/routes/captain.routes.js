const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const captainController = require('../controllers/captain.controllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register',captainController.registerCaptain);
router.post('/login',captainController.loginCaptain);
router.post('/logout',captainController.logout);
router.get('/profile',authMiddleware.userAuth,captainController.getCaptainProfile);

module.exports = router;