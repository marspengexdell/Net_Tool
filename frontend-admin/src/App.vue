<template>
  <el-container class="app-container">
    <el-aside width="200px" class="app-aside">
      <div class="logo">Layered CMS</div>
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :router="true">
        <el-menu-item v-for="route in menuRoutes" :key="route.path" :index="route.path">
          <el-icon><component :is="route.meta.icon || 'Menu'" /></el-icon>
          <span>{{ route.meta.title }}</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="app-header">
        <div>后台管理面板</div>
      </el-header>
      <el-main class="app-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const menuRoutes = computed(() =>
  router.options.routes.filter(route => route.meta && route.meta.title && !route.meta.hideInMenu)
);
</script>

<style>
/* 全局样式和布局样式 */
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.app-container {
  height: 100%;
}

.app-aside {
  background-color: #545c64;
  color: #fff;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  background-color: #434a50;
}

.el-menu {
  border-right: none; /* 去掉菜单的右边框 */
}

.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e6e6e6;
  background-color: #fff;
}

.app-main {
  background-color: #f0f2f5;
}
</style>
