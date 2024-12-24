const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Add validation message
    },
    email: {
        type: String,
        required: [true, 'Email is required'], // Add validation message
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email'], // Email format validation
    },
    password: {
        type: String,
        required: [true, 'Password is required'], // Add validation message
        minlength: [6, 'Password must be at least 6 characters'], // Add minimum length
    },
    role: {
        type: String,
        enum: ['customer', 'admin'], // Role can only be 'customer' or 'admin'
        default: 'customer', // Default role
    },
}, { timestamps: true });

// Hash the password before saving
userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (error) {
        next(error); // Pass any error to the next middleware
    }
});

// Match the entered password with the hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); // Compare passwords
};

// Create and export the User model
const User = mongoose.model('User', userSchema);
module.exports = User;
