<template>
  <div class="layout-full-width-image" ref="main">
    <div class="image-container">
      <img :src="getImageUrl()" alt="Full Width Image" class="full-width-image">
      <!-- 如果有标题或段落，则作为覆盖文字显示 -->
      <div v-if="getOverlayText()" class="overlay-content">
        <h2 v-if="getOverlayText().heading" class="overlay-heading">{{ getOverlayText().heading }}</h2>
        <p v-if="getOverlayText().paragraph" class="overlay-paragraph">{{ getOverlayText().paragraph }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  layer: {
    type: Object,
    required: true,
  },
});

const main = ref(null);

// 辅助函数，用于找到图片的URL
const getImageUrl = () => {
  const imageBlock = props.layer.contentBlocks.find(block => block.type === 'image');
  return imageBlock ? imageBlock.value : 'https://placehold.co/1920x1080/e2e8f0/adb5bd?text=Full+Width+Image';
};

// 辅助函数，用于找到覆盖的文字
const getOverlayText = () => {
  const heading = props.layer.contentBlocks.find(block => block.type === 'heading')?.value;
  const paragraph = props.layer.contentBlocks.find(block => block.type === 'paragraph')?.value;
  if (heading || paragraph) {
    return { heading, paragraph };
  }
  return null;
};

onMounted(() => {
  // 为图片和文字设置入场动画
  gsap.from(main.value.querySelector('.full-width-image'), {
    scrollTrigger: {
      trigger: main.value,
      start: "top 80%",
    },
    scale: 1.1, // 从轻微放大状态开始
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
  });

  gsap.from(main.value.querySelector('.overlay-content'), {
    scrollTrigger: {
      trigger: main.value,
      start: "top 70%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
});
</script>

<style scoped>
.layout-full-width-image {
  /* 移除左右内边距，让图片真正全宽 */
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.image-container {
  position: relative;
  width: 100%;
  height: 60vh; /* 定义一个高度 */
  overflow: hidden;
}

.full-width-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保图片填满容器而不变形 */
}

.overlay-content {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #fff;
  /* 添加一个半透明的黑色背景以增强文字可读性 */
  background: rgba(0, 0, 0, 0.4);
  padding: 2rem;
}

.overlay-heading {
  font-size: 3.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.overlay-paragraph {
  font-size: 1.2rem;
  max-width: 600px;
  margin-top: 1rem;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}
</style>
