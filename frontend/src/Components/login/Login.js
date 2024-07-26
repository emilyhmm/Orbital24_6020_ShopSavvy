import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import "../../App.css";
import { useState, useContext } from "react";
import LoginValidation from "./LoginValidation";
import { AuthContext } from "../../Contexts/AuthContext";
import "../../App.css";
import axios from "axios";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/" >
        shoppysavvy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor) => augmentColor({ color: { main: mainColor } });
const defaultTheme = createTheme({
  palette: {
    anger: createColor("#F40B27"),
    apple: createColor("#5DBA40"),
    steelBlue: createColor("#5C76B7"),
    violet: createColor("#BC00A3"),
    orange: createColor("#F79326"),
    black: createColor("#0C0C0C"),
  },
  typography: {
    fontFamily: "Gabarito, sans-serif",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: '20px'
  },

});

export default function Login({ toggleForm }) {
  const [values, setValues] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const validationErrors = await LoginValidation(values);
    if (Object.values(validationErrors).length !== 0) {
      setErrors(validationErrors);
    } else {
      console.log("validation");
      // Proceed only if there are no validation errors
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/login`,
          values
        );
        const { accessToken, showQuiz } = response.data;
        console.log('showquiz', showQuiz)
        localStorage.setItem("token", accessToken); // Store the token
        console.log("Logged in and token stored:", accessToken);
        login();
        if (showQuiz) {
          navigate('/quiz');
        } else {
          navigate('/')
        }
        
      } catch (error) {
        if (error.response && error.response.data) {
          setErrors({ general: error.response.data.error });
        } else {
          setErrors({ general: "An error occurred. Please try again." });
        }
        console.error(
          "Error submitting form:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            padding: '50px',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: '600px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F2C393" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontFamily: "DM Serif Display, serif" }} >
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }} >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleInput}
                />
              </Grid>
              {errors.email && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.email}</p>
                  </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInput}
                />
              </Grid>
              {errors.password && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.password}</p>
                  </Grid>
              )}
              {errors.general && (
                  <Grid item xs={12}>
                    <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.general}</p>
                  </Grid>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="black"
            >
              <span style={{ color: "white" }}>Sign In</span>
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => toggleForm("Signup")}
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
