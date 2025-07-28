<template>
  <el-dialog
    :model-value="visible"
    :title="isEditMode ? '编辑层级属性' : '新建层级'"
    width="50%"
    @close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="层级名称" prop="name">
        <el-input v-model="form.name" placeholder="例如：我们的客户"></el-input>
      </el-form-item>
      <el-form-item label="布局类型" prop="layout">
        <el-select v-model="form.layout" placeholder="请选择布局类型" style="width: 100%;">
          <el-option label="视频英雄区域" value="video-hero"></el-option>
          <el-option-group label="标准布局">
            <el-option label="全宽文字" value="full-width-text"></el-option>
            <el-option label="全宽图片" value="full-width-image"></el-option>
            <el-option label="左文右图" value="text-left-image-right"></el-option>
            <el-option label="左图右文" value="image-left-text-right"></el-option>
            <el-option label="两列文字" value="two-column-text"></el-option>
            <el-option label="三列卡片" value="three-column-cards"></el-option>
            <el-option label="服务特色展示" value="feature-grid"></el-option> 
            <el-option label="客户评价轮播" value="testimonial-slider"></el-option>
            <el-option label="客户/合作伙伴Logo墙" value="logo-wall"></el-option>
          </el-option-group>
        </el-select>
      </el-form-item>
      
      <el-form-item v-if="form.layout === 'video-hero'" label="背景视频 URL" prop="backgroundVideoUrl">
        <el-input v-model="form.backgroundVideoUrl" placeholder="请输入 .mp4 或 .webm 视频链接"></el-input>
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
        <el-button type="primary" @click="handleSubmit">保 存</el-button>
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
  name: [{ required: true, message: '请输入层级名称', trigger: 'blur' }],
  layout: [{ required: true, message: '请选择布局类型', trigger: 'change' }],
  backgroundVideoUrl: [{ type: 'url', message: '请输入有效的URL', trigger: 'blur' }],
};

watch(() => props.initialData, (newData) => {
  form.value = newData ? { ...newData } : { name: '', layout: '', order: 0, isEnabled: true, backgroundVideoUrl: '' };
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
