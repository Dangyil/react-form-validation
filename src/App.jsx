import { useState } from 'react'
import { useEffect } from 'react'
import API from './api/config.js';
import LayoutPage from './layout.jsx';
import './index.css'

export default function ValidationForm() {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [serverError, setServerError] = useState('');
  const [serverMessage, setServerMessage] = useState('');
  const [registeredUser, setRegisteredUser] = useState(null);

  const fields = isLoginMode ?
    [
      { name: "email", placeholder: "Email" },
      { name: "password", placeholder: "Password" }
    ]
    :
    [
      { name: "username", placeholder: "User name" },
      { name: "email", placeholder: "Email" },
      { name: "password", placeholder: "Password" }
    ];

  const validateField = (name, value) => {
    let message = "";

    switch (name) {
      case 'username':
        if (!value.trim()) {
          message = 'User name cannot be empty';
        }
        break;

      case 'email':
        if (!value.trim()) {
          message = 'Email address cannot be empty';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          message = 'Please enter a valid email address';
        }
        break;

      case 'password':
        if (!value.trim()) {
          message = 'Password cannot be empty';
        } else if (value.length < 6) {
          message = 'Password must be at least 6 characters';
        }
        break;

      default:
        break;
    }

    return message; 
  };

  // Full form validation function
  const validate = () => {
    let objErrors = {};
    let isValid = true;

    // Validate each field
    for (let field of fields) {
      const message = validateField(field.name, formData[field.name]);
      if (message) {
        objErrors[field.name] = message;
        isValid = false;
      }
    }

    setErrors(objErrors); // save error in state
    return isValid;
  };

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: validateField(name, value) });
    setServerError('');
    setServerMessage('');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const endPoint = isLoginMode ? '/users/login' : '/users/register';
        const response = await API.post(endPoint, formData);

        setServerMessage(response.data?.message || (isLoginMode ? 'Logged in successfully' : 'Registered successfully'));

        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(response.data?.user));

          setTimeout(() => {
          setRegisteredUser(response.data?.user);
          setFormData({ username: '', email: '', password: '' });
          setErrors({});
        }, 1000);
      } catch (err) {
        const msg = err?.response?.data?.message || err.message || 'Server error';
        setServerError(msg);
      }
    }
  };

  const handleToggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setServerError('');
    setServerMessage('');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setRegisteredUser(null);
    setFormData({ username: '', email: '', password: '' });
    setErrors({});
    setServerError('');
    setServerMessage('');
  };

  // Prevent submission if there are validation errors
  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error);
    setIsDisabled(hasErrors);
  }, [formData, errors]);

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setRegisteredUser(JSON.parse(savedUser));
    }
  }, []);

  if (registeredUser) {
    return <LayoutPage user={registeredUser} onLogout={handleLogout} />;
  }

  return (
    <div id="overall">
      <div id="left">
        <h1>Learn to code by watching others</h1>
        <p id="see">
          See how experienced developers solve problems in real-time. Watching scripted tutorials is
          great, but understanding how developers think is invaluable.
        </p>
      </div>

      <div id="right">
        <div id="purple-box">
          <p id="try">
            Try it free 7 days <span id="then">then $20/mo. thereafter</span>
          </p>
        </div>

        {/* Toggle buttons */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd', borderRadius: '5px' }}>
          <button
            onClick={handleToggleMode}
            style={{
              padding: '10px 20px',
              background: !isLoginMode ? '#5E548E' : 'transparent',
              color: !isLoginMode ? 'white' : '#5E548E',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '5px'
            }}
          >
            Register
          </button>
          <button
            onClick={handleToggleMode}
            style={{
              padding: '10px 20px',
              background: isLoginMode ? '#5E548E' : 'transparent',
              color: isLoginMode ? 'white' : '#5E548E',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '16px',
              borderRadius: '5px'
            }}
          >
            Login
          </button>
        </div>

        <form id="myForm" onSubmit={handleSubmit} noValidate>
          {fields.map((field) => (
            <label key={field.name}>
              <div className="input-wrapper">
                <input
                  type={field.name === "email" ? "email" : field.name === "password" ? "password" : "text"}
                  name={field.name}
                  placeholder={errors[field.name] ? "" : field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={errors[field.name] ? 'error' : ''}
                />
                <span className="error-icon" style={{ display: errors[field.name] ? 'inline-block' : 'none' }}   >
                  !
                </span>
              </div>
              <span className="error">{errors[field.name]}</span>
            </label>
          ))}

          <button className='submit-btn'
            type="submit"
            disabled={isDisabled}
          >
            {isLoginMode ? 'LOGIN' : 'SUBMIT'}
          </button>

          {serverError && <p className="server-error" style={{ color: 'var(--clr-red, #d9534f)', marginTop: '6px' }}>{serverError}</p>}
          {serverMessage && <p className="server-message" style={{ color: 'var(--clr-green, #28a745)', marginTop: '6px' }}>{serverMessage}</p>}

          {!isLoginMode && (
            <p id="terms">
              By clicking the button, you are agreeing to our{" "}
              <a href="#">Terms and Services</a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
