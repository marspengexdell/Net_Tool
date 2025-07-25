<template>
  <section class="layer-section">
    <!-- 
      使用 v-if / v-else-if 来根据 layer.layout 的值选择渲染哪个组件。
    -->
    <LayoutFullWidthText v-if="layer.layout === 'full-width-text'" :layer="layer" />
    
    <!-- 新增：处理 'full-width-image' 布局 -->
    <LayoutFullWidthImage v-else-if="layer.layout === 'full-width-image'" :layer="layer" />
    
    <LayoutTextLeft v-else-if="layer.layout === 'text-left-image-right'" :layer="layer" />

    <LayoutImageLeft v-else-if="layer.layout === 'image-left-text-right'" :layer="layer" />

    <!-- 新增：处理 'two-column-text' 布局 -->
    <LayoutTwoColumnText v-else-if="layer.layout === 'two-column-text'" :layer="layer" />
    
    <LayoutThreeColumnCards v-else-if="layer.layout === 'three-column-cards'" :layer="layer" />
    
    <!-- 为尚未实现的布局提供一个清晰的提示 -->
    <div v-else class="unimplemented-layout">
      <h3>{{ layer.name }}</h3>
      <p>布局 <strong>'{{ layer.layout }}'</strong> 尚未实现。</p>
    </div>
  </section>
</template>

<script setup>
// 导入所有布局组件
import LayoutFullWidthText from './layouts/LayoutFullWidthText.vue';
import LayoutFullWidthImage from './layouts/LayoutFullWidthImage.vue'; // 新增
import LayoutTextLeft from './layouts/LayoutTextLeft.vue';
import LayoutImageLeft from './layouts/LayoutImageLeft.vue';
import LayoutTwoColumnText from './layouts/LayoutTwoColumnText.vue'; // 新增
import LayoutThreeColumnCards from './layouts/LayoutThreeColumnCards.vue';

// 定义 props
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
  position: relative;
  overflow: hidden;
}

/* 针对全宽图片布局，移除该 section 的左右内边距 */
.layer-section:has(.layout-full-width-image) {
    padding-left: 0;
    padding-right: 0;
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
