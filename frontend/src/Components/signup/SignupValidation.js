async function SignupValidation(values) {
    let error = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
    if ('firstname' in values && values.firstname === "") {
      error.firstname = "Please enter your first name";
    } 
    if ('lastname' in values && values.lastname === "") {
      error.lastname = "Please enter your last name";
    } 
    if ('email' in values && values.email === "") {
      error.email = "Please enter your email";
    } else if ('email' in values && !emailPattern.test(values.email)) {
      error.email = "Invalid email";
    }
    if ('password' in values && values.password === "") {
      error.password = "Please enter your password";
    } else if ('password' in values && !passwordPattern.test(values.password)) {
      error.password =
        "Password must have at least 8 characters with uppercase, lowercase and digits";
    } 
    if ('password2' in values && values.password2 === "") {
      error.password2 = "Please enter your password again";
    } else if (('password2' in values && 'password' in values && values.password2 !== values.password) || ('password2' in values && 'newpassword' in values && values.password2 !== values.newpassword)) {
      error.password2 = "Passwords do not match";
    } 
    if ('currentpassword' in values && values.currentpassword === "") {
      error.currentpassword = "Please enter your current password"
    }
    if ('newpassword' in values && values.newpassword === "") {
      error.newpassword = "Please enter your new password";
    } else if ('newpassword' in values && !passwordPattern.test(values.newpassword)) {
      error.newpassword =
        "Password must have at least 8 characters with uppercase, lowercase and digits";
    }
    return error;
  }
  
  export default SignupValidation;