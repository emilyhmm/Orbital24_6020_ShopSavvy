function LoginValidation(values) {
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
    return error;
  }
  
  export default LoginValidation;