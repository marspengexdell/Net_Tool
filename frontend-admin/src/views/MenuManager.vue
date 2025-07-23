<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
        </div>
      </template>
      <p>这里将放置用于管理弹出菜单项的表格。</p>
    </el-card>
  </div>
</template>

<script setup>
// 未来在这里编写获取和管理菜单项的逻辑
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
