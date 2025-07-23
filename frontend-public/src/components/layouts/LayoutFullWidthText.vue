<template>
  <div class="layout-full-width-text">
    <div v-for="(block, index) in layer.contentBlocks" :key="index" class="content-block">
      <!-- 根据内容块类型渲染不同元素 -->
      <h2 v-if="block.type === 'heading'" class="content-heading">{{ block.value }}</h2>
      <p v-else-if="block.type === 'paragraph'" class="content-paragraph">{{ block.value }}</p>
      <a v-else-if="block.type === 'button'" :href="block.link" class="content-button">{{ block.value }}</a>
      <img v-else-if="block.type === 'image'" :src="block.value" alt="Content Image" class="content-image">
    </div>
  </div>
</template>

<script setup>
// 定义 props，接收父组件传递的 layer 数据
defineProps({
  layer: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.layout-full-width-text {
  max-width: 800px; /* 限制内容宽度以保证可读性 */
  margin: 0 auto;
  text-align: center;
}
.content-heading {
    font-size: 2.8rem;
    margin-bottom: 1rem;
    font-weight: 700;
    color: #222;
}
.content-paragraph {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}
.content-image {
  width: 100%;
  border-radius: 8px;
  margin-top: 2rem;
}
.content-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: #fff;
  padding: 12px 24px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.content-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
