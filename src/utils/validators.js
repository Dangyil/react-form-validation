// Email validation
export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Password validation
export const isValidPassword = (password) => {
  return password.length >= 6;
};

// Username validation
export const isValidUsername = (username) => {
  return username.trim().length >= 3 && username.trim().length <= 30;
};

// General field validation
export const validateField = (name, value) => {
  let message = '';

  switch (name) {
    case 'username':
      if (!value.trim()) {
        message = 'Username cannot be empty';
      } else if (!isValidUsername(value)) {
        message = 'Username must be between 3 and 30 characters';
      }
      break;

    case 'email':
      if (!value.trim()) {
        message = 'Email address cannot be empty';
      } else if (!isValidEmail(value)) {
        message = 'Please enter a valid email address';
      }
      break;

    case 'password':
      if (!value) {
        message = 'Password cannot be empty';
      } else if (!isValidPassword(value)) {
        message = 'Password must be at least 6 characters long';
      }
      break;

    default:
      break;
  }

  return message;
};
