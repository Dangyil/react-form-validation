import axios from 'axios';

const API = axios.create({
  baseURL: 'https://react-form-validation-api-4ist.onrender.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
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
