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
        <!-- 
          使用 v-for 循环渲染 DynamicLayer 组件，
          将每个 layer 对象作为 prop 传递给它。
        -->
        <DynamicLayer
          v-for="layer in data.layers"
          :key="layer._id"
          :layer="layer"
        />
      </main>

      <footer class="site-footer">
        <p>&copy; 2025 Your Company Name. All Rights Reserved.</p>
      </footer>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import apiClient from './services/apiClient'; 
// 导入我们新创建的动态层级组件
import DynamicLayer from './components/DynamicLayer.vue';

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
  border-bottom: 1px solid #eaeaea;
}

.logo-image {
  max-height: 40px;
}
.logo-text {
  font-weight: bold;
  color: var(--color-primary);
}

.site-nav ul {
  list-style: none;
  display: flex;
  gap: 2rem;
}

.site-nav a {
  text-decoration: none;
  color: #333;
}

.site-footer {
  text-align: center;
  padding: 2rem 5%;
  background: #222;
  color: #aaa;
}
</style>
