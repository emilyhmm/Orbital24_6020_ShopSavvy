import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Contexts/AuthContext";
import {Menu} from "antd";
import { Box, Container, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NameChange from './NameChange';
import PasswordChange from './PasswordChange';
import Quiz from '../Quiz';
import { AiOutlinePoweroff } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { RiSurveyLine } from "react-icons/ri";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

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
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate()

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
        <Box sx={{ display: 'flex', flexDirection: 'row', textAlign: 'left' }}>
          <Menu 
          style={{ 
            fontFamily: 'Gabarito', 
            fontSize: '15px',
            marginTop: '40px'
          }}
          onClick={({key}) =>  {
            if (key === 'name') {
              setSelectedOption('nameChange')
            } else if (key === 'password') {
              setSelectedOption('passwordChange')
            } else if (key === 'preferences') {
              setSelectedOption('preferencesChange')
            } else if (key === 'back') {
              navigate('/')
            } else if (key === 'signout') {
              logout();     
              navigate('/');
            }
          }}
          items={[
            { label: 'Back to Shop', icon: <ArrowBackIosIcon />, key: 'back' },
            { label: 'Change Name', icon: <FaRegUserCircle />, fontFamily: 'Gabarito', key: 'name' }, 
            { label: 'Change Password', icon: <MdLockOutline />, key: 'password' },
            { label: 'Change Preferences', icon: <RiSurveyLine />, key: 'preferences' },
            { label: 'Sign Out', icon: <AiOutlinePoweroff />, key: 'signout', danger: true },
            ]}
          ></Menu>  

          <Box sx={{ width: '80%', marginTop: '40px' }}>
            {renderContent()}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Settings;
