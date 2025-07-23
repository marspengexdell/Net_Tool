/**
 * apiClient.js
 * 为公开网站创建并配置一个 axios 实例。
 */
import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  // 后端的基地址指向 /api/public
  baseURL: process.env.VUE_APP_API_BASE_URL || 'http://localhost:5001/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 对于公共网站，通常不需要请求拦截器来附加 token。

export default apiClient;
