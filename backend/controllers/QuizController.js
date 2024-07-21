const Quiz = require('../models/quizModel');

const viewQuiz = async (req, res) => {
    const userId = req.user.user._id;

    try {
        const quizResult = await Quiz.findOne({ userId });

        if (quizResult) {
            res.status(200).send(quizResult.results);
        } else {
            res.status(404).send({ message: 'No quiz results found' });
        }
    } catch (error) {
        console.error('Error fetching quiz results:', error);
        res.status(500).send({ message: 'Server error' });
    }
}

const saveQuiz = async (req, res) => {
    const userId = req.user.user._id;
    const { results } = req.body;

    try {
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