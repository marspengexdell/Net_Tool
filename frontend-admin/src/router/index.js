/**
 * router/index.js
 * 前端路由配置文件
 */
import { createRouter, createWebHistory } from 'vue-router';

// 动态导入页面组件以实现代码分割
const LayerManager = () => import('../views/LayerManager.vue');
const GlobalSettings = () => import('../views/GlobalSettings.vue');
const MenuManager = () => import('../views/MenuManager.vue');
const FormManager = () => import('../views/FormManager.vue');
const Login = () => import('../views/Login.vue');

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
    path: '/forms',
    name: 'FormManager',
    component: FormManager,
    meta: { title: '表单管理', icon: 'Tickets' }
  },
  // 添加登录页路由
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登录', hideInMenu: true } // hideInMenu 是一个自定义标记，用于不在侧边栏显示
  }
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(), // 使用 HTML5 History 模式
  routes, // `routes: routes` 的缩写
});

export default router;
