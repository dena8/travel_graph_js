const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const {hasRole} = require('../middleware/index');
const orderController = require('../controller/order');

router.get('/all',hasRole('ADMIN_ROLE'),asyncHandler(orderController.get.all));
router.get('/:id',hasRole('ADMIN_ROLE'),asyncHandler(orderController.get.orderById));

module.exports=router;