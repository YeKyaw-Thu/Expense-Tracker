const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true,
        enum: ['Meals', 'Snacks', 'Healthcare', 'Bills', 'Transportation', 'Accessories', 'Donation', 'Other']
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',   
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
