<template>
  <!-- 使用 Element Plus 的布局容器 -->
  <el-container class="app-container">
    <!-- 侧边栏 -->
    <el-aside width="200px" class="app-aside">
      <div class="logo">Layered CMS</div>

      <Sidebar />

      <!-- 导航菜单 -->
      <el-menu
        router
        :default-active="activeMenu"
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        text-color="#fff"
      >
        <el-menu-item index="/settings">
          <el-icon><setting /></el-icon>
          <span>全局设置</span>
        </el-menu-item>
        <el-menu-item index="/layers">
          <el-icon><Grid /></el-icon>
          <span>层级管理</span>
        </el-menu-item>
        <el-menu-item index="/menu">
          <el-icon><List /></el-icon>
          <span>菜单管理</span>
        </el-menu-item>
      </el-menu>

    </el-aside>

    <el-container>
      <!-- 顶栏 -->
      <el-header class="app-header">
        <div class="header-left">后台管理面板</div>
        <div class="header-right">
          <el-dropdown>
            <span class="el-dropdown-link">
              Admin<el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <!-- 主内容区 -->
      <el-main class="app-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>

import Sidebar from './components/layout/Sidebar.vue'

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const activeMenu = computed(() => route.path);

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

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.app-main {
  background-color: #f0f2f5;
}
</style>
