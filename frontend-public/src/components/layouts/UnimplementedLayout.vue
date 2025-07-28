<template>
  <div class="unimplemented-layout">
    <h3>{{ name }}</h3>
    <p>布局 <strong>'{{ layout }}'</strong> 尚未实现。</p>
  </div>
</template>

<script setup>
// 定义 props，接收父组件传递的层级名称和布局类型
defineProps({
  name: String,
  layout: String,
});
</script>

<style scoped>
.unimplemented-layout {
  padding: 2rem;
  background-color: #fffbe6; /* light yellow */
  border: 1px solid #ffe58f;
  color: #d46b08;
  border-radius: 8px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
