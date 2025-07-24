<template>
  <div class="page-container">
    <el-card v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>全局设置</span>
          <el-button type="primary" @click="handleSave" :disabled="loading">
            <el-icon class="el-icon--left"><Select /></el-icon>
            保存设置
          </el-button>
        </div>
      </template>

      <el-alert
        v-if="error"
        :title="'数据加载失败: ' + error"
        type="error"
        show-icon
        :closable="false"
        class="error-alert"
      />
      
      <el-form :model="form" label-width="120px" class="settings-form">
        <el-form-item label="Logo 图片 URL">
          <el-input v-model="form.logoUrl" placeholder="请输入网站 Logo 的图片链接"></el-input>
        </el-form-item>
        <el-form-item label="全局字体">
          <el-input v-model="form.fontFamily" placeholder="例如：'Inter', sans-serif"></el-input>
          <div class="form-tip">
            请输入有效的 CSS font-family 值。
          </div>
        </el-form-item>
        <el-form-item label="主题颜色">
          <el-color-picker v-model="form.primaryColor" show-alpha />
          <div class="form-tip">
            选择一个颜色作为网站的主题色。
          </div>
        </el-form-item>
      </el-form>

    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getSettings, updateSettings } from '../services/settings.service.js';
import { Select } from '@element-plus/icons-vue';

const loading = ref(true);
const error = ref(null);
const form = ref({
  logoUrl: '',
  fontFamily: '',
  primaryColor: '',
});

// 获取当前设置
const fetchSettings = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await getSettings();
    if (response.data && response.data.success) {
      form.value = response.data.data;
    } else {
      throw new Error(response.data.message || '获取设置失败');
    }
  } catch (err) {
    console.error('Error fetching settings:', err);
    error.value = err.message || '发生未知错误';
  } finally {
    loading.value = false;
  }
};

// 保存设置
const handleSave = async () => {
  loading.value = true;
  try {
    const response = await updateSettings(form.value);
    if (response.data && response.data.success) {
      ElMessage.success('设置已成功保存！');
    } else {
      throw new Error(response.data.message || '保存设置失败');
    }
  } catch (err) {
    console.error('Error saving settings:', err);
    ElMessage.error(err.message || '保存时发生错误');
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchSettings();
});
</script>

<style scoped>
.page-container {
  padding: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.settings-form {
  max-width: 600px;
}
.form-tip {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 4px;
}
.error-alert {
  margin-bottom: 20px;
}
</style>
