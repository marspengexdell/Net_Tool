<template>
  <el-container class="app-container">
    <el-aside width="200px" class="app-aside">
      <div class="logo">Layered CMS</div>
      <Sidebar />
    </el-aside>
    <el-container>
      <el-header class="app-header">
        <div class="header-left">后台管理面板</div>
      </el-header>
      <el-main class="app-main">
        <slot />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
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
.app-main {
  background-color: #f0f2f5;
}
</style>
