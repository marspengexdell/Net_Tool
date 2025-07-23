/**
 * Setting.model.js
 * 定义全局网站设置的数据结构。
 * 使用 singleton 模式确保数据库中只有一份设置文档。
 */
import mongoose from 'mongoose';
const { Schema } = mongoose;

const SettingSchema = new Schema({
  // 使用一个固定的值来确保该集合中只有一条文档
  singleton: {
    type: String,
    default: 'global-settings',
    unique: true,
    required: true,
  },
  logoUrl: {
    type: String,
    trim: true,
    default: '',
    description: '网站LOGO的图片URL',
  },
  fontFamily: {
    type: String,
    trim: true,
    default: '"Inter", sans-serif',
    description: '网站的全局字体',
  },
  primaryColor: {
    type: String,
    trim: true,
    default: '#3B82F6', // 一个蓝色作为默认值
    description: '网站的主题颜色',
  },
}, {
  timestamps: true, // 自动添加 createdAt 和 updatedAt
});

const Setting = mongoose.model('Setting', SettingSchema);

export default Setting;
