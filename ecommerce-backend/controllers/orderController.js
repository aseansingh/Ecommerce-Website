const Order = require('../models/Order');
const Cart = require('../models/Cart');

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private
exports.createOrder = async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No items in the order' });
        }

        const order = await Order.create({
            user: req.user.id,
            items,
            totalPrice
        });

        // Clear the user's cart after order placement
        await Cart.findOneAndDelete({ user: req.user.id });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Get all orders of a user
// @route   GET /api/orders
// @access  Private
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort('-createdAt');
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// @desc    Update order status (admin only)
// @route   PUT /api/orders/:id
// @access  Private/Admin
exports.updateOrderStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.status = status;
        await order.save();

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
