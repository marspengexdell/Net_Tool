/**
 * menu.routes.js
 * 定义所有与菜单项相关的 API 路由。
 */
import express from 'express';
import {
  createMenuItem,
  getAllMenuItems,
  updateMenuItem,
  deleteMenuItem,
} from '../controllers/menu.controller.js';

// 导入认证中间件 (未来启用)
// import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.route('/')
  .get(getAllMenuItems)
  // .post(protect, createMenuItem);
  .post(createMenuItem);

router.route('/:id')
  // .put(protect, updateMenuItem)
  // .delete(protect, deleteMenuItem);
  .put(updateMenuItem)
  .delete(deleteMenuItem);

export default router;
