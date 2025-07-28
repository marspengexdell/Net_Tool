<template>
  <el-drawer
    :model-value="visible"
    :title="`编辑内容: ${layer ? layer.name : ''}`"
    direction="rtl"
    size="50%"
    @close="handleClose"
  >
    <div class="editor-body">
      <div class="content-blocks-list">
        <el-card v-for="(block, index) in localContentBlocks" :key="index" class="block-card" shadow="hover">
          <div class="block-header">
            <span class="block-title"><strong>#{{ index + 1 }}</strong> {{ block.type }}</span>
            <div class="block-actions">
              <el-button-group>
                <el-button :icon="ArrowUp" size="small" @click="moveBlock(index, -1)" :disabled="index === 0" />
                <el-button :icon="ArrowDown" size="small" @click="moveBlock(index, 1)" :disabled="index === localContentBlocks.length - 1" />
              </el-button-group>
              <el-button :icon="Edit" size="small" type="primary" plain @click="editContentBlock(index)">编辑</el-button>
              <el-button :icon="Delete" size="small" type="danger" plain @click="deleteContentBlock(index)">删除</el-button>
            </div>
          </div>
          <p class="block-preview">{{ block.value }}</p>
        </el-card>

        <el-empty v-if="!localContentBlocks || localContentBlocks.length === 0" description="暂无内容块" />
      </div>

      <el-button @click="addContentBlock" :icon="Plus" class="add-block-btn">添加内容块</el-button>
    </div>

    <template #footer>
      <div style="flex: auto">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSave">保 存</el-button>
      </div>
    </template>

    <!-- 内容块编辑/添加弹窗 (带有图片上传功能) -->
    <ContentBlockModal
      :visible="isModalVisible"
      :initial-data="editingBlock"
      @close="isModalVisible = false"
      @save="handleBlockSave"
    />
  </el-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Plus, Edit, Delete, ArrowUp, ArrowDown } from '@element-plus/icons-vue';
import ContentBlockModal from './ContentBlockModal.vue';

const props = defineProps({
  visible: Boolean,
  layer: Object,
});

const emit = defineEmits(['close', 'save']);

const localContentBlocks = ref([]);
const isModalVisible = ref(false);
const editingBlock = ref(null);
const editingBlockIndex = ref(-1);

watch(() => props.layer, (newLayer) => {
  localContentBlocks.value = newLayer?.contentBlocks ? JSON.parse(JSON.stringify(newLayer.contentBlocks)) : [];
}, { immediate: true, deep: true });

const addContentBlock = () => {
  editingBlock.value = null;
  editingBlockIndex.value = -1;
  isModalVisible.value = true;
};

const editContentBlock = (index) => {
  editingBlock.value = { ...localContentBlocks.value[index] };
  editingBlockIndex.value = index;
  isModalVisible.value = true;
};

const deleteContentBlock = (index) => {
  localContentBlocks.value.splice(index, 1);
};

const moveBlock = (index, direction) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= localContentBlocks.value.length) return;
  const temp = localContentBlocks.value.splice(index, 1)[0];
  localContentBlocks.value.splice(newIndex, 0, temp);
};

const handleBlockSave = (savedBlock) => {
  if (editingBlockIndex.value > -1) {
    localContentBlocks.value[editingBlockIndex.value] = savedBlock;
  } else {
    localContentBlocks.value.push(savedBlock);
  }
  isModalVisible.value = false;
};

const handleClose = () => emit('close');
const handleSave = () => emit('save', localContentBlocks.value);
</script>

<style scoped>
.editor-body { padding: 20px; }
.block-card { margin-bottom: 15px; }
.block-header { display: flex; justify-content: space-between; align-items: center; }
.block-title { font-weight: 500; }
.block-actions { display: flex; gap: 10px; }
.block-preview { margin-top: 10px; padding: 10px; background-color: #f9fafb; border-radius: 4px; font-size: 14px; color: #666; white-space: pre-wrap; word-break: break-all; }
.add-block-btn { width: 100%; margin-top: 10px; border-style: dashed; }
</style>