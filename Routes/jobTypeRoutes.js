const express = require('express');
const router = express.Router();
const {createJobType, allJobType, updateJobType, deleteJobType} = require('../Controllers/jobTypeController');
const { createUserJobHistory } = require('../Controllers/userController');
const {isAuthenticated, isAdmin} = require('../middleware/auth')


// api/type/create
router.post('/type/create',isAuthenticated, isAdmin, createJobType);

//api/type/jobs
router.get('/type/jobs',allJobType);

// api/type/update/type_id
router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateJobType);

//api/type/delete/type_id
router.delete('/type/delete/:type_id',isAuthenticated,isAdmin,deleteJobType);



module.exports = router;
