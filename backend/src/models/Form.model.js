import mongoose from 'mongoose';
const { Schema } = mongoose;

// 定义单个表单字段的结构
const FieldSchema = new Schema({
  label: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true },
  required: { type: Boolean, default: false },
  options: [String],
}, { _id: false });

// 主表单 Schema
const FormSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Form name is required.'],
    trim: true,
  },
  fields: [FieldSchema],
  isEnabled: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Form = mongoose.model('Form', FormSchema);

export default Form;
