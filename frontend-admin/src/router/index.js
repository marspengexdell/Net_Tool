/**
 * router/index.js
 * 前端路由配置文件
 */
import { createRouter, createWebHistory } from 'vue-router';

// 导入页面组件
// LayerManager.vue 已经创建
import LayerManager from '../views/LayerManager.vue';
import FormManager from '../views/FormManager.vue';

// 我们需要为其他菜单项创建对应的页面组件
// 下面我们先导入，然后立即创建这两个占位文件
import GlobalSettings from '../views/GlobalSettings.vue';
import MenuManager from '../views/MenuManager.vue';
import Login from '../views/Login.vue';

// 定义路由规则
const routes = [
  {
    path: '/',
    redirect: '/layers', // 应用根路径默认重定向到 /layers
  },
  {
    path: '/layers',
    name: 'LayerManager',
    component: LayerManager,
    meta: { title: '层级管理', icon: 'Grid' } // meta 用于侧边栏生成
  },
  {
    path: '/forms',
    name: 'FormManager',
    component: FormManager,
    meta: { title: '表单管理', icon: 'Tickets' }
  },
  {
    path: '/settings',
    name: 'GlobalSettings',
    component: GlobalSettings,
    meta: { title: '全局设置', icon: 'Setting' }
  },
  {
    path: '/menu',
    name: 'MenuManager',
    component: MenuManager,
    meta: { title: '菜单管理', icon: 'List' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录' }
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes, // `routes: routes` 的缩写
});

export default router;
