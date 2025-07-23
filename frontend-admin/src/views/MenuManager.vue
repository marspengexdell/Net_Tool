<template>
  <div class="page-container">
    <el-card>
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
        </div>
      </template>
      <div class="toolbar">
        <el-button type="primary" :icon="Plus" @click="handleCreate">新建菜单项</el-button>
      </div>
      <el-alert v-if="error" :title="'数据加载失败: ' + error" type="error" show-icon class="error-alert" />
      <el-table :data="tableData" v-loading="loading" style="width:100%">
        <el-table-column prop="title" label="标题" width="180" />
        <el-table-column prop="link" label="链接" />
        <el-table-column prop="order" label="排序" width="80" sortable />
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

      <menu-item-form
        :visible="isFormVisible"
        :initial-data="editingItem"
        @close="handleFormClose"
        @submit="handleFormSubmit"
      />
    </el-card>
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
const error = ref('');

const isFormVisible = ref(false);
const editingItem = ref(null);

const fetchItems = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await getMenuItems();
    if (res.data && res.data.success) {
      tableData.value = res.data.data;
    } else {
      throw new Error(res.data.message || '加载失败');
    }
  } catch (err) {
    error.value = err.message || '加载失败';
  } finally {
    loading.value = false;
  }
};

const handleCreate = () => {
  editingItem.value = { order: 0, isEnabled: true };
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

const handleFormSubmit = async (data) => {
  try {
    let res;
    if (data._id) {
      res = await updateMenuItem(data._id, data);
    } else {
      res = await createMenuItem(data);
    }
    if (res.data && res.data.success) {
      ElMessage.success('保存成功！');
      handleFormClose();
      fetchItems();
    } else {
      throw new Error(res.data.message || '保存失败');
    }
  } catch (err) {
    ElMessage.error(err.message || '保存失败');
  }
};

const handleDelete = (row) => {
  ElMessageBox.confirm(
    `确定删除菜单项 "${row.title}" 吗？`,
    '警告',
    { confirmButtonText: '删除', cancelButtonText: '取消', type: 'warning' }
  ).then(async () => {
    try {
      const res = await deleteMenuItem(row._id);
      if (res.data && res.data.success) {
        ElMessage.success('删除成功！');
        fetchItems();
      } else {
        throw new Error(res.data.message || '删除失败');
      }
    } catch (err) {
      ElMessage.error(err.message || '删除失败');
    }
  }).catch(() => {
    ElMessage.info('已取消删除');
  });
};

const formatDateTime = (iso) => {
  if (!iso) return 'N/A';
  const date = new Date(iso);
  return date.toLocaleString('zh-CN', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
    hour12: false
  });
};

onMounted(() => {
  fetchItems();
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
.toolbar {
  margin-bottom: 15px;
}
.error-alert {
  margin-bottom: 20px;
}
</style>
