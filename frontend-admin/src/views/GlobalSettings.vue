<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>全局设置</span>
        </div>
      </template>
      <p>这里将放置用于管理网站 Logo、字体和颜色的表单。</p>
    </el-card>
  </div>
</template>

<script setup>
// 未来在这里编写获取和更新设置的逻辑
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
