import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // 前端开发服务器端口
    proxy: {
      '/api': {
        // **将这里的 target 替换为你的后端实际监听的地址和端口！**
        // 假设你的后端将运行在 5000 端口
        target: 'http://localhost:5000',
        changeOrigin: true, // 允许跨域
        rewrite: (path) => path.replace(/^\/api/, ''), // 去掉 /api 前缀
      },
    },
  }
})