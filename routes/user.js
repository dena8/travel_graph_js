const router = require('express').Router();
const userController = require('../controller/user');
const asyncHandler = require('express-async-handler');
const {isAuth,hasRole} = require('../middleware/index');


router.get('/get/current',[hasRole('USER_ROLE')],asyncHandler(userController.get.currentUser));
router.get('/authorities',[hasRole('ADMIN_ROLE'||'USER_ROLE')],asyncHandler(userController.get.authorities));
router.get('/find',asyncHandler(userController.get.checkIfUserExist));

router.post('/register',[isAuth('false')],asyncHandler(userController.post.register));
router.post('/login',[isAuth('false')],asyncHandler(userController.post.login));

router.put('/update/authority',hasRole('ADMIN_ROLE'),asyncHandler(userController.update.updateAuthority));

module.exports=router;

