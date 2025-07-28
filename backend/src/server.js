/**
 * server.js
 * 后端应用的主入口文件。
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';

// 导入所有路由文件
import layersRoutes from './api/layers.routes.js';
import settingsRoutes from './api/settings.routes.js';
import menuRoutes from './api/menu.routes.js';
import publicRoutes from './api/public.routes.js';
import formsRoutes from './api/forms.routes.js';
import authRoutes from './api/auth.routes.js';
import uploadRoutes from './api/upload.routes.js';

// --- 初始化 ---
dotenv.config();
const app = express();

// --- 数据库连接 ---
connectDB();

// --- 中间件 (Middleware) ---
// 修正：使用更详细的 CORS 配置以允许文件上传
app.use(cors({
  origin: '*', // 允许所有来源 (在开发中可以，生产环境需要更严格的设置)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许所有常见的 HTTP 方法
}));

app.use(express.json());

// --- API 路由 ---
app.use('/api/public', publicRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// 受保护的管理后台路由
app.use('/api/layers', layersRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/forms', formsRoutes);

// --- 静态文件服务 ---
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// --- 错误处理中间件 ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, message: 'Something broke!' });
});


// --- 启动服务器 ---
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
