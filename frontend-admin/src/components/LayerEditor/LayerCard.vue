<template>
  <el-dialog :model-value="visible" :title="layer.name" width="600px" @close="close">
    <div>
      <content-block
        v-for="(block, index) in blocks"
        :key="index"
        :block="block"
        @update:block="val => updateBlock(index, val)"
        @delete="removeBlock(index)"
      />
      <el-button type="primary" plain @click="showAdd = true">新增内容块</el-button>
      <add-block-modal
        :visible="showAdd"
        @close="showAdd = false"
        @submit="addBlock"
      />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="save">保 存</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import AddBlockModal from './AddBlockModal.vue'
import ContentBlock from './ContentBlock.vue'

const props = defineProps({
  layer: Object,
  visible: Boolean
})
const emit = defineEmits(['close', 'save'])

const blocks = ref([])
const showAdd = ref(false)

watch(() => props.layer, (val) => {
  blocks.value = val ? [...val.contentBlocks] : []
}, { immediate: true })

const addBlock = (block) => {
  blocks.value.push(block)
  showAdd.value = false
}

const updateBlock = (index, block) => {
  blocks.value[index] = block
}

const removeBlock = (index) => {
  blocks.value.splice(index, 1)
}

const close = () => emit('close')

const save = () => {
  emit('save', blocks.value)
  close()
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
