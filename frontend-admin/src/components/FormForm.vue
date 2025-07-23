<template>
  <el-dialog
    :model-value="visible"
    :title="isEditMode ? '编辑表单' : '新建表单'"
    width="60%"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="表单名称" prop="name">
        <el-input v-model="form.name" placeholder="例如：联系表单" />
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnabled">
        <el-switch v-model="form.isEnabled" />
      </el-form-item>
      <el-form-item label="字段列表">
        <el-table :data="form.fields" style="width:100%">
          <el-table-column label="标签">
            <template #default="scope">
              <el-input v-model="scope.row.label" />
            </template>
          </el-table-column>
          <el-table-column label="字段名">
            <template #default="scope">
              <el-input v-model="scope.row.name" />
            </template>
          </el-table-column>
          <el-table-column label="类型">
            <template #default="scope">
              <el-select v-model="scope.row.type" style="width:120px">
                <el-option label="文本" value="text" />
                <el-option label="邮箱" value="email" />
                <el-option label="多行文本" value="textarea" />
                <el-option label="数字" value="number" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="必填" width="80">
            <template #default="scope">
              <el-switch v-model="scope.row.required" />
            </template>
          </el-table-column>
          <el-table-column label="操作" width="80">
            <template #default="scope">
              <el-button type="danger" size="small" @click="removeField(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button class="add-field" type="primary" plain icon="Plus" @click="addField">新增字段</el-button>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const props = defineProps({
  visible: Boolean,
  initialData: Object,
});

const emit = defineEmits(['close', 'submit']);

const formRef = ref(null);
const form = ref({ fields: [] });

const isEditMode = computed(() => !!(props.initialData && props.initialData._id));

const rules = {
  name: [{ required: true, message: '请输入表单名称', trigger: 'blur' }],
};

watch(
  () => props.initialData,
  (newData) => {
    form.value = { fields: [], isEnabled: true, ...newData };
    if (!form.value.fields) form.value.fields = [];
  },
  { immediate: true, deep: true }
);

const addField = () => {
  form.value.fields.push({ label: '', name: '', type: 'text', required: false });
};

const removeField = (index) => {
  form.value.fields.splice(index, 1);
};

const handleClose = () => {
  emit('close');
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      emit('submit', form.value);
    }
  });
};
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
.add-field {
  margin-top: 10px;
}
</style>
