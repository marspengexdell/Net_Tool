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
          <el-option label="视频 (Video)" value="video"></el-option>
          <el-option label="按钮 (Button)" value="button"></el-option>
        </el-select>
      </el-form-item>

      <!-- 当类型为“图片”或“视频”时，显示上传组件 -->
      <el-form-item v-if="form.type === 'image' || form.type === 'video'" :label="form.type === 'image' ? '上传图片' : '上传视频'" prop="value">
        <el-upload
          class="file-uploader"
          :action="uploadUrl"
          name="image"
          :show-file-list="false"
          :on-success="handleFileSuccess"
          :before-upload="beforeFileUpload"
          :on-error="handleFileError"
        >
          <!-- 根据类型预览视频或图片 -->
          <video v-if="form.type === 'video' && form.value" :src="fullFileUrl" class="uploaded-file" controls></video>
          <img v-else-if="form.type === 'image' && form.value" :src="fullFileUrl" class="uploaded-file" />
          <el-icon v-else class="uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-input v-model="form.value" placeholder="上传成功后，文件 URL 会自动填充" readonly />
      </el-form-item>

      <!-- 其他类型的内容输入框 -->
      <el-form-item v-else label="内容" prop="value">
        <el-input
          v-if="form.type === 'paragraph'"
          v-model="form.value"
          type="textarea"
          :rows="4"
          placeholder="请输入段落文字"
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
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';

const props = defineProps({
  visible: Boolean,
  initialData: Object,
});

const emit = defineEmits(['close', 'save']);

const formRef = ref(null);
const form = ref({});

// --- 文件上传相关 ---
const backendBaseUrl = import.meta.env.VITE_API_BASE_URL.replace('/api', '');
const uploadUrl = `${import.meta.env.VITE_API_BASE_URL}/upload`;

const fullFileUrl = computed(() => {
  if (form.value.value && form.value.value.startsWith('/uploads')) {
    return `${backendBaseUrl}${form.value.value}`;
  }
  return form.value.value;
});

const handleFileSuccess = (response) => {
  if (response.success) {
    form.value.value = response.url;
    ElMessage.success('文件上传成功!');
  } else {
    ElMessage.error(response.message || '文件上传失败');
  }
};

const handleFileError = (error) => {
  ElMessage.error('文件上传失败，请检查网络或文件大小。');
  console.error('Upload Error:', error);
};

const beforeFileUpload = (rawFile) => {
  const isImage = ['image/jpeg', 'image/png', 'image/gif'].includes(rawFile.type);
  const isVideo = ['video/mp4', 'video/webm', 'video/ogg'].includes(rawFile.type);
  const isLt20M = rawFile.size / 1024 / 1024 < 20;

  if (form.value.type === 'image' && !isImage) {
    ElMessage.error('上传的必须是图片格式 (JPG, PNG, GIF)!');
    return false;
  }
  if (form.value.type === 'video' && !isVideo) {
    ElMessage.error('上传的必须是视频格式 (MP4, WEBM, OGG)!');
    return false;
  }
  if (!isLt20M) {
    ElMessage.error('文件大小不能超过 20MB!');
    return false;
  }
  return true;
};

// --- 表单核心逻辑 ---
const isEditMode = computed(() => !!props.initialData);

const rules = {
  type: [{ required: true, message: '请选择内容块类型', trigger: 'change' }],
  value: [{ required: true, message: '请输入内容或上传文件', trigger: 'blur' }],
  link: [{ required: true, message: '请输入按钮链接', trigger: 'blur' }],
};

watch(() => props.initialData, (newData) => {
  form.value = newData ? { ...newData } : { type: 'heading', value: '', link: '' };
}, { immediate: true });

const handleClose = () => emit('close');
const handleSave = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) emit('save', form.value);
  });
};
</script>

<style>
.file-uploader .el-upload { border: 1px dashed var(--el-border-color); border-radius: 6px; cursor: pointer; position: relative; overflow: hidden; transition: var(--el-transition-duration-fast); }
.file-uploader .el-upload:hover { border-color: var(--el-color-primary); }
.uploader-icon { font-size: 28px; color: #8c939d; width: 178px; height: 178px; text-align: center; }
.uploaded-file { width: 178px; height: 178px; object-fit: cover; }
</style>
