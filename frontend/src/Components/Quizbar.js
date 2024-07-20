import { useContext } from 'react';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import { QuizContext } from '../Contexts/QuizContext';

function Quizbar() {
    const { quizResults } = useContext(QuizContext);
    console.log(quizResults)

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