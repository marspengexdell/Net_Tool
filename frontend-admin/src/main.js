/**
 * main.js
 * 前端管理后台的应用入口文件。
 */
import { createApp } from 'vue';
import App from './App.vue';

// 完整引入 Element Plus UI 库
// 这对于快速构建后台界面非常方便
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

// 引入 Element Plus 的图标库
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// 引入路由 (我们稍后会创建 router/index.js)
import router from './router'; // 取消注释，引入路由

// 引入状态管理 Pinia (我们稍后会创建 store/index.js)
// import { createPinia } from 'pinia';

// 创建 Vue 应用实例
const app = createApp(App);

// 全局注册所有 Element Plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 使用插件
app.use(ElementPlus);
app.use(router); // 取消注释，启用路由
// app.use(createPinia());

// 将应用挂载到 public/index.html 文件中 id 为 'app' 的元素上
app.mount('#app');
