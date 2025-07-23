<template>
  <!-- 添加 ref 以便 GSAP 可以定位此元素 -->
  <div class="layout-image-left" ref="main">
    <!-- 添加 ref -->
    <div class="image-column" ref="imageCol">
      <!-- 查找并显示第一个图片块 -->
      <img :src="getImageUrl()" alt="Layout Feature Image" class="layout-image">
    </div>
    <!-- 添加 ref -->
    <div class="text-column" ref="textCol">
      <!-- 渲染所有非图片块 -->
      <div v-for="(block, index) in getTextBlocks()" :key="index" class="content-block">
        <h2 v-if="block.type === 'heading'" class="content-heading">{{ block.value }}</h2>
        <p v-else-if="block.type === 'paragraph'" class="content-paragraph">{{ block.value }}</p>
        <a v-else-if="block.type === 'button'" :href="block.link" class="content-button">{{ block.value }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
// 导入 GSAP 和 ScrollTrigger
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// 注册 ScrollTrigger 插件
gsap.registerPlugin(ScrollTrigger);

const props = defineProps({
  layer: {
    type: Object,
    required: true,
  },
});

// 创建模板引用
const main = ref(null);
const imageCol = ref(null);
const textCol = ref(null);

// 在组件挂载后设置动画
onMounted(() => {
  // 创建一个 GSAP 时间轴，并与 ScrollTrigger 关联
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: main.value, // 触发动画的元素
      start: 'top 80%',    // 当元素顶部进入视口80%时开始
      toggleActions: 'play none none none', // 动画只播放一次
    },
  });

  // 定义动画序列
  tl.from(imageCol.value, { 
      x: -100, // 从左侧 100px 的位置开始
      opacity: 0, // 从完全透明开始
      duration: 0.8, // 动画持续时间
      ease: 'power3.out', // 缓动效果
    })
    .from(textCol.value, {
      x: 100, // 从右侧 100px 的位置开始
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5'); // "-=0.5" 使此动画比上一个动画提前0.5秒开始，产生重叠效果
});


// 辅助函数，用于从内容块中找到第一个图片的URL
const getImageUrl = () => {
  const imageBlock = props.layer.contentBlocks.find(block => block.type === 'image');
  // 如果找不到图片，则返回一个占位图
  return imageBlock ? imageBlock.value : 'https://placehold.co/600x450/e2e8f0/adb5bd?text=Image';
};

// 辅助函数，用于获取所有非图片的内容块
const getTextBlocks = () => {
  return props.layer.contentBlocks.filter(block => block.type !== 'image');
};
</script>

<style scoped>
.layout-image-left {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}

.image-column {
  position: relative;
}

.layout-image {
  width: 100%;
  border-radius: 12px;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  /* 关键的层叠效果：轻微旋转 */
  transform: rotate(-3deg);
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

/* 鼠标悬停时，图片回正并放大，提供交互感 */
.layout-image-left:hover .layout-image {
    transform: rotate(0deg) scale(1.05);
}

.text-column {
  padding: 1rem;
}

.content-heading {
    font-size: 2.5rem;
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

/* 响应式设计：在小屏幕上，布局变为单列 */
@media (max-width: 768px) {
  .layout-image-left {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .layout-image {
      transform: rotate(0deg); /* 在移动端移除旋转效果 */
  }
}
</style>
