<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>表单管理</span>
          <el-button type="primary" :icon="Plus" @click="handleCreate">新建表单</el-button>
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
        <el-table-column prop="name" label="表单名称" />
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

    <form-form
      :visible="isFormVisible"
      :initial-data="editingForm"
      @close="handleFormClose"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getForms, deleteForm, createForm, updateForm } from '../services/forms.service.js';
import FormForm from '../components/FormForm.vue';

const loading = ref(true);
const tableData = ref([]);
const error = ref(null);
const isFormVisible = ref(false);
const editingForm = ref(null);

const fetchForms = async () => {
  loading.value = true;
  error.value = null;
  try {
    const res = await getForms();
    if (res.data && res.data.success) {
      tableData.value = res.data.data;
    } else {
      throw new Error(res.data.message || 'Failed to fetch');
    }
  } catch (err) {
    console.error('Error fetching forms:', err);
    error.value = err.message || 'Unknown error';
  } finally {
    loading.value = false;
  }
};

const handleCreate = () => {
  editingForm.value = { fields: [], isEnabled: true };
  isFormVisible.value = true;
};

const handleEdit = (row) => {
  editingForm.value = { ...row };
  isFormVisible.value = true;
};

const handleFormClose = () => {
  isFormVisible.value = false;
  editingForm.value = null;
};

const handleFormSubmit = async (data) => {
  try {
    let response;
    if (data._id) {
      response = await updateForm(data._id, data);
    } else {
      response = await createForm(data);
    }
    if (response.data && response.data.success) {
      ElMessage.success(data._id ? '更新成功！' : '创建成功！');
      handleFormClose();
      fetchForms();
    } else {
      throw new Error(response.data.message || '操作失败');
    }
  } catch (err) {
    console.error('Error submitting form:', err);
    ElMessage.error(err.message || '提交时发生错误');
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `您确定要删除表单 "${row.name}" 吗？此操作无法撤销。`,
    '警告',
    { confirmButtonText: '确定删除', cancelButtonText: '取消', type: 'warning' }
  )
    .then(async () => {
      try {
        const response = await deleteForm(row._id);
        if (response.data && response.data.success) {
          ElMessage.success('删除成功！');
          fetchForms();
        } else {
          throw new Error(response.data.message || '删除失败');
        }
      } catch (err) {
        console.error('Error deleting form:', err);
        ElMessage.error(err.message || '删除时发生错误');
      }
    })
    .catch(() => {
      ElMessage.info('已取消删除');
    });
};

const formatDateTime = (isoString) => {
  if (!isoString) return 'N/A';
  const date = new Date(isoString);
  return date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
};

onMounted(() => {
  fetchForms();
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
