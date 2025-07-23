/**
 * server.js
 * 后端应用的主入口文件。
 */
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// 导入路由文件
import layersRoutes from './api/layers.routes.js';
import settingsRoutes from './api/settings.routes.js'; // 新增：导入 settings 路由
import formsRoutes from './api/forms.routes.js';
// (未来可以导入更多路由)
// import menuRoutes from './api/menu.routes.js';

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
// 当请求路径以 /api/layers 开头时，使用 layersRoutes 处理
app.use('/api/layers', layersRoutes);
// 新增：当请求路径以 /api/settings 开头时，使用 settingsRoutes 处理
app.use('/api/settings', settingsRoutes);
// 表单相关路由
app.use('/api/forms', formsRoutes);
// (未来可以挂载更多路由)
// app.use('/api/menu', menuRoutes);


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
