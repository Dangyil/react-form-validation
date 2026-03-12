import axios from 'axios';

// Environment-based API configuration
const getBaseURL = () => {
  // Local development
  if (import.meta.env.DEV) {
    return 'http://localhost:8000/api';
  }

  // // Production (Render)
  // if (import.meta.env.VITE_API_URL) {
  //   return import.meta.env.VITE_API_URL;
  // }

  // Fallback for production
  return 'https://react-form-validation-api-4ist.onrender.com/api';
};

const API = axios.create({
  baseURL: getBaseURL(),
  headers: { 'Content-Type': 'application/json' }
});

//REQUEST INTERCEPTOR (Attach Token Automatically)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

//RESPONSE INTERCEPTOR (Auto Logout if Token Invalid)
API.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

export default API;
