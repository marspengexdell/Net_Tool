<template>
  <!-- 添加 ref 以便 GSAP 可以定位此元素 -->
  <div class="layout-text-left" ref="main">
    <!-- 添加 ref -->
    <div class="text-column" ref="textCol">
      <!-- 渲染所有非图片块 -->
      <div v-for="(block, index) in getTextBlocks()" :key="index" class="content-block">
        <h2 v-if="block.type === 'heading'" class="content-heading">{{ block.value }}</h2>
        <p v-else-if="block.type === 'paragraph'" class="content-paragraph">{{ block.value }}</p>
        <a v-else-if="block.type === 'button'" :href="block.link" class="content-button">{{ block.value }}</a>
      </div>
    </div>
    <!-- 添加 ref -->
    <div class="image-column" ref="imageCol">
      <!-- 查找并显示第一个图片块 -->
      <img :src="getImageUrl()" alt="Layout Feature Image" class="layout-image">
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
const imageCol = ref(null);
const textCol = ref(null);

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  // 定义动画序列，这次文字从左边滑入，图片从右边滑入
  tl.from(textCol.value, { 
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from(imageCol.value, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');
});

const getImageUrl = () => {
  const imageBlock = props.layer.contentBlocks.find(block => block.type === 'image');
  return imageBlock ? imageBlock.value : 'https://placehold.co/600x450/e2e8f0/adb5bd?text=Image';
};

const getTextBlocks = () => {
  return props.layer.contentBlocks.filter(block => block.type !== 'image');
};
</script>

<style scoped>
.layout-text-left {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.layout-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  /* 这次我们让图片向右旋转 */
  transform: rotate(3deg);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.layout-text-left:hover .layout-image {
    transform: rotate(0deg) scale(1.05);
}

.text-column {
  padding: 1rem;
}

.content-heading {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    font-weight: 700;
}
.content-paragraph {
    font-size: 1.1rem;
    color: #555;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}
.content-button {
  display: inline-block;
  background-color: var(--color-primary);
  color: #fff;
  padding: 12px 24px;
  border-radius: 5px;
  font-weight: bold;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.content-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .layout-text-left {
    grid-template-columns: 1fr;
  }
  .image-column {
    /* 在移动端，让图片显示在文字下方 */
    order: 2;
  }
  .text-column {
    order: 1;
  }
  .layout-image {
      transform: rotate(0deg);
  }
}
</style>
