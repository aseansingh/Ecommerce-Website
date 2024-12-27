const express = require('express');
const {
    createOrder,
    getUserOrders,
    updateOrderStatus
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .post(protect, createOrder)
    .get(protect, getUserOrders);

router.route('/:id')
    .put(protect, admin, updateOrderStatus);

module.exports = router;
