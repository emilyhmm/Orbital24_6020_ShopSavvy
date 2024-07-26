import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from "@mui/material/Grid";
import { UserContext } from "../../Contexts/AuthContext";
import SignupValidation from "../signup/SignupValidation";
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

export default function NameChange() {
  const { firstName, setFirstName, lastName, setLastName } = useContext(UserContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    firstname: firstName,
    lastname: lastName,
  });
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setSuccess(false)
    setErrors({});
    const validationErrors = await SignupValidation(values);
    console.log(Object.values(validationErrors))
    if (Object.values(validationErrors).length !== 0) {
      setErrors(validationErrors);
    } else {
      // Proceed only if there are no validation errors
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/api/user/editname`, values,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log('Name changed ', response.data);
          setSuccess(true)
          setFirstName(values.firstname)
          setLastName(values.lastname)
        } else {
            navigate('/login')
        }
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ general: error.response.data.error });
        } else {
          setErrors({ general: "An error occurred. Please try again." });
        }
        console.error(
          "Error submitting form:",
          error.response ? error.response.data : error.message
        );
      }
    };
  }

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
          borderRadius: '8px',
          maxWidth: 600,
          height: '650px',
          margin: 'auto',
          textAlign: 'center',
          }}
      >
        {success && (
          <Box
            sx={{
              p: '8px 10px',
              border: "1px solid green",
              borderRadius: "4px",
              backgroundColor: "#d4edda",
              color: "green",
              width: '30%', 
              fontSize: '0.9rem',
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              marginBottom: 5
            }}
          > Username changed! 
          </Box>
        )}
        <Typography 
          sx={{ 
            fontFamily:'"DM Serif Display", serif',
            fontSize: '30px'
            }} 
        >
          Change Name
        </Typography>
        <TextField
          margin="normal"
          fullWidth
          id="firstName"
          label="First Name"
          name="firstname"
          autoComplete="given-name"
          autoFocus
          value={values.firstname}
          onChange={handleInput}
          sx={{ width: '50%' }}
        />
        {errors.firstname && (
          <Grid item xs={12} sm={6}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.firstname}</p>
          </Grid>
        )}
        <TextField
          margin="normal"
          id="lastName"
          label="Last Name"
          name="lastname"
          autoComplete="family-name"
          value={values.lastname}
          onChange={handleInput}
          sx={{ width: '50%' }}
        />
        {errors.lastname && (
          <Grid item xs={12} sm={6}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.lastname}</p>
          </Grid>
        )}

        {errors.general && (
          <Grid item xs={12} sm={6}>
            <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.general}</p>
          </Grid>
        )}

        <Button
          type="submit"
          variant="contained"
          sx={{ 
            mt: 3, 
            mb: 2, 
            width: '20%',
            backgroundColor: 'black',
            '&:hover': {
              backgroundColor: '#36454F',
            },
          }}
        >
          Save
        </Button>
      </Box>
    </ThemeProvider>
  );
};
