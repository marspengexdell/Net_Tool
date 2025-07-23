/**
 * MenuItem.model.js
 * 定义弹出菜单项的数据结构。
 */
import mongoose from 'mongoose';
const { Schema } = mongoose;

const MenuItemSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Menu item title is required.'],
    trim: true,
    description: '菜单项显示的文本，例如 "关于我们"',
  },
  link: {
    type: String,
    required: [true, 'Menu item link is required.'],
    trim: true,
    description: '菜单项指向的链接，可以是内部路径 (#contact) 或外部URL',
  },
  order: {
    type: Number,
    default: 0,
    description: '排序字段，数字越小越靠前',
  },
  isEnabled: {
    type: Boolean,
    default: true,
    description: '控制该菜单项是否显示',
  },
}, {
  timestamps: true,
});

const MenuItem = mongoose.model('MenuItem', MenuItemSchema);

export default MenuItem;
