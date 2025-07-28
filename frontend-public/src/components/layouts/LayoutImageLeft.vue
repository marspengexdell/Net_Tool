<template>
  <div class="layout-image-left" ref="main">
    <div class="image-column" ref="imageCol">
      <img :src="fullImageUrl" alt="Layout Feature Image" class="layout-image">
    </div>
    <div class="text-column" ref="textCol">
      <div v-for="(block, index) in getTextBlocks()" :key="index" class="content-block">
        <h2 v-if="block.type === 'heading'" class="content-heading">{{ block.value }}</h2>
        <p v-else-if="block.type === 'paragraph'" class="content-paragraph">{{ block.value }}</p>
        <a v-else-if="block.type === 'button'" :href="block.link" class="content-button">{{ block.value }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
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

// 修正：使用正确的环境变量 VITE_API_PUBLIC_BASE_URL，并添加备用值
const backendUrl = import.meta.env.VITE_API_PUBLIC_BASE_URL ? import.meta.env.VITE_API_PUBLIC_BASE_URL.replace('/api/public', '') : 'http://localhost:5001';

const fullImageUrl = computed(() => {
  const imageBlock = props.layer.contentBlocks.find(block => block.type === 'image');
  if (imageBlock && imageBlock.value) {
    if (imageBlock.value.startsWith('/uploads')) {
      return `${backendUrl}${imageBlock.value}`;
    }
    return imageBlock.value;
  }
  return 'https://placehold.co/600x450/e2e8f0/adb5bd?text=Image';
});

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: main.value,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  });

  tl.from(imageCol.value, { 
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    })
    .from(textCol.value, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
    }, '-=0.5');
});

const getTextBlocks = () => {
  return props.layer.contentBlocks.filter(block => block.type !== 'image');
};
</script>

<style scoped>
.layout-image-left { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: 3rem; max-width: 1200px; margin: 0 auto; }
.image-column { position: relative; }
.layout-image { width: 100%; border-radius: 12px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); transform: rotate(-3deg); transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }
.layout-image-left:hover .layout-image { transform: rotate(0deg) scale(1.05); }
.text-column { padding: 1rem; }
.content-heading { font-size: 2.5rem; margin-bottom: 1rem; font-weight: 700; color: #222; }
.content-paragraph { font-size: 1.1rem; color: #555; line-height: 1.8; margin-bottom: 1.5rem; }
.content-button { display: inline-block; background-color: var(--color-primary); color: #fff; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold; transition: transform 0.2s ease, box-shadow 0.2s ease; }
.content-button:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); }
@media (max-width: 768px) {
  .layout-image-left { grid-template-columns: 1fr; gap: 2rem; }
  .layout-image { transform: rotate(0deg); }
}
</style>
