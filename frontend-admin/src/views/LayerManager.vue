<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>层级管理</span>
          <el-button type="primary" :icon="Plus" @click="handleCreate">新建层级</el-button>
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

      <el-table :data="tableData" style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="层级名称" width="180" />
        <el-table-column prop="layout" label="布局类型" width="180" />
        <el-table-column prop="order" label="排序" width="100" sortable />
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.isEnabled ? 'success' : 'info'">
              {{ scope.row.isEnabled ? '已启用' : '已禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="最后更新" width="200">
          <template #default="scope">
            {{ formatDateTime(scope.row.updatedAt) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑属性</el-button>
            <el-button size="small" @click="handleEditContent(scope.row)">编辑内容</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 层级属性表单 -->
    <layer-form
      :visible="isFormVisible"
      :initial-data="editingLayer"
      @close="handleFormClose"
      @submit="handleFormSubmit"
    />
    <!-- 层级内容编辑器 -->
    <layer-content-editor
      :visible="isEditorVisible"
      :layer="editingContentLayer"
      @close="handleEditorClose"
      @save="handleEditorSave"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getLayers, deleteLayer, createLayer, updateLayer } from '../services/layers.service.js';

import LayerForm from '../components/LayerForm.vue';
import LayerContentEditor from '../components/LayerContentEditor.vue';

const loading = ref(true);
const tableData = ref([]);
const error = ref(null);
const isFormVisible = ref(false);
const editingLayer = ref(null);
const isEditorVisible = ref(false);
const editingContentLayer = ref(null);

// --- 属性表单操作 ---
const handleCreate = () => {
  editingLayer.value = null;
  isFormVisible.value = true;
};

const handleEdit = (row) => {
  editingLayer.value = { ...row };
  isFormVisible.value = true;
};

const handleFormClose = () => {
  isFormVisible.value = false;
  editingLayer.value = null;
};

const handleFormSubmit = async (formData) => {
  try {
    const response = formData._id ? await updateLayer(formData._id, formData) : await createLayer(formData);
    if (response.data && response.data.success) {
      ElMessage.success(formData._id ? '更新成功！' : '创建成功！');
      handleFormClose();
      fetchLayers();
    } else {
      throw new Error(response.data.message || '操作失败');
    }
  } catch (err) {
    ElMessage.error(err.message || '提交时发生错误');
  }
};

// --- 内容编辑器操作 ---
const handleEditContent = (row) => {
  editingContentLayer.value = { ...row };
  isEditorVisible.value = true;
};

const handleEditorClose = () => {
  isEditorVisible.value = false;
  editingContentLayer.value = null;
};

const handleEditorSave = async (blocks) => {
  if (!editingContentLayer.value) return;
  const payload = { ...editingContentLayer.value, contentBlocks: blocks };
  try {
    const response = await updateLayer(editingContentLayer.value._id, payload);
    if (response.data && response.data.success) {
      ElMessage.success('内容已保存');
      fetchLayers();
    } else {
      throw new Error(response.data.message || '保存失败');
    }
  } catch (err) {
    ElMessage.error(err.message || '保存时发生错误');
  }
  handleEditorClose();
};

// --- 数据获取与删除 ---
const fetchLayers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await getLayers();
    tableData.value = response.data.data;
  } catch (err) {
    error.value = err.message || 'An unknown error occurred.';
  } finally {
    loading.value = false;
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `您确定要删除层级 "${row.name || '无名称'}" 吗？`, '警告',
    { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {
    try {
      await deleteLayer(row._id);
      ElMessage.success('删除成功！');
      fetchLayers();
    } catch (err) {
      ElMessage.error(err.message || '删除时发生错误');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  return new Date(isoString).toLocaleString('zh-CN');
};

onMounted(() => {
  fetchLayers();
});
</script>

<style scoped>
.page-container { padding: 20px; }
.card-header { display: flex; justify-content: space-between; align-items: center; }
.error-alert { margin-bottom: 20px; }
</style>
