<template>
  <el-dialog
    :model-value="visible"
    :title="isEditMode ? '编辑菜单项' : '新建菜单项'"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="菜单标题" prop="title">
        <el-input v-model="form.title" placeholder="例如：关于我们"></el-input>
      </el-form-item>
      <el-form-item label="链接" prop="link">
        <el-input v-model="form.link" placeholder="例如：/about 或 https://example.com"></el-input>
        <div class="form-tip">
          内部链接请使用相对路径 (如 /about)，外部链接请包含 https://
        </div>
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input-number v-model="form.order" :min="0" />
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnabled">
        <el-switch v-model="form.isEnabled"></el-switch>
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

const props = defineProps({
  visible: Boolean,
  initialData: Object,
});

const emit = defineEmits(['close', 'submit']);

const formRef = ref(null);
const form = ref({});

const isEditMode = computed(() => !!(props.initialData && props.initialData._id));

const rules = {
  title: [{ required: true, message: '请输入菜单标题', trigger: 'blur' }],
  link: [{ required: true, message: '请输入链接', trigger: 'blur' }],
};

watch(() => props.initialData, (newData) => {
  form.value = { ...newData };
}, { immediate: true, deep: true });

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
.form-tip {
  color: #909399;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 4px;
}
.dialog-footer {
  text-align: right;
}
</style>
