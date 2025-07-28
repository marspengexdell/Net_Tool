<template>
  <div class="layout-logo-wall">
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    
    <!-- 无限滚动容器 -->
    <div class="scroller">
      <div class="scroller-inner">
        <!-- 渲染两遍 logos 列表以实现无缝滚动 -->
        <img v-for="(logo, index) in logos" :key="`logo-a-${index}`" :src="logo.fullUrl" :alt="`Client Logo ${index + 1}`" class="logo-image">
        <img v-for="(logo, index) in logos" :key="`logo-b-${index}`" :src="logo.fullUrl" :alt="`Client Logo ${index + 1}`" class="logo-image">
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  layer: {
    type: Object,
    required: true,
  },
});

const backendUrl = import.meta.env.VITE_API_PUBLIC_BASE_URL ? import.meta.env.VITE_API_PUBLIC_BASE_URL.replace('/api/public', '') : 'http://localhost:5001';

const mainHeading = computed(() => {
  const headingBlock = props.layer.contentBlocks.find(block => block.type === 'heading');
  return headingBlock ? headingBlock.value : null;
});

const logos = computed(() => {
  return props.layer.contentBlocks
    .filter(block => block.type === 'image')
    .map(block => ({
      ...block,
      fullUrl: block.value.startsWith('/uploads') ? `${backendUrl}${block.value}` : block.value,
    }));
});
</script>

<style scoped>
.layout-logo-wall {
  padding: 4rem 0; /* 移除左右内边距，让滚动效果可以触及边缘 */
  overflow: hidden;
}

.main-heading {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
  color: #6b7280; /* gray-500 */
  margin-bottom: 3rem;
}

.scroller {
  width: 100%;
  -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller-inner {
  display: flex;
  gap: 4rem; /* Logo 之间的间距 */
  width: max-content;
  animation: scroll 30s linear infinite;
}

.logo-image {
  height: 48px; /* 固定 Logo 高度 */
  max-width: 150px;
  object-fit: contain;
  filter: grayscale(100%);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.logo-image:hover {
  filter: grayscale(0%);
  opacity: 1;
}

@keyframes scroll {
  to {
    transform: translateX(calc(-50% - 2rem)); /* 滚动一半距离（一个列表的宽度）加上一半的间距 */
  }
}
</style>
