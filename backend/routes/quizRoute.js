const express = require("express");
const { viewQuiz, saveQuiz } = require("../controllers/QuizController");

const router = express.Router();
const isAuthenticated = require("../middleware/authMiddleware");

router.get('/view', isAuthenticated, viewQuiz);
router.post('/save', isAuthenticated, saveQuiz);

module.exports = router;