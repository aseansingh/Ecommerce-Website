const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

router.post('/add', async (req, res) => {
    const { name, description, price, stock, imageUrl, category } = req.body;

    try {
        const newProduct = new Product({ name, description, price, stock, imageUrl, category });
        await newProduct.save();

        res.status(201).json({ message: 'Product added successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

module.exports = router;