import axios from 'axios';
import { isTokenExpired } from '../utils/auth';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api',
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    if (isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new Event('auth-expired'));
    } else {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

export default axiosInstance;