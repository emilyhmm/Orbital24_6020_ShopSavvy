import { useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NameChange from './NameChange';
import PasswordChange from './PasswordChange';
import Quiz from '../Quiz';

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

const Settings = () => {
  const [selectedOption, setSelectedOption] = useState('nameChange');

  const renderContent = () => {
    switch (selectedOption) {
      case 'nameChange':
        return <NameChange />;
      case 'passwordChange':
        return <PasswordChange />;
      case 'preferencesChange':
        return <Quiz />;
      default:
        return <NameChange />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <CssBaseline />
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: 8 }}>
          <Box sx={{ 
            width: '20%', 
            marginRight: 2,
            height: '100%',
            width: '160px',
            top: 0,
            left: 0,
            backgroundcolor: '#111',
            }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setSelectedOption('nameChange')}
              sx={{ marginBottom: 2 }}
            >
              Change Name
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setSelectedOption('passwordChange')}
              sx={{ marginBottom: 2 }}
            >
              Change Password
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={() => setSelectedOption('preferencesChange')}
            >
              Change Preferences
            </Button>
          </Box>
          <Box sx={{ width: '80%' }}>
            {renderContent()}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
