<template>
  <div class="layout-full-width-image" ref="main">
    <div class="image-container">
      <img :src="fullImageUrl" alt="Full Width Image" class="full-width-image">
      <div v-if="getOverlayText()" class="overlay-content">
        <h2 v-if="getOverlayText().heading" class="overlay-heading">{{ getOverlayText().heading }}</h2>
        <p v-if="getOverlayText().paragraph" class="overlay-paragraph">{{ getOverlayText().paragraph }}</p>
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
  return 'https://placehold.co/1920x1080/e2e8f0/adb5bd?text=Full+Width+Image';
});

const getOverlayText = () => {
  const heading = props.layer.contentBlocks.find(block => block.type === 'heading')?.value;
  const paragraph = props.layer.contentBlocks.find(block => block.type === 'paragraph')?.value;
  if (heading || paragraph) {
    return { heading, paragraph };
  }
  return null;
};

onMounted(() => {
  gsap.from(main.value.querySelector('.full-width-image'), {
    scrollTrigger: { trigger: main.value, start: "top 80%" },
    scale: 1.1, opacity: 0, duration: 1.2, ease: "power3.out",
  });
  gsap.from(main.value.querySelector('.overlay-content'), {
    scrollTrigger: { trigger: main.value, start: "top 70%" },
    y: 30, opacity: 0, duration: 1, ease: "power3.out",
  });
});
</script>

<style scoped>
.layout-full-width-image { width: 100vw; position: relative; left: 50%; right: 50%; margin-left: -50vw; margin-right: -50vw; }
.image-container { position: relative; width: 100%; height: 60vh; overflow: hidden; }
.full-width-image { width: 100%; height: 100%; object-fit: cover; }
.overlay-content { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; color: #fff; background: rgba(0, 0, 0, 0.4); padding: 2rem; }
.overlay-heading { font-size: 3.5rem; font-weight: 700; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); }
.overlay-paragraph { font-size: 1.2rem; max-width: 600px; margin-top: 1rem; text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); }
</style>
