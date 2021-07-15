const router = require('express').Router();
const cartController = require('../controller/cart');
const asyncHandler = require('express-async-handler');
const {hasRole} = require('../middleware/index');
const orderController = require('../controller/order');

router.get('/add/:id',[hasRole('USER_ROLE')],asyncHandler(cartController.post.addTourToCart));
router.get('/contain/:id',asyncHandler(cartController.get.checkIfTourIsAdded));
router.post('/order',hasRole('USER_ROLE'), asyncHandler(cartController.post.createOrder));
router.put('/remove-item',[hasRole('USER_ROLE')],asyncHandler(cartController.put.removeFromCart));


module.exports=router;