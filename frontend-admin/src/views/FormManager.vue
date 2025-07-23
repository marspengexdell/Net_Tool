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

    <!-- 
      修复：暂时将这个尚未创建的组件注释掉，以防止白屏错误。
      <FormForm
        :visible="isFormVisible"
        :initial-data="editingForm"
        @close="handleFormClose"
        @submit="handleFormSubmit"
      /> 
    -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// 注意：这些文件需要被创建才能使此组件正常工作
// import { getForms, deleteForm, createForm, updateForm } from '../services/forms.service.js';
// import FormForm from '../components/FormForm.vue';

const loading = ref(true);
const tableData = ref([]);
const error = ref(null);
const isFormVisible = ref(false);
const editingForm = ref(null);

// 模拟数据，因为后端尚未实现
onMounted(() => {
  loading.value = true;
  setTimeout(() => {
      tableData.value = [
          { _id: '1', name: '模拟的联系表单', isEnabled: true, updatedAt: new Date().toISOString() },
          { _id: '2', name: '模拟的产品垂询', isEnabled: false, updatedAt: new Date().toISOString() },
      ];
      loading.value = false;
  }, 1000);
});


// 待实现的API调用
const fetchForms = async () => {
  ElMessage.info('获取表单功能待实现。');
};

const handleCreate = () => {
  ElMessage.info('新建表单功能待实现。');
};

const handleEdit = (row) => {
   ElMessage.info('编辑表单功能待实现。');
};

const handleFormClose = () => {
  isFormVisible.value = false;
  editingForm.value = null;
};

const handleFormSubmit = async (data) => {
  ElMessage.info('提交表单功能待实现。');
};

const handleDelete = (row) => {
   ElMessage.info('删除表单功能待实现。');
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
