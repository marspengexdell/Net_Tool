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
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="scope">
            <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增：层级表单弹窗 -->
    <layer-form
      :visible="isFormVisible"
      :initial-data="editingLayer"
      @close="handleFormClose"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getLayers, deleteLayer, createLayer, updateLayer } from '../services/layers.service.js';

// 导入表单组件
import LayerForm from '../components/LayerForm.vue';

// 响应式状态
const loading = ref(true);
const tableData = ref([]);
const error = ref(null);
const isFormVisible = ref(false);
const editingLayer = ref(null);

// --- 表单操作 ---
const handleCreate = () => {
  editingLayer.value = { order: 0, isEnabled: true }; // 提供默认值
  isFormVisible.value = true;
};

const handleEdit = (row) => {
  editingLayer.value = { ...row }; // 传递副本以避免直接修改表格数据
  isFormVisible.value = true;
};

const handleFormClose = () => {
  isFormVisible.value = false;
  editingLayer.value = null;
};

const handleFormSubmit = async (formData) => {
  try {
    let response;
    // 判断是创建还是更新
    if (formData._id) {
      response = await updateLayer(formData._id, formData);
    } else {
      response = await createLayer(formData);
    }

    if (response.data && response.data.success) {
      ElMessage.success(formData._id ? '更新成功！' : '创建成功！');
      handleFormClose();
      fetchLayers(); // 刷新表格数据
    } else {
      throw new Error(response.data.message || '操作失败');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    ElMessage.error(err.message || '提交时发生错误');
  }
};


// --- 数据获取与删除 ---
const fetchLayers = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await getLayers();
    if (response.data && response.data.success) {
      tableData.value = response.data.data;
    } else {
      throw new Error(response.data.message || 'Failed to fetch data');
    }
  } catch (err) {
    console.error('Error fetching layers:', err);
    error.value = err.message || 'An unknown error occurred.';
  } finally {
    loading.value = false;
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `您确定要删除层级 "${row.name}" 吗？此操作无法撤销。`, '警告',
    { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {
    try {
      const response = await deleteLayer(row._id); 
      if (response.data && response.data.success) {
        ElMessage.success('删除成功！');
        fetchLayers();
      } else {
        throw new Error(response.data.message || '删除失败');
      }
    } catch (err) {
      console.error('Error deleting layer:', err);
      ElMessage.error(err.message || '删除时发生错误');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
};

onMounted(() => {
  fetchLayers();
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
  margin-bottom: 20px;
}
</style>
