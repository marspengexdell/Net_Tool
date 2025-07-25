/**
 * apiClient.js
 * 创建并配置一个 axios 实例，用于与后端 API 通信。
 */
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_PUBLIC_BASE_URL || 'http://localhost:5001/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      console.error('Authentication failed. Token cleared.');
    }
    return Promise.reject(error);
  }
);

export default apiClient;