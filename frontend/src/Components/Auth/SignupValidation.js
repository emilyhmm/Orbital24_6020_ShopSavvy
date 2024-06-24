import axios from 'axios';

async function SignupValidation(values) {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
  
    if (values.email === "") {
      error.email = "Please enter your email";
    } else if (!emailPattern.test(values.email)) {
      error.email = "Invalid email";
    } else {
      error.email = "";
    }
    if (values.password === "") {
      error.password = "Please enter your password";
    } else if (!passwordPattern.test(values.password)) {
      error.password =
        "Password must have at least 8 characters with uppercase, lowercase and digits";
    } else {
      error.password = "";
    }
    if (values.password2 === "") {
      error.password2 = "Please enter your password again";
    } else if (values.password2 !== values.password) {
      error.password2 = "Passwords do not match";
    } else {
      error.password2 = "";
    }

    if (!error.email && !error.password && !error.password2) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/user/signup`, {
          email: values.email,
          password: values.password
        });
  
        if (response.data.message === 'Signup successful') {
          error.general = "";
        }
      } catch (err) {
        if (err.response && err.response.data) {
          error.general = err.response.data.error;
        } else {
          error.general = "An error occurred. Please try again.";
        }
      }
    }
    return error;
  }
  
  export default SignupValidation;