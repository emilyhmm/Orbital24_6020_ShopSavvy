const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    results: {
        type: Array,
        required: true,
    },
});
const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;