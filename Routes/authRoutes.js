const express= require('express')
const router = express.Router();
const {signIn,signUp, logout, userProfile} = require('../Controllers/authController');
const { isAuthenticated } = require('../middleware/auth');


//auth routes
router.post('/signin',signIn);

router.post('/signup',signUp);

router.get('/logout',logout)

router.get('/me',isAuthenticated,userProfile);


module.exports = router;


