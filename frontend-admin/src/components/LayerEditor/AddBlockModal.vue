<template>
  <el-dialog :model-value="visible" title="新增内容块" width="400px" @close="close">
    <el-form :model="form" label-width="80px">
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择类型">
          <el-option label="标题" value="heading" />
          <el-option label="段落" value="paragraph" />
          <el-option label="图片" value="image" />
          <el-option label="按钮" value="button" />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" v-if="form.type !== 'image'">
        <el-input v-model="form.value" />
      </el-form-item>
      <el-form-item label="图片地址" v-else>
        <el-input v-model="form.value" placeholder="图片 URL" />
      </el-form-item>
      <el-form-item label="链接" v-if="form.type === 'button'">
        <el-input v-model="form.link" placeholder="按钮链接" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  visible: Boolean
})
const emit = defineEmits(['close', 'submit'])

const form = reactive({
  type: 'heading',
  value: '',
  link: ''
})

watch(() => props.visible, (val) => {
  if (!val) {
    form.type = 'heading'
    form.value = ''
    form.link = ''
  }
})

const close = () => emit('close')

const submit = () => {
  emit('submit', { type: form.type, value: form.value, link: form.link })
  close()
}
</script>

<style scoped>
.dialog-footer {
  text-align: right;
}
</style>
