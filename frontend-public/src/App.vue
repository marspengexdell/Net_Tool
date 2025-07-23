<template>
  <!-- 这个 style 标签会根据后端数据动态注入 CSS 变量 -->
  <component :is="'style'">{{ dynamicStyles }}</component>

  <div id="page-wrapper">
    <!-- 全屏加载指示器 -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p>正在加载网站...</p>
    </div>

    <!-- 全屏错误信息 -->
    <div v-if="error" class="error-overlay">
      <h2>加载网站数据时出错</h2>
      <p>{{ error }}</p>
      <button @click="fetchPublicData">重试</button>
    </div>

    <!-- 网站实际内容 -->
    <template v-if="data">
      <header class="site-header">
        <div class="logo-container">
          <img v-if="data.settings.logoUrl" :src="data.settings.logoUrl" alt="Website Logo" class="logo-image">
          <span v-else class="logo-text">My Awesome Site</span>
        </div>
        <nav class="site-nav">
          <ul>
            <li v-for="item in data.menuItems" :key="item._id">
              <a :href="item.link">{{ item.title }}</a>
            </li>
          </ul>
        </nav>
      </header>

      <main class="site-main">
        <!-- 动态渲染所有层级 -->
        <!-- 这里是您“Layered Layout”魔法发生的地方 -->
        <section v-for="layer in data.layers" :key="layer._id" class="layer-section">
          <div class="layer-content-wrapper">
            <!-- 
              这里只是一个基础的渲染，
              未来我们会根据 layer.layout 创建更复杂的动态组件来展示层叠效果。
            -->
            <h2>{{ layer.name }}</h2>
            <div v-for="(block, index) in layer.contentBlocks" :key="index" class="content-block">
              <p v-if="block.type === 'paragraph'">{{ block.value }}</p>
              <h3 v-if="block.type === 'heading'" class="content-heading">{{ block.value }}</h3>
              <img v-if="block.type === 'image'" :src="block.value" alt="Layer Image" class="content-image">
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
// 我们将在下一步创建 apiClient.js
import apiClient from './services/apiClient'; 

const loading = ref(true);
const error = ref(null);
const data = ref(null);

// 获取所有公共数据的方法
const fetchPublicData = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await apiClient.get('/data');
    if (response.data && response.data.success) {
      data.value = response.data.data;
    } else {
      throw new Error(response.data.message || '获取公共数据失败。');
    }
  } catch (err) {
    console.error('Error fetching public data:', err);
    error.value = err.message || '发生未知错误。';
  } finally {
    loading.value = false;
  }
};

// 计算属性，用于根据后端设置动态生成 CSS
const dynamicStyles = computed(() => {
  if (!data.value || !data.value.settings) return '';
  
  const { fontFamily, primaryColor } = data.value.settings;
  
  // 返回一个包含 CSS 变量的 style 块
  return `
    :root {
      --font-family-base: ${fontFamily || "'Inter', sans-serif"};
      --color-primary: ${primaryColor || '#3B82F6'};
    }
  `;
});

// Vue 组件挂载后，执行数据获取
onMounted(() => {
  fetchPublicData();
});
</script>

<style scoped>
/* App.vue 的局部样式 */
.loading-overlay, .error-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  z-index: 9999;
  text-align: center;
}

.error-overlay h2 {
  color: #D32F2F;
  margin-bottom: 1rem;
}

.error-overlay button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid var(--color-primary);
    background-color: var(--color-primary);
    color: white;
    border-radius: 4px;
    cursor: pointer;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border-left-color: var(--color-primary);
  animation: spin 1s ease infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: #fff;
  border-bottom: 1px solid #eaeaea;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.logo-image {
  max-height: 40px;
}
.logo-text {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--color-primary);
}

.site-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2rem;
}

.site-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s ease;
}

.site-nav a:hover {
  color: var(--color-primary);
}

.layer-section {
  padding: 5rem 5%;
}

.layer-section:nth-child(even) {
  background-color: #f7f7f7;
}

.layer-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

.content-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin-top: 1rem;
}

.site-footer {
  text-align: center;
  padding: 2rem 5%;
  background: #222;
  color: #aaa;
}
</style>
