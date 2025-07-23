import Form from '../models/Form.model.js';
import Submission from '../models/Submission.model.js';

// @desc    创建新的表单
// @route   POST /api/forms
export const createForm = async (req, res) => {
  try {
    const form = new Form(req.body);
    const saved = await form.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating form.', error: error.message });
  }
};

// @desc    获取所有表单
// @route   GET /api/forms
export const getAllForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json({ success: true, count: forms.length, data: forms });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching forms.', error: error.message });
  }
};

// @desc    获取单个表单
// @route   GET /api/forms/:id
export const getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    res.status(200).json({ success: true, data: form });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching form.', error: error.message });
  }
};

// @desc    更新表单
// @route   PUT /api/forms/:id
export const updateForm = async (req, res) => {
  try {
    const updated = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating form.', error: error.message });
  }
};

// @desc    删除表单
// @route   DELETE /api/forms/:id
export const deleteForm = async (req, res) => {
  try {
    const deleted = await Form.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    res.status(200).json({ success: true, message: 'Form deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting form.', error: error.message });
  }
};

// @desc    提交表单
// @route   POST /api/forms/:id/submit
export const submitToForm = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form || !form.isEnabled) {
      return res.status(404).json({ success: false, message: 'Form not found.' });
    }
    const submission = new Submission({ form: form._id, data: req.body });
    const saved = await submission.save();
    res.status(201).json({ success: true, data: saved });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error submitting form.', error: error.message });
  }
};
