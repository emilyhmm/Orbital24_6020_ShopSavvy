import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Box } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { UserContext } from "../Contexts/AuthContext";
import { QuizContext } from '../Contexts/QuizContext';

const factorList = [
    { id: 'prices', text: 'Low prices' },
    { id: 'sales', text: 'High sales volume' },
    { id: 'ratings', text: 'Positive customer ratings' },
  ];

function Quiz() {
    const { firstName } = useContext(UserContext);
    const navigate = useNavigate();
    const [factors, setFactors] = useState(factorList);
    const { setQuizResults } = useContext(QuizContext);

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(factors);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setFactors(items);
      };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setQuizResults(factors)
        navigate('/')
        console.log('User Preferences:', factors);
    };
    console.log(factors)
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <h1>Hello, {firstName}!</h1>
            <p>Unlock a personalized shopping adventure with ShopSavvy! Help us tailor your experience by sharing your preferences!</p>
            <p>Please rate the importance of the following factors: </p>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="factors">
                    {(provided) => (
                        <List 
                            {...provided.droppableProps} 
                            ref={provided.innerRef}
                            sx={{ background: 'lightgrey', padding: '10px', borderRadius: '4px' }}
                        >
                            {factors.map((factor, index) => (
                                <Draggable key={factor.id} draggableId={factor.id} index={index}>
                                    {(provided) => {
                                            console.log('Draggable factor.id:', factor.id);
                                            return (
                                                <ListItem
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    sx={{
                                                        flex: 1,
                                                        margin: '0 8px',
                                                        minWidth: 150,
                                                        backgroundColor: '#fff',
                                                        borderRadius: '4px',
                                                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
                                                        padding: 2,
                                                        textAlign: 'center',
                                                    }}
                                                >
                                                    <ListItemText primary={factor.text} />
                                                </ListItem>
                                            );
                                        }}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </List>
                    )}
                </Droppable>
            </DragDropContext>

            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
        </Box>

    );
}

export default Quiz;