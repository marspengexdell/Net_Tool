<template>
  <el-card class="block-card" shadow="never">
    <template #header>
      <div class="block-header">
        <span>{{ block.type }}</span>
        <el-button type="danger" link size="small" @click="$emit('delete')">删除</el-button>
      </div>
    </template>
    <div v-if="block.type === 'heading'">
      <el-input v-model="localBlock.value" placeholder="标题内容" />
    </div>
    <div v-else-if="block.type === 'paragraph'">
      <el-input type="textarea" v-model="localBlock.value" placeholder="段落内容" />
    </div>
    <div v-else-if="block.type === 'image'">
      <el-input v-model="localBlock.value" placeholder="图片 URL" />
    </div>
    <div v-else-if="block.type === 'button'">
      <el-input v-model="localBlock.value" placeholder="按钮文字" class="mb-2" />
      <el-input v-model="localBlock.link" placeholder="链接" />
    </div>
  </el-card>
</template>

<script setup>
import { watch, reactive } from 'vue'
const props = defineProps({
  block: Object
})
const emit = defineEmits(['update:block', 'delete'])
const localBlock = reactive({ ...props.block })

watch(localBlock, () => {
  emit('update:block', { ...localBlock })
})
</script>

<style scoped>
.block-card {
  margin-bottom: 15px;
}
.block-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mb-2 {
  margin-bottom: 8px;
}
</style>
