/**
 * apiClient.js
 * 创建并配置一个 axios 实例，用于与后端 API 通信。
 */
import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  // 从环境变量获取后端的基地址，如果不存在则使用本地开发地址
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 在每个请求中附加认证 token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// 统一处理错误，如未授权时清除 token
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
