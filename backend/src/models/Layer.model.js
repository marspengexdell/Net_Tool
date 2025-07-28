/**
 * Layer.model.js
 * 定义 Layer (层) 的数据结构。
 */
import mongoose from 'mongoose';
const { Schema } = mongoose;

// 定义内容块 (Content Block) 的子文档结构
const ContentBlockSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['heading', 'paragraph', 'image', 'button', 'video'], // 新增：视频内容块类型
  },
  value: {
    type: String,
    required: true, // 存储文本内容、图片URL或视频URL
  },
  link: {
    type: String,
  },
  metadata: {
    type: Object,
  },
}, { _id: false });

// 定义 Layer 的主 Schema
const LayerSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Layer name is required.'],
    trim: true,
    description: '用于在后台识别的Layer名称',
  },
  order: {
    type: Number,
    default: 0,
    description: '排序字段，数字越小越靠前',
  },
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
      'three-column-cards',
      'video-hero',
      'feature-grid',
      'testimonial-slider',
      'logo-wall',
    ],
    description: '定义该Layer的布局类型',
  },
  // 这个字段我们暂时保留，但新的 video-hero 逻辑将不再依赖它
  backgroundVideoUrl: {
    type: String,
    trim: true,
    description: '（旧版）背景视频的URL',
  },
  contentBlocks: [ContentBlockSchema],
  isEnabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Layer = mongoose.model('Layer', LayerSchema);

export default Layer;
