import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    // 为公开网站指定一个不同的端口
    port: 5174,
  }
})
