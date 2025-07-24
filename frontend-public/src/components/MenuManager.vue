<template>
  <div class="page-container">
    <el-card v-loading="loading">
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" :icon="Plus" @click="handleCreate">新建菜单项</el-button>
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

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="菜单标题" width="200" />
        <el-table-column prop="link" label="链接" />
        <el-table-column prop="order" label="排序" width="100" sortable />
        <el-table-column label="状态" width="100">
          <template #default="scope">
            <el-tag :type="scope.row.isEnabled ? 'success' : 'info'">
              {{ scope.row.isEnabled ? '已启用' : '已禁用' }}
            </el-tag>
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

    <!-- 菜单项表单弹窗 -->
    <menu-item-form
      :visible="isFormVisible"
      :initial-data="editingItem"
      @close="handleFormClose"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getMenuItems, createMenuItem, updateMenuItem, deleteMenuItem } from '../services/menu.service.js';
import MenuItemForm from '../components/MenuItemForm.vue';

const loading = ref(true);
const tableData = ref([]);
const error = ref(null);
const isFormVisible = ref(false);
const editingItem = ref(null);

// --- 表单操作 ---
const handleCreate = () => {
  editingItem.value = null; // 清空数据表示新建
  isFormVisible.value = true;
};

const handleEdit = (row) => {
  editingItem.value = { ...row };
  isFormVisible.value = true;
};

const handleFormClose = () => {
  isFormVisible.value = false;
  editingItem.value = null;
};

const handleFormSubmit = async (formData) => {
  try {
    if (formData._id) {
      await updateMenuItem(formData._id, formData);
      ElMessage.success('更新成功！');
    } else {
      await createMenuItem(formData);
      ElMessage.success('创建成功！');
    }
    handleFormClose();
    fetchMenuItems();
  } catch (err) {
    ElMessage.error('操作失败: ' + (err.response?.data?.message || err.message));
  }
};

// --- 数据获取与删除 ---
const fetchMenuItems = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await getMenuItems();
    tableData.value = response.data.data;
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `您确定要删除菜单项 "${row.title}" 吗？`, '警告',
    { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {
    try {
      await deleteMenuItem(row._id);
      ElMessage.success('删除成功！');
      fetchMenuItems();
    } catch (err) {
      ElMessage.error('删除失败: ' + (err.response?.data?.message || err.message));
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

onMounted(() => {
  fetchMenuItems();
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
