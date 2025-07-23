/**
 * public.routes.js
 * 定义为公共前端服务的 API 路由。
 */
import express from 'express';
import { getPublicData } from '../controllers/public.controller.js';

const router = express.Router();

// 定义路由: /api/public/data
router.route('/data').get(getPublicData);

export default router;
