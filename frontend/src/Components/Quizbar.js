import { useEffect, useContext } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { QuizContext } from '../Contexts/QuizContext';
import axios from 'axios';

function Quizbar() {
    const { quizResults, setQuizResults } = useContext(QuizContext);
    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/quiz/view`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setQuizResults(response.data);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            } 
        };
        fetchQuizResults();
    }, [token]);
    
    const handleEdit = async (e) => {
    }
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div>
                <p style={{ margin: 0 }}>Your preferences: </p>
                <List style={{ display: 'flex', flexDirection: 'row', gap: '8px', margin: 0 }}>
                    {quizResults.map((result, index) => (
                        <ListItem key={index} style={{ padding: 0 }}>
                            <ListItemText>{index + 1}. {result.text}</ListItemText>
                        </ListItem>
                    ))}
                </List>
            </div>
            <Button onClick={handleEdit}>Edit preference</Button>
        </div>
    )
}

export default Quizbar;