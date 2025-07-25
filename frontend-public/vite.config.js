import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // 为公开网站指定一个不同的端口
    port: 5174,
    // *** 关键修改：添加代理配置 ***
    proxy: {
      '/api': { // 当请求路径以 /api 开头时
        target: 'http://localhost:5001', // 转发到你的后端服务地址和端口 (5001 是你的后端实际运行端口)
        changeOrigin: true, // 允许跨域
        // rewrite: (path) => path.replace(/^\/api/, ''), // 如果后端路由不带 /api，才需要这一行
                                                         // 鉴于后端是 /api/public/data，这里可以不加 rewrite
      },
    },
  }
})