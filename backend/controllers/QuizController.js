const Quiz = require('../models/quizModel');
const User = require("../models/userModel");

const viewQuiz = async (req, res) => {
    const email = req.user.user.email
    const userId = req.user.user._id;

    try {
        const user = await User.findOne({ email });
        const quizResult = await Quiz.findOne({ userId });

        if (quizResult) {
            await User.findByIdAndUpdate(userId, { hasCompletedQuiz: true });
            res.status(200).send({ results: quizResult.results, completedQuiz: user.completedQuiz });
        } else {
            res.status(404).send({ message: 'No quiz results found' });
        }
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).send({ message: 'Server error' });
    }
}

const saveQuiz = async (req, res) => {
    const email = req.user.user.email
    const userId = req.user.user._id;
    const { results } = req.body;

    try {
        // Set quiz to completed in db
        let user = await User.findOne({ email });
        user.completedQuiz = true;
        await user.save()

        let quizResult = await Quiz.findOne({ userId });
        if (quizResult) {
            quizResult.results = results;
            await quizResult.save();
        } else {
            quizResult = new Quiz({ userId, results });
            await quizResult.save();
        }

        res.status(200).send({ message: 'Quiz results saved successfully' });
    } catch (error) {
        console.error('Error saving quiz results:', error);
        res.status(500).send({ message: 'Server error' });
    }
}

module.exports = { viewQuiz, saveQuiz };