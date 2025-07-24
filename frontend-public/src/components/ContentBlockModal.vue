<template>
  <el-dialog
    :model-value="visible"
    :title="isEditMode ? '编辑内容块' : '添加内容块'"
    width="40%"
    @close="handleClose"
    :close-on-click-modal="false"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-position="top">
      <el-form-item label="内容块类型" prop="type">
        <el-select v-model="form.type" placeholder="请选择类型" style="width: 100%;">
          <el-option label="标题 (Heading)" value="heading"></el-option>
          <el-option label="段落 (Paragraph)" value="paragraph"></el-option>
          <el-option label="图片 (Image)" value="image"></el-option>
          <el-option label="按钮 (Button)" value="button"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内容" prop="value">
        <el-input
          v-if="form.type === 'paragraph'"
          v-model="form.value"
          type="textarea"
          :rows="4"
          placeholder="请输入段落文字"
        />
        <el-input
          v-else-if="form.type === 'image'"
          v-model="form.value"
          placeholder="请输入图片 URL"
        />
        <el-input
          v-else
          v-model="form.value"
          placeholder="请输入标题或按钮文字"
        />
      </el-form-item>

      <!-- 仅当类型为“按钮”时显示链接输入框 -->
      <el-form-item v-if="form.type === 'button'" label="按钮链接" prop="link">
        <el-input v-model="form.link" placeholder="请输入按钮指向的 URL"></el-input>
      </el-form-item>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  visible: Boolean,
  initialData: Object, // 接收的初始数据
});

const emit = defineEmits(['close', 'save']);

const formRef = ref(null);
const form = ref({});

// 通过 initialData 是否有内容来判断是编辑还是新建模式
const isEditMode = computed(() => !!props.initialData);

// 表单验证规则
const rules = {
  type: [{ required: true, message: '请选择内容块类型', trigger: 'change' }],
  value: [{ required: true, message: '请输入内容', trigger: 'blur' }],
  link: [{ required: true, message: '请输入按钮链接', trigger: 'blur' }],
};

// 监听 initialData 的变化，当父组件传入新数据时，更新表单
watch(() => props.initialData, (newData) => {
  // 如果是新建，则使用默认值；如果是编辑，则使用传入的数据
  form.value = newData ? { ...newData } : { type: 'heading', value: '', link: '' };
}, { immediate: true });

const handleClose = () => {
  emit('close');
};

const handleSave = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      // 触发 save 事件，将表单数据传递给父组件
      emit('save', form.value);
    }
  });
};
</script>
