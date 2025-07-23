/**
 * layers.routes.js
 * 定义所有与 Layer 相关的 API 路由。
 */
import express from 'express';
import {
  createLayer,
  getAllLayers,
  getLayerById,
  updateLayer,
  deleteLayer,
} from '../controllers/layers.controller.js';

// 导入认证中间件 (我们稍后会创建它)
// import { protect } from '../middleware/auth.middleware.js';

const router = express.Router();

// 定义路由

// 路由: /api/layers
// GET 请求会调用 getAllLayers 获取所有 layers
// POST 请求会调用 createLayer 创建一个新 layer
router.route('/')
  .get(getAllLayers)
  // .post(protect, createLayer); // 示例：添加 protect 中间件保护创建路由
  .post(createLayer); // 目前为了测试方便，暂时不加保护

// 路由: /api/layers/:id
// GET 请求会调用 getLayerById 获取单个 layer
// PUT 请求会调用 updateLayer 更新单个 layer
// DELETE 请求会调用 deleteLayer 删除单个 layer
router.route('/:id')
  .get(getLayerById)
  // .put(protect, updateLayer)     // 示例：添加保护
  // .delete(protect, deleteLayer); // 示例：添加保护
  .put(updateLayer)
  .delete(deleteLayer);

export default router;
