<template>
  <el-menu
    class="sidebar-menu"
    router
    :default-active="activeRoute"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="/layers">
      <el-icon><Grid /></el-icon>
      <span>层级管理</span>
    </el-menu-item>
    <el-menu-item index="/menu">
      <el-icon><List /></el-icon>
      <span>菜单管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <el-icon><Setting /></el-icon>
      <span>全局设置</span>
    </el-menu-item>
    <el-menu-item index="/forms">
      <el-icon><Edit /></el-icon>
      <span>表单管理</span>
    </el-menu-item>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const activeRoute = route.path
</script>

<style scoped>
.sidebar-menu {
  border-right: none;
}
</style>
