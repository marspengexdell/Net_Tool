<template>
  <section class="layer-section">
    <!-- 
      使用 v-if / v-else-if 来根据 layer.layout 的值选择渲染哪个组件。
      这是实现动态布局的核心。
    -->
    <LayoutFullWidthText v-if="layer.layout === 'full-width-text'" :layer="layer" />
    
    <!-- 新增：当布局为 'image-left-text-right' 时，使用新的布局组件 -->
    <LayoutImageLeft v-else-if="layer.layout === 'image-left-text-right'" :layer="layer" />
    
    <!-- 
      未来可以添加更多布局组件
      <LayoutTextLeft v-else-if="layer.layout === 'text-left-image-right'" :layer="layer" />
    -->
    
    <!-- 为尚未实现的布局提供一个清晰的提示 -->
    <div v-else class="unimplemented-layout">
      <h3>{{ layer.name }}</h3>
      <p>布局 <strong>'{{ layer.layout }}'</strong> 尚未实现。</p>
    </div>
  </section>
</template>

<script setup>
// 导入我们已经创建的布局组件
import LayoutFullWidthText from './layouts/LayoutFullWidthText.vue';
import LayoutImageLeft from './layouts/LayoutImageLeft.vue'; // 新增导入

// 定义 props，接收父组件传递的 layer 数据
defineProps({
  layer: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.layer-section {
  padding: 5rem 5%;
  position: relative; /* 为未来的层叠效果做准备 */
  overflow: hidden; /* 防止内部绝对定位的元素溢出 */
}

.layer-section:nth-child(even) {
  background-color: #f9fafb;
}

.unimplemented-layout {
  padding: 2rem;
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  color: #d46b08;
  border-radius: 8px;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
