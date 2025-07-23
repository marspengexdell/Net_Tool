/**
 * settings.routes.js
 * 定义所有与全局设置相关的 API 路由。
 */
import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';

// 导入认证中间件 (未来启用)
// import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// 定义路由: /api/settings
// GET 请求获取设置
// PUT 请求更新设置
router.route('/')
  .get(getSettings)
  // .put(protect, updateSettings); // 生产环境中应启用保护
  .put(updateSettings);

export default router;
