const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// Log when routes are loaded
console.log('Loading user routes...');

// Test route
router.get('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'User routes are working' });
});

// User routes
router.get('/', getUsers);
router.post('/register', createUser);

// Enhanced login route with additional security and error handling
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find the user and include the password explicitly
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT with additional claims
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Update last login timestamp if applicable
        if (user.lastLogin) {
            await User.findByIdAndUpdate(user._id, { lastLogin: Date.now() });
        }

        // Send response with token and user details
        res.json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error in login route:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Log all routes when router is created
console.log('User routes registered:');
router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(`${Object.keys(r.route.methods)} ${r.route.path}`);
    }
});

module.exports = router;
