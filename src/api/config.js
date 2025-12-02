import axios from 'axios';

const API = axios.create({
  baseURL: 'https://react-form-validation-api-4ist.onrender.com/api',
  headers: { 'Content-Type': 'application/json' }
});

export default API;
