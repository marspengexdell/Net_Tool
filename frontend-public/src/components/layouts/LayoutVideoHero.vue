<template>
  <div class="layout-video-hero">
    <!-- 视频背景 -->
    <video
      v-if="fullVideoUrl"
      class="background-video"
      :src="fullVideoUrl"
      autoplay
      loop
      muted
      playsinline
    ></video>
    
    <!-- 半透明覆盖层，增强文字可读性 -->
    <div class="video-overlay"></div>

    <!-- 居中的内容 -->
    <div class="content-container">
      <div v-for="(block, index) in overlayBlocks" :key="index" class="content-block">
        <h1 v-if="block.type === 'heading'" class="hero-heading">{{ block.value }}</h1>
        <p v-else-if="block.type === 'paragraph'" class="hero-paragraph">{{ block.value }}</p>
        <a v-else-if="block.type === 'button'" :href="block.link" class="hero-button">{{ block.value }}</a>
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

// 新增：获取后端服务的基地址
const backendUrl = import.meta.env.VITE_API_PUBLIC_BASE_URL ? import.meta.env.VITE_API_PUBLIC_BASE_URL.replace('/api/public', '') : 'http://localhost:5001';

// 修正：计算属性现在会生成完整的视频 URL
const fullVideoUrl = computed(() => {
  const videoBlock = props.layer.contentBlocks.find(block => block.type === 'video');
  let videoPath = null;

  if (videoBlock) {
    videoPath = videoBlock.value;
  } else if (props.layer.backgroundVideoUrl) {
    // 作为备用方案，仍然检查旧的 backgroundVideoUrl 字段
    videoPath = props.layer.backgroundVideoUrl;
  }

  if (videoPath) {
    // 如果是上传的视频（以 /uploads 开头），则拼接完整 URL
    if (videoPath.startsWith('/uploads')) {
      return `${backendUrl}${videoPath}`;
    }
    // 如果是外部 URL (例如 https://...)，则直接返回
    return videoPath;
  }
  
  return null; // 如果没有找到视频，则返回 null
});

// 计算属性：获取所有用于覆盖显示的非视频内容块
const overlayBlocks = computed(() => {
  return props.layer.contentBlocks.filter(block => block.type !== 'video');
});
</script>

<style scoped>
.layout-video-hero { position: relative; height: 100vh; width: 100%; display: flex; align-items: center; justify-content: center; overflow: hidden; color: #fff; }
.background-video { position: absolute; top: 50%; left: 50%; min-width: 100%; min-height: 100%; width: auto; height: auto; z-index: 1; transform: translateX(-50%) translateY(-50%); object-fit: cover; }
.video-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 2; }
.content-container { position: relative; z-index: 3; text-align: center; padding: 2rem; max-width: 800px; }
.hero-heading { font-size: 4rem; font-weight: 700; margin-bottom: 1rem; text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7); animation: fadeInDown 1s ease-out; }
.hero-paragraph { font-size: 1.25rem; margin-bottom: 2rem; text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7); animation: fadeInUp 1s ease-out 0.5s; animation-fill-mode: backwards; }
.hero-button { display: inline-block; background-color: var(--color-primary); color: #fff; padding: 14px 28px; border-radius: 5px; text-decoration: none; font-weight: bold; transition: transform 0.2s ease, box-shadow 0.2s ease; animation: fadeInUp 1s ease-out 1s; animation-fill-mode: backwards; }
.hero-button:hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); }
@keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
</style>
