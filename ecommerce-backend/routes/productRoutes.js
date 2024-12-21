const express = require('express');
const jwt = require('jsonwebtoken');
const Product = require('../models/Product');
const User = require('../models/User');
const router = express.Router();

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Add a new product (protected)
router.post('/add', protect, async (req, res) => {
    const { name, description, price, stock, imageUrl, category } = req.body;

    try {
        const newProduct = new Product({ name, description, price, stock, imageUrl, category });
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// Get a single product by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;
