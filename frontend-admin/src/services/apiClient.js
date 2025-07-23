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

// 你可以在这里添加请求拦截器，例如，在每个请求中附加认证 token
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, error => {
//   return Promise.reject(error);
// });

// 你也可以添加响应拦截器，用于统一处理错误
// apiClient.interceptors.response.use(response => {
//   return response;
// }, error => {
//   // 例如，处理 401 未授权错误，跳转到登录页
//   if (error.response.status === 401) {
//     // router.push('/login');
//   }
//   return Promise.reject(error);
// });

export default apiClient;
