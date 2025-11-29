const mongoose = require('mongoose');

// schema for goal
const goalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    target: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('SavingsGoal', goalSchema);
