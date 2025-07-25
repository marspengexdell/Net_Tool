<template>
  <div class="layout-two-column-text" ref="main">
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    <div class="columns-container">
      <div class="column">
        <!-- 渲染第一列的内容 -->
        <div v-for="(block, index) in columnOneBlocks" :key="index" class="content-block">
          <h3 v-if="block.type === 'heading'" class="column-heading">{{ block.value }}</h3>
          <p v-else-if="block.type === 'paragraph'">{{ block.value }}</p>
        </div>
      </div>
      <div class="column">
        <!-- 渲染第二列的内容 -->
        <div v-for="(block, index) in columnTwoBlocks" :key="index" class="content-block">
          <h3 v-if="block.type === 'heading'" class="column-heading">{{ block.value }}</h3>
          <p v-else-if="block.type === 'paragraph'">{{ block.value }}</p>
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

// 将内容块智能地分配到两列中
const { mainHeading, columnOneBlocks, columnTwoBlocks } = computed(() => {
  const blocks = props.layer.contentBlocks || [];
  let heading = null;
  const content = [];

  if (blocks.length > 0 && blocks[0].type === 'heading') {
    heading = blocks[0].value;
    content.push(...blocks.slice(1));
  } else {
    content.push(...blocks);
  }

  const midPoint = Math.ceil(content.length / 2);
  return {
    mainHeading: heading,
    columnOneBlocks: content.slice(0, midPoint),
    columnTwoBlocks: content.slice(midPoint),
  };
}).value;

onMounted(() => {
  // 为两列设置入场动画
  gsap.from(main.value.querySelectorAll('.column'), {
    scrollTrigger: {
      trigger: main.value,
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
    stagger: 0.2,
  });
});
</script>

<style scoped>
.layout-two-column-text {
  max-width: 1200px;
  margin: 0 auto;
}

.main-heading {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 3rem;
  font-weight: 700;
}

.columns-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
}

.column {
  font-size: 1.1rem;
  color: #555;
  line-height: 1.8;
}

.column-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.column p {
  margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
  .columns-container {
    grid-template-columns: 1fr;
  }
}
</style>
