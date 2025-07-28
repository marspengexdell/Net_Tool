<template>
  <!-- 
    首先判断当前布局是否需要标准的 section 包装器。
    video-hero 是一个特殊的全屏布局，所以它不需要。
  -->
  <section v-if="needsWrapper" class="layer-section">
    <!-- 
      使用 Vue 的动态组件 <component>。
      :is 属性会根据 componentToRender 的计算结果，来决定渲染哪个具体的布局组件。
    -->
    <component :is="componentToRender" v-if="componentToRender" :layer="layer" />
    <!-- 如果在地图中找不到对应的组件，则显示占位符 -->
    <UnimplementedLayout v-else :name="layer.name" :layout="layer.layout" />
  </section>

  <!-- 如果不需要包装器，则直接渲染组件 -->
  <component v-else-if="componentToRender" :is="componentToRender" :layer="layer" />
  
  <!-- 备用情况：如果是一个不需要包装器的未知布局 -->
  <section v-else class="layer-section">
      <UnimplementedLayout :name="layer.name" :layout="layer.layout" />
  </section>
</template>

<script setup>
import { computed } from 'vue';

// 导入所有布局组件
import LayoutFullWidthText from './layouts/LayoutFullWidthText.vue';
import LayoutFullWidthImage from './layouts/LayoutFullWidthImage.vue';
import LayoutTextLeft from './layouts/LayoutTextLeft.vue';
import LayoutImageLeft from './layouts/LayoutImageLeft.vue';
import LayoutTwoColumnText from './layouts/LayoutTwoColumnText.vue';
import LayoutThreeColumnCards from './layouts/LayoutThreeColumnCards.vue';
import LayoutVideoHero from './layouts/LayoutVideoHero.vue';
import LayoutFeatureGrid from './layouts/LayoutFeatureGrid.vue';
import LayoutTestimonialSlider from './layouts/LayoutTestimonialSlider.vue';
import LayoutLogoWall from './layouts/LayoutLogoWall.vue';
import UnimplementedLayout from './layouts/UnimplementedLayout.vue'; // 导入新的占位符组件

const props = defineProps({
  layer: {
    type: Object,
    required: true,
  },
});

// 这就是我们的“地图”，它将布局名称映射到对应的组件
const layoutMap = {
  'full-width-text': LayoutFullWidthText,
  'full-width-image': LayoutFullWidthImage,
  'text-left-image-right': LayoutTextLeft,
  'image-left-text-right': LayoutImageLeft,
  'two-column-text': LayoutTwoColumnText,
  'three-column-cards': LayoutThreeColumnCards,
  'video-hero': LayoutVideoHero,
  'feature-grid': LayoutFeatureGrid,
  'testimonial-slider': LayoutTestimonialSlider,
  'logo-wall': LayoutLogoWall,
};

// 计算属性：根据传入的 layer.layout，从地图中查找并返回正确的组件
const componentToRender = computed(() => {
  return layoutMap[props.layer.layout];
});

// 计算属性：判断当前布局是否需要 section 包装器
const needsWrapper = computed(() => {
  return props.layer.layout !== 'video-hero';
});
</script>

<style scoped>
.layer-section {
  padding: 5rem 5%;
  position: relative;
  overflow: hidden; /* 防止内部绝对定位或动画元素溢出 */
}

/* 针对全宽图片布局，移除该 section 的左右内边距 */
.layer-section:has(.layout-full-width-image) {
    padding-left: 0;
    padding-right: 0;
}

/* 实现条纹背景效果，增加视觉分隔 */
.layer-section:nth-child(even) {
  background-color: #f9fafb; /* light gray */
}
</style>
