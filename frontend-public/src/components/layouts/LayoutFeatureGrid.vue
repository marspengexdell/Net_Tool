<template>
  <div class="layout-feature-grid" ref="main">
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    <div class="grid-container">
      <div v-for="(feature, index) in features" :key="index" class="feature-card">
        <div class="icon-wrapper">
          <img :src="feature.icon" alt="Feature Icon" class="feature-icon">
        </div>
        <h3 v-if="feature.heading" class="feature-heading">{{ feature.heading }}</h3>
        <p v-if="feature.paragraph" class="feature-paragraph">{{ feature.paragraph }}</p>
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

const mainHeading = computed(() => {
  const blocks = props.layer.contentBlocks;
  if (blocks && blocks.length > 0 && blocks[0].type === 'heading') {
    return blocks[0].value;
  }
  return null;
});

const features = computed(() => {
  const result = [];
  const blocks = props.layer.contentBlocks;
  if (!blocks) return [];

  const contentBlocks = mainHeading.value ? blocks.slice(1) : blocks;
  let currentFeature = null;

  contentBlocks.forEach(block => {
    if (block.type === 'image') {
      if (currentFeature) result.push(currentFeature);
      const imageUrl = block.value.startsWith('/uploads') ? `${backendUrl}${block.value}` : block.value;
      currentFeature = { icon: imageUrl };
    } else if (currentFeature) {
      if (block.type === 'heading' && !currentFeature.heading) {
        currentFeature.heading = block.value;
      } else if (block.type === 'paragraph' && !currentFeature.paragraph) {
        currentFeature.paragraph = block.value;
      }
    }
  });

  if (currentFeature) result.push(currentFeature);
  return result;
});

onMounted(() => {
  gsap.from(main.value.querySelectorAll(".feature-card"), {
    scrollTrigger: {
      trigger: main.value,
      start: "top 85%",
    },
    y: 40,
    opacity: 0,
    duration: 0.5,
    ease: "power2.out",
    stagger: 0.15,
  });
});
</script>

<style scoped>
.layout-feature-grid {
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
}
.main-heading {
  font-size: 2.8rem;
  margin-bottom: 3rem;
  font-weight: 700;
}
.grid-container {
  display: grid;
  /* 响应式网格：列数会自动调整 */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2.5rem;
}
.feature-card {
  text-align: left;
}
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background-color: var(--color-primary);
  border-radius: 12px;
  margin-bottom: 1.5rem;
  /* 使用 mask 来让任何图片都变成单色图标 */
  -webkit-mask-size: 60%;
  -webkit-mask-position: center;
  -webkit-mask-repeat: no-repeat;
  mask-size: 60%;
  mask-position: center;
  mask-repeat: no-repeat;
}
.feature-icon {
  width: 100%;
  height: 100%;
  background-color: white; /* 这是图标最终显示的颜色 */
  -webkit-mask-image: var(--icon-url);
  mask-image: var(--icon-url);
}
.feature-heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.feature-paragraph {
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
}
</style>
