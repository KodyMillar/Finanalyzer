const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    initialInvestment: {
        type: Number,
        required: true
    },
    annualContribution: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    risk: {
        type: String,
        enum: process.env.INVESTMENT_ENUM.split(','),
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    interestPercentage: {
        type: String,
        required: true
    },
    totalReturn: {
        type: Number,
        required: false
    },
    dateCreated: {
        type: Number,
        Default: Date.now(),
        required: false
    }
}, {
    bufferTimeoutMS: 4000,
    autoCreate: false
});

const Investment = mongoose.model('Investment', investmentSchema, 'investments');

module.exports = Investment;