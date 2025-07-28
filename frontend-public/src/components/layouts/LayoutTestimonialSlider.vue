<template>
  <div class="layout-testimonial-slider" ref="main">
    <h2 v-if="mainHeading" class="main-heading">{{ mainHeading }}</h2>
    
    <swiper
      :modules="[Navigation, Pagination, Autoplay]"
      :slides-per-view="1"
      :space-between="30"
      :loop="true"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :pagination="{ clickable: true }"
      :navigation="true"
      class="testimonial-swiper"
    >
      <swiper-slide v-for="(testimonial, index) in testimonials" :key="index">
        <div class="testimonial-card">
          <img :src="testimonial.avatar" alt="Client Avatar" class="avatar">
          <p class="quote">"{{ testimonial.quote }}"</p>
          <div class="author">
            <span class="name">{{ testimonial.name }}</span>
            <span v-if="testimonial.title" class="title">{{ testimonial.title }}</span>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
// 导入 Swiper Vue 组件和所需模块
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// 导入 Swiper 样式
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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

const testimonials = computed(() => {
  const result = [];
  const blocks = props.layer.contentBlocks;
  if (!blocks) return [];

  const contentBlocks = mainHeading.value ? blocks.slice(1) : blocks;
  let currentTestimonial = {};

  contentBlocks.forEach(block => {
    switch(block.type) {
      case 'image':
        if (currentTestimonial.avatar) {
          result.push(currentTestimonial);
          currentTestimonial = {};
        }
        currentTestimonial.avatar = block.value.startsWith('/uploads') ? `${backendUrl}${block.value}` : block.value;
        break;
      case 'paragraph':
        currentTestimonial.quote = block.value;
        break;
      case 'heading':
        // 约定：第一个 heading 是名字，第二个是职位
        if (!currentTestimonial.name) {
          currentTestimonial.name = block.value;
        } else if (!currentTestimonial.title) {
          currentTestimonial.title = block.value;
        }
        break;
    }
  });

  if (Object.keys(currentTestimonial).length > 0) {
    result.push(currentTestimonial);
  }
  return result;
});
</script>

<style>
/* 将 Swiper 的样式放在非 scoped 的 style 标签中，以确保能正确应用 */
.layout-testimonial-slider {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 0;
}

.main-heading {
  text-align: center;
  font-size: 2.8rem;
  margin-bottom: 3rem;
  font-weight: 700;
}

.testimonial-swiper {
  padding-bottom: 60px !important; /* 为分页器留出空间 */
}

.testimonial-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 0 40px;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.quote {
  font-size: 1.25rem;
  font-style: italic;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.author {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 600;
  font-size: 1.1rem;
}

.title {
  font-size: 0.9rem;
  color: #777;
}

/* 自定义 Swiper 导航按钮和分页器颜色 */
.testimonial-swiper .swiper-button-next,
.testimonial-swiper .swiper-button-prev {
  color: var(--color-primary);
}

.testimonial-swiper .swiper-pagination-bullet-active {
  background-color: var(--color-primary);
}
</style>
