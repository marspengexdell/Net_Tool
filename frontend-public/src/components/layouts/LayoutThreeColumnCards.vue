<template>
  <div class="layout-three-column-cards" ref="main">
    <!-- 渲染主标题 -->
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    
    <div class="cards-container">
      <!-- 循环渲染每一张卡片 -->
      <div v-for="(card, index) in cards" :key="index" class="card">
        <img v-if="card.image" :src="card.image" alt="Card image" class="card-image">
        <div class="card-content">
          <h3 v-if="card.heading" class="card-heading">{{ card.heading }}</h3>
          <p v-if="card.paragraph" class="card-paragraph">{{ card.paragraph }}</p>
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

// 计算属性，用于解析出主标题
const mainHeading = computed(() => {
  const blocks = props.layer.contentBlocks;
  // 约定：如果第一个内容块是标题，则它被视为主标题
  if (blocks && blocks.length > 0 && blocks[0].type === 'heading') {
    return blocks[0].value;
  }
  return null;
});

// 计算属性，用于将扁平的内容块数组重组为结构化的卡片对象数组
const cards = computed(() => {
  const result = [];
  const blocks = props.layer.contentBlocks;
  if (!blocks) return [];

  // 如果有主标题，则跳过第一个块
  const contentBlocks = mainHeading.value ? blocks.slice(1) : blocks;

  let currentCard = null;

  contentBlocks.forEach(block => {
    // 约定：每个 'heading' 类型的内容块开始一张新卡片
    if (block.type === 'heading') {
      // 如果已经有一张正在构建的卡片，先将它推入结果数组
      if (currentCard) {
        result.push(currentCard);
      }
      // 开始一张新卡片
      currentCard = { heading: block.value };
    } else if (currentCard) {
      // 将其他类型的块添加到当前卡片
      if (block.type === 'image' && !currentCard.image) {
        currentCard.image = block.value;
      } else if (block.type === 'paragraph' && !currentCard.paragraph) {
        currentCard.paragraph = block.value;
      } else if (block.type === 'button' && !currentCard.button) {
        currentCard.button = block;
      }
    }
  });

  // 不要忘记推入最后一张卡片
  if (currentCard) {
    result.push(currentCard);
  }

  return result;
});

onMounted(() => {
  // 为卡片设置交错出现的动画
  gsap.from(".card", {
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
.layout-three-column-cards {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}

.main-heading {
    font-size: 2.8rem;
    margin-bottom: 3rem;
    font-weight: 700;
    color: #222;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.card {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
}

.card-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  text-align: left;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #333;
}

.card-paragraph {
  font-size: 1rem;
  color: #666;
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: 1rem;
}

.card-button {
  display: inline-block;
  align-self: flex-start;
  background-color: transparent;
  color: var(--color-primary);
  padding: 8px 16px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  border: 1px solid var(--color-primary);
  transition: background-color 0.2s ease, color 0.2s ease;
}

.card-button:hover {
    background-color: var(--color-primary);
    color: #fff;
}

@media (max-width: 992px) {
  .cards-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }
}
</style>
