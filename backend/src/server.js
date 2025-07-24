/**
 * server.js
 * 后端应用的主入口文件。
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 导入所有路由文件
import layersRoutes from './api/layers.routes.js';
import settingsRoutes from './api/settings.routes.js';
import menuRoutes from './api/menu.routes.js';
import publicRoutes from './api/public.routes.js';
import formsRoutes from './api/forms.routes.js';   // 新增
import authRoutes from './api/auth.routes.js';     // 新增

// 导入认证中间件 (假设您已创建此文件)
// import { protect } from './middleware/auth.middleware.js';

// --- 初始化 ---
// 加载 .env 文件中的环境变量
dotenv.config();

// 初始化 Express 应用
const app = express();

// --- 数据库连接 ---
connectDB();

// --- 中间件 (Middleware) ---
// 启用 CORS，允许跨域请求
app.use(cors());

// 解析 JSON 格式的请求体
app.use(express.json());

// --- API 路由 ---
// 公开路由 (不需要认证)
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);

// 受保护的管理后台路由 (未来可以启用 protect 中间件)
// 示例: app.use('/api/layers', protect, layersRoutes);
app.use('/api/layers', layersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/forms', formsRoutes);


// --- 错误处理中间件 (可选，但推荐) ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: 'Something broke!' });
});


// --- 启动服务器 ---
// 从环境变量中获取端口号，如果没有则默认为 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
