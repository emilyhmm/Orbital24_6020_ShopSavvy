import { createContext, useState } from 'react';
import axios from 'axios';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizResults, setQuizResults] = useState([]);
    console.log(quizResults)

    const saveQuiz = async(factors) => {
        const token = localStorage.getItem('token')
        try {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/quiz/save`, {
                results: factors, }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log('Quiz results saved successfully');
            console.log(quizResults);
        } catch (error) {
            console.error('Error saving quiz results:', error);
        }  
    }
    return (
        <QuizContext.Provider value={{ quizResults, setQuizResults, saveQuiz }}>
            {children}
        </QuizContext.Provider>
    );
};