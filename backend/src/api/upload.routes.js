import express from 'express';
import { upload, uploadImage } from '../controllers/upload.controller.js';

const router = express.Router();

// 定义路由: POST /api/upload
// 1. 使用 upload.single('image') 中间件来处理名为 'image' 的单个文件上传
// 2. 调用 uploadImage 控制器来处理请求和响应
router.post('/', upload.single('image'), uploadImage);

export default router;
