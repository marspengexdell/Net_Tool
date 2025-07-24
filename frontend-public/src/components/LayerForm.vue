<template>
  <el-dialog
    :model-value="visible"
    :title="isEditMode ? '编辑层级' : '新建层级'"
    width="60%"
    @close="handleClose"
    top="5vh"
    class="layer-form-dialog"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <!-- 基本信息表单 -->
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="层级名称" prop="name">
            <el-input v-model="form.name" placeholder="例如：首页关于我们"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
           <el-form-item label="布局类型" prop="layout">
            <el-select v-model="form.layout" placeholder="请选择布局类型" style="width: 100%;">
              <el-option label="全宽文字" value="full-width-text"></el-option>
              <el-option label="全宽图片" value="full-width-image"></el-option>
              <el-option label="左文右图" value="text-left-image-right"></el-option>
              <el-option label="左图右文" value="image-left-text-right"></el-option>
              <el-option label="三列卡片" value="three-column-cards"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序" prop="order">
            <el-input-number v-model="form.order" :min="0" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否启用" prop="isEnabled">
            <el-switch v-model="form.isEnabled"></el-switch>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- 内容块编辑器 -->
      <el-divider />
      <h3 class="content-blocks-title">内容块</h3>
      
      <div class="content-blocks-list">
        <el-card v-for="(block, index) in form.contentBlocks" :key="index" class="block-card" shadow="hover">
          <div class="block-header">
            <span class="block-title"><strong>#{{ index + 1 }}</strong> {{ block.type }}</span>
            <div class="block-actions">
              <el-button-group>
                <el-button :icon="ArrowUp" size="small" @click="moveBlock(index, -1)" :disabled="index === 0" />
                <el-button :icon="ArrowDown" size="small" @click="moveBlock(index, 1)" :disabled="index === form.contentBlocks.length - 1" />
              </el-button-group>
              <el-button :icon="Edit" size="small" type="primary" plain @click="editContentBlock(index)">编辑</el-button>
              <el-button :icon="Delete" size="small" type="danger" plain @click="deleteContentBlock(index)">删除</el-button>
            </div>
          </div>
          <p class="block-preview">{{ block.value }}</p>
        </el-card>

        <el-empty v-if="!form.contentBlocks || form.contentBlocks.length === 0" description="暂无内容块" />
      </div>

      <el-button @click="addContentBlock" :icon="Plus" class="add-block-btn">添加内容块</el-button>

    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="isSubmitting">保 存</el-button>
      </span>
    </template>

    <!-- 内容块编辑/添加弹窗 -->
    <ContentBlockModal
      :visible="isModalVisible"
      :initial-data="editingBlock"
      @close="isModalVisible = false"
      @save="handleBlockSave"
    />
  </el-dialog>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { Plus, Edit, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
// 导入我们之前创建的内容块弹窗组件
import ContentBlockModal from './ContentBlockModal.vue';

const props = defineProps({
  visible: Boolean,
  initialData: Object,
});

const emit = defineEmits(['close', 'submit']);

const formRef = ref(null);
const form = ref({ contentBlocks: [] });
const isSubmitting = ref(false);

// --- 内容块弹窗状态 ---
const isModalVisible = ref(false);
const editingBlock = ref(null); // 存储正在编辑的块数据
const editingBlockIndex = ref(-1); // 存储正在编辑的块的索引

const isEditMode = computed(() => !!(props.initialData && props.initialData._id));

const rules = {
  name: [{ required: true, message: '请输入层级名称', trigger: 'blur' }],
  layout: [{ required: true, message: '请选择布局类型', trigger: 'change' }],
};

watch(() => props.initialData, (newData) => {
  if (newData) {
    // 使用深拷贝以避免直接修改父组件数据
    form.value = JSON.parse(JSON.stringify(newData));
    if (!form.value.contentBlocks) {
      form.value.contentBlocks = [];
    }
  } else {
    form.value = { name: '', layout: '', order: 0, isEnabled: true, contentBlocks: [] };
  }
}, { immediate: true, deep: true });

// --- 内容块操作 ---
const addContentBlock = () => {
  editingBlock.value = null; // 清空数据表示新建
  editingBlockIndex.value = -1;
  isModalVisible.value = true;
};

const editContentBlock = (index) => {
  editingBlock.value = { ...form.value.contentBlocks[index] }; // 传递副本
  editingBlockIndex.value = index;
  isModalVisible.value = true;
};

const deleteContentBlock = (index) => {
  form.value.contentBlocks.splice(index, 1);
};

const moveBlock = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= form.value.contentBlocks.length) return;
  // 交换元素位置
  const temp = form.value.contentBlocks[index];
  form.value.contentBlocks[index] = form.value.contentBlocks[newIndex];
  form.value.contentBlocks[newIndex] = temp;
};

const handleBlockSave = (savedBlock) => {
  if (editingBlockIndex.value > -1) {
    // 编辑模式
    form.value.contentBlocks[editingBlockIndex.value] = savedBlock;
  } else {
    // 新建模式
    form.value.contentBlocks.push(savedBlock);
  }
  isModalVisible.value = false;
};

// --- 主表单操作 ---
const handleClose = () => {
  emit('close');
};

const handleSubmit = async () => {
  if (!formRef.value) return;
  await formRef.value.validate((valid) => {
    if (valid) {
      isSubmitting.value = true;
      emit('submit', form.value);
      // 提交后由父组件控制关闭和加载状态
      setTimeout(() => { isSubmitting.value = false; }, 1500);
    }
  });
};
</script>

<style scoped>
.layer-form-dialog .el-dialog__body {
  max-height: 70vh;
  overflow-y: auto;
}
.content-blocks-title {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
}
.block-card {
  margin-bottom: 15px;
}
.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.block-title {
  font-weight: 500;
}
.block-actions {
  display: flex;
  gap: 10px;
}
.block-preview {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9fafb;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  white-space: pre-wrap;
  word-break: break-all;
}
.add-block-btn {
  width: 100%;
  margin-top: 10px;
  border-style: dashed;
}
</style>
