const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name is required'],
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price must be positive'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
    },
    stock: {
        type: Number,
        required: [true, 'Stock is required'],
        default: 0,
    },
    images: [
        {
            type: String, // URLs to image files
        },
    ],
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
