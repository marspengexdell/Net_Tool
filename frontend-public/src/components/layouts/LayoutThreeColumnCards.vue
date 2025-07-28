<template>
  <div class="layout-three-column-cards" ref="main">
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    <div class="cards-container">
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img v-if="card.image" :src="card.fullImageUrl" alt="Card image" class="card-image">
        <div class="card-content">
          <h3 v-if="card.heading" class="card-heading">{{ card.heading }}</h3>
          <!-- 修正：循环渲染段落，以支持每个卡片有多个段落 -->
          <p v-for="(p, pIndex) in card.paragraphs" :key="pIndex" class="card-paragraph">{{ p }}</p>
          <a v-if="card.button" :href="card.button.link" class="card-button">{{ card.button.value }}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
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
const backendUrl = import.meta.env.VITE_API_PUBLIC_BASE_URL ? import.meta.env.VITE_API_PUBLIC_BASE_URL.replace('/api/public', '') : 'http://localhost:5001';

// 修正：简化并优化了主标题的判断逻辑
// 约定：只有当第一个块和第二个块都是标题时，第一个才被视为主标题。
const mainHeading = computed(() => {
  const blocks = props.layer.contentBlocks;
  if (blocks && blocks.length >= 2 && blocks[0].type === 'heading' && blocks[1].type === 'heading') {
    return blocks[0].value;
  }
  return null;
});

// 修正：重写了卡片内容的解析逻辑，使其更健壮
const cards = computed(() => {
  const result = [];
  const blocks = props.layer.contentBlocks;
  if (!blocks || blocks.length === 0) return [];

  // 如果找到了主标题，则从内容块列表中移除它
  const contentBlocks = mainHeading.value ? blocks.slice(1) : blocks;
  
  let currentCard = null;

  contentBlocks.forEach(block => {
    // 约定：每个 'heading' 类型的内容块开始一张新卡片
    if (block.type === 'heading') {
      // 如果已存在一个正在构建的卡片，先保存它
      if (currentCard) {
        result.push(currentCard);
      }
      // 开始一张新卡片
      currentCard = {
        heading: block.value,
        image: null,
        fullImageUrl: null,
        paragraphs: [], // 使用数组以支持多个段落
        button: null
      };
    } else if (currentCard) {
      // 将内容块添加到当前正在构建的卡片中
      switch (block.type) {
        case 'image':
          if (!currentCard.image) { // 每张卡片只取第一张图片
            currentCard.image = block.value;
            currentCard.fullImageUrl = block.value.startsWith('/uploads') ? `${backendUrl}${block.value}` : block.value;
          }
          break;
        case 'paragraph':
          currentCard.paragraphs.push(block.value); // 添加段落到数组
          break;
        case 'button':
          if (!currentCard.button) { // 每张卡片只取第一个按钮
            currentCard.button = block;
          }
          break;
      }
    }
  });

  // 将循环结束后最后一张正在构建的卡片添加到结果中
  if (currentCard) {
    result.push(currentCard);
  }

  return result;
});

onMounted(() => {
  // 为卡片设置交错出现的动画
  gsap.from(main.value.querySelectorAll(".card"), {
    scrollTrigger: {
      trigger: main.value,
      start: "top 80%",
    },
    y: 50, // 从下方 50px 的位置开始
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
    stagger: 0.2, // 每个卡片动画延迟0.2秒
  });
});
</script>

<style scoped>
.layout-three-column-cards { max-width: 1200px; margin: 0 auto; text-align: center; }
.main-heading { font-size: 2.8rem; margin-bottom: 3rem; font-weight: 700; color: #222; }
.cards-container { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.card { background-color: #fff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06); overflow: hidden; transition: transform 0.3s ease, box-shadow 0.3s ease; display: flex; flex-direction: column; }
.card:hover { transform: translateY(-5px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05); }
.card-image { width: 100%; height: 200px; object-fit: cover; }
.card-content { padding: 1.5rem; text-align: left; flex-grow: 1; display: flex; flex-direction: column; }
.card-heading { font-size: 1.5rem; font-weight: 600; margin-bottom: 0.75rem; color: #333; }
.card-paragraph { font-size: 1rem; color: #666; line-height: 1.6; flex-grow: 1; margin-bottom: 1rem; }
.card-button { display: inline-block; align-self: flex-start; background-color: transparent; color: var(--color-primary); padding: 8px 16px; border-radius: 5px; text-decoration: none; font-weight: bold; border: 1px solid var(--color-primary); transition: background-color 0.2s ease, color 0.2s ease; }
.card-button:hover { background-color: var(--color-primary); color: #fff; }
@media (max-width: 992px) { .cards-container { grid-template-columns: 1fr 1fr; } }
@media (max-width: 768px) { .cards-container { grid-template-columns: 1fr; } }
</style>
