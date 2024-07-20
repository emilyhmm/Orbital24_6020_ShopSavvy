import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
    const [quizResults, setQuizResults] = useState([]);
    return (
        <QuizContext.Provider value={{ quizResults, setQuizResults }}>
            {children}
        </QuizContext.Provider>
    );
};