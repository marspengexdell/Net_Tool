/**
 * main.js
 * 公开网站的前端应用入口文件。
 */
import { createApp } from 'vue';
import App from './App.vue';

// 引入全局样式
import './assets/styles/main.css';

// 创建 Vue 应用实例
const app = createApp(App);

// 未来可以根据需要引入路由或状态管理
// import router from './router';
// app.use(router);

// 挂载应用
app.mount('#app');
