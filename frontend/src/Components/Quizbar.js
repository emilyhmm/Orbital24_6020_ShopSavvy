import { useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, List, ListItem, ListItemText, Box, Typography } from '@mui/material';
import { QuizContext } from '../Contexts/QuizContext';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import '../App.css';

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
                    fontSize: '1rem',
                    lineHeight: '1.5',
                    letterSpacing: '0.00938em',
                }
            }
        }
    }
});

function Quizbar() {
    const { quizResults, setQuizResults } = useContext(QuizContext);
    const navigate = useNavigate();

    const token = localStorage.getItem('token')
    useEffect(() => {
        const fetchQuizResults = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/quiz/view`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response.data)
                setQuizResults(response.data.results);
            } catch (error) {
                console.error('Error fetching quiz results:', error);
            } 
        };
        fetchQuizResults();
    }, [token]);
    
    const handleEdit = () => {
        navigate('/quiz')
    }

    return (
        <ThemeProvider theme={theme}>
            <Typography elevation={3} sx={{ padding: '16px', backgroundColor: '#FFF6CA' }}>
                <Typography 
                    variant="h6" 
                    gutterBottom 
                    textAlign='left'
                    fontSize='24px'
                    sx={{ marginLeft: '8px'}}
                >
                    Your Preferences: 
                </Typography>
                <Box display="flex" gap="16px" >
                    <List sx={{ display: 'flex', flexDirection: 'row', gap: '8px', padding: 0 }} >
                        {quizResults.map((result, index) => (
                            <ListItem 
                                key={index} 
                                sx={{ 
                                    padding: '10px 10px 10px 10px', 
                                    backgroundColor: '#fff', 
                                    borderRadius: '4px', 
                                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', 
                                    alignItems: 'flex-start',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <ListItemText 
                                    primary={`${index + 1}. ${result.text}`} 
                                    style={{ textAlign: 'left' }}
                                />
                            </ListItem>
                        ))}
                    </List>
                    <Button onClick={handleEdit} >
                        Edit Preferences
                    </Button>
                </Box>
            </Typography>
        </ThemeProvider>
    )
}

export default Quizbar;