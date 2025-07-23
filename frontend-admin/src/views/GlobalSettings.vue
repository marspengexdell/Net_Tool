<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>全局设置</span>
        </div>
      </template>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="120px" v-loading="loading">
        <el-form-item label="Logo URL" prop="logoUrl">
          <el-input v-model="form.logoUrl" placeholder="https://example.com/logo.png" />
        </el-form-item>
        <el-form-item label="字体" prop="fontFamily">
          <el-input v-model="form.fontFamily" placeholder="例如: Arial, sans-serif" />
        </el-form-item>
        <el-form-item label="主色调" prop="primaryColor">
          <el-color-picker v-model="form.primaryColor" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSubmit">保存</el-button>
        </el-form-item>
      </el-form>
      <el-alert v-if="error" type="error" :title="error" show-icon class="error-alert" />
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus';
import { getSettings, updateSettings } from '../services/settings.service.js';

const formRef = ref(null);
const form = ref({ logoUrl: '', fontFamily: '', primaryColor: '' });
const loading = ref(false);
const error = ref('');

const rules = {
  logoUrl: [{ required: true, message: '请输入 Logo URL', trigger: 'blur' }],
  fontFamily: [{ required: true, message: '请输入字体', trigger: 'blur' }],
  primaryColor: [{ required: true, message: '请选择颜色', trigger: 'change' }],
};

const fetchSettings = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await getSettings();
    if (res.data && res.data.success) {
      form.value = res.data.data;
    } else {
      throw new Error(res.data.message || '获取设置失败');
    }
  } catch (err) {
    error.value = err.message || '获取设置失败';
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate(async (valid) => {
    if (!valid) return;
    try {
      const res = await updateSettings(form.value);
      if (res.data && res.data.success) {
        ElMessage.success('保存成功！');
        fetchSettings();
      } else {
        throw new Error(res.data.message || '保存失败');
      }
    } catch (err) {
      ElMessage.error(err.message || '保存失败');
    }
  });
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
.error-alert {
  margin-top: 20px;
}
</style>
