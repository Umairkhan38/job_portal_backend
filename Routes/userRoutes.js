const express= require('express')
const router = express.Router();
const {allUsers, singleUser,editUser, deleteUser,createUserJobHistory, updateStatus} = require('../Controllers/userController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');



// Users Route 
router.get('/allusers', isAuthenticated, isAdmin, allUsers);

// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser);


router.put('/user/edit/:id', isAuthenticated, editUser);


router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser);

//api/user/jobhistory
router.post('/user/jobhistory',isAuthenticated,createUserJobHistory)

//api/user/userStatus
router.patch('/user/userStatus',updateStatus);

//apui/user/edit/:id
router.patch('/user/edit/:id',isAuthenticated, editUser);



module.exports = router;

