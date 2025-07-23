<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">后台登录</h2>
      <el-form :model="form" @submit.prevent="handleSubmit">
        <el-form-item label="邮箱">
          <el-input v-model="form.email" autocomplete="email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" autocomplete="current-password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="handleSubmit" :loading="loading">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';
// 注意：这些文件需要被正确创建和配置才能使登录功能正常工作
// import apiClient from '../services/apiClient';
// import { useAuthStore } from '../store/modules/auth';

const router = useRouter();
// const authStore = useAuthStore();
const form = reactive({ email: '', password: '' });
const loading = ref(false);

const handleSubmit = async () => {
  loading.value = true;
  ElMessage.info('登录功能需要后端和状态管理支持。');
  // 模拟一个延时
  setTimeout(() => {
    loading.value = false;
  }, 1500);

  // 真实的API调用逻辑（暂时注释）
  /*
  try {
    const res = await apiClient.post('/auth/login', form);
    if (res.data && res.data.token) {
      authStore.setToken(res.data.token);
      ElMessage.success('登录成功');
      router.push('/layers');
    }
  } catch (err) {
    ElMessage.error(err.response?.data?.message || '登录失败');
  } finally {
    loading.value = false;
  }
  */
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* 调整为100%以适应主内容区 */
  width: 100%;
  box-sizing: border-box;
}
.login-card {
  width: 400px;
}
.title {
  text-align: center;
  margin-bottom: 20px;
}
</style>
