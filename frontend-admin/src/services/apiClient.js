/**
 * apiClient.js
 * 创建并配置一个 axios 实例，用于与后端 API 通信。
 */
import axios from 'axios';
// 未来可以从这里导入 router，用于在登录失效时跳转
// import router from '../router'; 

// 创建 axios 实例
const apiClient = axios.create({
  // 修正：使用 import.meta.env.VITE_API_BASE_URL 来获取环境变量
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：在每个请求发送前附加认证 token
apiClient.interceptors.request.use(
  config => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem('token');
    if (token) {
      // 如果 token 存在，则将其添加到 Authorization 请求头中
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 响应拦截器：统一处理错误，例如登录失效
apiClient.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 如果响应状态码为 401 (未授权)
    if (error.response && error.response.status === 401) {
      // 清除本地存储的 token
      localStorage.removeItem('token');
      // 可以在这里将用户重定向到登录页面
      // router.push('/login');
      console.error('Authentication failed. Token cleared.');
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default apiClient;
