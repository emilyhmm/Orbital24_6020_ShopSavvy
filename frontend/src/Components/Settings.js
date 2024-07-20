import { useContext } from 'react';
import { QuizContext } from '../Contexts/QuizContext';

function Settings() {
    const { quizResults } = useContext(QuizContext);
    
    return(
        <div>hi</div>
    )
}

export default Settings