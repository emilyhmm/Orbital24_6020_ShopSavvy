import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import SignupValidation from "./SignupValidation";
import "../../App.css";
import axios from "axios";

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

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Shopsavvy
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignUp({ toggleForm }) {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [check, setCheck] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false)
    setErrors({});
    setSubmitted(true);

    const validationErrors = await SignupValidation(values);
    console.log(Object.values(validationErrors))
    if (Object.values(validationErrors).length !== 0) {
      setErrors(validationErrors);
    } else {
      console.log("validation");
      // Proceed only if there are no validation errors
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/signup`, values);
        setSuccess(true)
        console.log("Signup response:", response.data);
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
    }
  };

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            padding: '10px',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: '750px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#F2C393" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontFamily: "DM Serif Display, serif" }}>
            Sign up
          </Typography>
          {success && (
            <Box
              sx={{
                marginTop: 4,
                p: '8px 10px',
                border: "1px solid green",
                borderRadius: "4px",
                backgroundColor: "#d4edda",
                color: "green",
                width: '70%', 
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            > Signup successful! Please sign in 
            </Box>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstname"
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  autoFocus
                  onChange={handleInput}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="family-name"
                  onChange={handleInput}
                />
              </Grid>
              {errors.firstname && (
                <Grid item xs={12} sm={6}>
                  <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.firstname}</p>
                </Grid>
              )}
              {errors.lastname && (
                <Grid item xs={12} sm={6}>
                  <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.lastname}</p>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
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
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handleInput}
                />
              </Grid>
              {errors.password && (
                <Grid item xs={12}>
                  <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.password}</p>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password2"
                  label="Confirm Password"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  onChange={handleInput}
                />
              </Grid>
              {errors.password2 && (
                <Grid item xs={12}>
                  <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.password2}</p>
                </Grid>
              )}
              {errors.general && (
                <Grid item xs={12}>
                  <p className="textdanger" style={{ margin: 0, textAlign: 'left' }}>{errors.general}</p>
                </Grid>
              )}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox 
                    value="terms&cons" 
                    color="primary" 
                    checked={check}
                    onChange={() => setCheck(!check)}
                    required />
                  }
                  label="I agree to the terms and conditions"
                  sx={{
                    color: !check && submitted ? 'red' : 'inherit', 
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="black"
              disabled={!check}
            >
              <span style={{ color: "white" }}>Sign Up</span>
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => toggleForm("Login")}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ marginTop: 4 }}/>
      </Container>
    </ThemeProvider>
  );
}
