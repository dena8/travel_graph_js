const router = require('express').Router();
const categoryController = require('../controller/category');
const asyncHandler = require('express-async-handler');
const {hasRole} = require('../middleware/index');

router.get('/all',hasRole('GUIDE_ROLE'),asyncHandler(categoryController.get.allCategories));

router.post('/create',hasRole('GUIDE_ROLE'),asyncHandler(categoryController.post.createCategory));


module.exports = router;