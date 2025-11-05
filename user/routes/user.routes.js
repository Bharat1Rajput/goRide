const express = require('express');
const { model } = require('mongoose');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const authMiddleware = require('../middlewares/authMiddleware');


router.post('/register',userController.registerUser);
router.post('/login',userController.loginUser);
router.post('/logout',userController.logout);
router.get('/profile',authMiddleware.userAuth,userController.getUserProfile);

module.exports = router;