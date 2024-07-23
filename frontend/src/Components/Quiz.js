import { useState, useContext, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Box, Typography, Divider } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserContext } from "../Contexts/AuthContext";
import { QuizContext } from '../Contexts/QuizContext';
import axios from 'axios';

const theme = createTheme({
    typography: {
        fontFamily: "Gabarito, sans-serif",
        fontWeight: 400,
        fontStyle: "normal",
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "Gabarito, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                    fontSize: '20px',
                    lineHeight: '1.5',
                    letterSpacing: '0.00938em',
                }
            }
        }
    }
});

const factorList = [
    { id: 'prices', text: 'Low prices' },
    { id: 'sales', text: 'High sales volume' },
    { id: 'ratings', text: 'Positive customer ratings' },
  ];

function Quiz() {
    const { firstName } = useContext(UserContext);
    const navigate = useNavigate();
    const [factors, setFactors] = useState(factorList);
    const { setQuizResults, saveQuiz } = useContext(QuizContext);
    const [completedQuiz, setCompletedQuiz] = useState(false);

    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/quiz/view`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFactors(response.data.results || factorList);
                setCompletedQuiz(response.data.completedQuiz);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchQuizResults();
    }, [token]);

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
        await saveQuiz(factors)
        navigate('/')
        console.log('User Preferences:', factors);
    };
    console.log(factors)
    return (
        /*<Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 2,
            }}
        >
            <h1 className='dm-serif-display-regular'>Hello, {firstName}!</h1>
            <p>kiexini's clubs: Animal lover, visual arts, cat club, hiking one</p>
            {completedQuiz ? (
                <div>Edit your preferences here!</div>
            ):(
                <div>Unlock a personalized shopping adventure with ShopSavvy! Help us tailor your experience by sharing your preferences!</div>        
            )}
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
        </Box> */
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '10px',
                    backgroundColor: '#FFFFE0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    maxWidth: 600,
                    height: '685px',
                    margin: 'auto',
                    textAlign: 'center',
                }}
            >
                <Typography 
                    variant="h4"
                    gutterBottom
                    sx={{ fontFamily: "DM Serif Display, serif", fontSize: '50px' }}
                    className='dm-serif-display-regular'
                >
                    Hello, {firstName}!
                </Typography>
                <Typography 
                    variant="body1"
                    paragraph
                    sx={{ color: '#555', marginBottom: 2 }}
                >
                    {completedQuiz ? "Edit your preferences here!" : 
                    "Unlock a personalized shopping adventure with ShopSavvy. Help us tailor your experience by sharing your preferences!"}
                </Typography>
                <Typography 
                    variant="body2"
                    sx={{ marginBottom: 2, color: '#333' }}
                >
                    Please rate the importance of the following factors:
                </Typography>

                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="factors">
                        {(provided) => (
                            <List 
                                {...provided.droppableProps} 
                                ref={provided.innerRef}
                                sx={{ 
                                    background: '#fff', 
                                    padding: 2, 
                                    borderRadius: '8px', 
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    width: '100%',
                                    maxWidth: 500,
                                    margin: 'auto',
                                    '& .MuiListItem-root': {
                                        borderBottom: '1px solid #e0e0e0',
                                        '&:last-child': {
                                            borderBottom: 'none',
                                        },
                                    },
                                }}
                            >
                                <Typography sx={{ fontSize: '15px', color: '#A9A9A9', marginBottom: '10px'}}>Most important</Typography>
                                {factors.map((factor, index) => (
                                    <Draggable key={factor.id} draggableId={factor.id} index={index}>
                                        {(provided) => (
                                            <ListItem
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                    padding: '16px',
                                                    backgroundColor: '#F7E7A4',
                                                    borderRadius: '4px',
                                                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                                    marginBottom: '8px',
                                                    '&:hover': {
                                                        backgroundColor: '#F2C393',
                                                    },
                                                    fontFamily: 'Gabarito, sans-serif',
                                                    textAlign: 'center'
                                                }}
                                            >
                                                <ListItemText 
                                                    primary={`${factor.text}`} 
                                                    primaryTypographyProps={{
                                                        sx: { fontSize: '16px', fontWeight: 500, fontSize: '20px' }
                                                    }}
                                                />
                                            </ListItem>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                                <Typography sx={{ fontSize: '15px', color: '#A9A9A9', marginTop: '10px'}}>Least important</Typography>
                            </List>
                        )}
                    </Droppable>
                </DragDropContext>

                <Button 
                    variant="contained" 
                    onClick={handleSubmit}
                    sx={{
                        opacity: 0.85,
                        backgroundColor: "#000000",
                        marginTop: 3,
                        padding: '10px 20px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        '&:hover': {
                            backgroundColor: '#36454F',
                        },
                    }}
                >
                    Submit
                </Button>
            </Box>
        </ThemeProvider>

    );
}

export default Quiz;