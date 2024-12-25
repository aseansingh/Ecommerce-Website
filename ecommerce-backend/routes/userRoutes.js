const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { getUsers, createUser } = require('../controllers/userController');

const router = express.Router();

// Existing routes
router.get('/', getUsers);
router.post('/', createUser);

// Login route with existing logic
router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;

    console.log('Login attempt - Email:', email);
    console.log('Request body:', req.body);

    try {
        // Check if email and password are provided
        if (!email || !password) {
            console.log('Missing credentials - Email or password not provided');
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user with detailed logging
        const user = await User.findOne({ email });
        console.log('User found:', user ? 'Yes' : 'No');

        if (!user) {
            console.log('Login failed: User not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Log user data (except password)
        console.log('User data:', {
            id: user._id,
            email: user.email,
            hasPassword: !!user.password
        });

        // Check if password exists in user document
        if (!user.password) {
            console.log('Login failed: User has no password hash stored');
            return res.status(500).json({ message: 'Account setup incomplete' });
        }

        // Compare passwords with logging
        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match result:', isMatch);

        if (!isMatch) {
            console.log('Login failed: Password mismatch');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check JWT_SECRET
        if (!process.env.JWT_SECRET) {
            console.log('Login failed: JWT_SECRET not configured');
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin || false },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Login successful for user:', email);

        return res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
            token
        });

    } catch (error) {
        console.error('Login error:', error);
        // Use next(error) to pass error to error handling middleware
        next(error);
    }
});

module.exports = router;