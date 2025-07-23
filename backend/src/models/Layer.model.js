
import mongoose from 'mongoose';
const { Schema } = mongoose;

// 定义内容块 (Content Block) 的子文档结构
// 这样可以使一个 Layer 内部包含多种类型的内容
const ContentBlockSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['heading', 'paragraph', 'image', 'button'], // 内容块的类型
  },
  value: {
    type: String,
    required: true, // 存储文本内容或图片URL
  },
  // 可以为按钮等类型添加链接
  link: {
    type: String,
  },
  // 为内容块添加样式或元数据
  metadata: {
    type: Object,
  },
}, { _id: false }); // _id: false 表示不为子文档生成独立的ID

// 定义 Layer 的主 Schema
const LayerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Layer name is required.'],
    trim: true,
    description: '用于在后台识别的Layer名称，例如 "首页英雄区域"',
  },
  // order 字段用于决定 Layer 在前端显示的顺序
  order: {
    type: Number,
    default: 0,
    description: '排序字段，数字越小越靠前',
  },
  // layout 字段用于前端决定采用哪种布局方式渲染
  layout: {
    type: String,
    required: [true, 'Layout type is required.'],
    default: 'full-width-text',
    enum: [
      'full-width-text',
      'full-width-image',
      'text-left-image-right',
      'image-left-text-right',
      'two-column-text',
      'three-column-cards'
    ],
    description: '定义该Layer的布局类型',
  },
  // contentBlocks 是一个包含多个内容块的数组
  contentBlocks: [ContentBlockSchema],
  // 控制该 Layer 是否在前端显示
  isEnabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt 时间戳
});

const Layer = mongoose.model('Layer', LayerSchema);

export default Layer;
