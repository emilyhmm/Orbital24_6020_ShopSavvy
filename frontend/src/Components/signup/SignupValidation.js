async function SignupValidation(values) {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if (values.firstname === "") {
      error.firstname = "Please enter your first name";
    } 
    if (values.lastname === "") {
      error.lastname = "Please enter your last name";
    } 
    if (values.email === "") {
      error.email = "Please enter your email";
    } else if (!emailPattern.test(values.email)) {
      error.email = "Invalid email";
    }
    if (values.password === "") {
      error.password = "Please enter your password";
    } else if (!passwordPattern.test(values.password)) {
      error.password =
        "Password must have at least 8 characters with uppercase, lowercase and digits";
    } 
    if (values.password2 === "") {
      error.password2 = "Please enter your password again";
    } else if (values.password2 !== values.password) {
      error.password2 = "Passwords do not match";
    }
    return error;
  }
  
  export default SignupValidation;