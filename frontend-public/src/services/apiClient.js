/**
 * apiClient.js
 * 为公开网站创建并配置一个 axios 实例。
 */
import axios from 'axios';

// 创建 axios 实例
const apiClient = axios.create({
  // 修正：使用 import.meta.env.VITE_API_PUBLIC_BASE_URL 来获取环境变量
  baseURL: import.meta.env.VITE_API_PUBLIC_BASE_URL || 'http://localhost:5001/api/public',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
