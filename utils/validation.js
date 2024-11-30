// store all the validation for forms

export const validateEmail = (email) => {
    if (!email) {
      return "Email is required";
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      return "Invalid email address";
    }
    return "";
  };
  
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };
  
  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return "";
  };
  
  export const validateLoginForm = (email, password) => {
    const errors = {};
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
  
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
  
    return errors;
  };
  
  export const validateSignupForm = (email, password, confirmPassword) => {
    const errors = {};
    
    const emailError = validateEmail(email);
    if (emailError) errors.email = emailError;
  
    const passwordError = validatePassword(password);
    if (passwordError) errors.password = passwordError;
  
    const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;
  
    return errors;
  };