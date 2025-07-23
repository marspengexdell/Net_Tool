/**
 * layers.controller.js
 * Layer 模块的控制器，负责处理所有与 Layer 相关的业务逻辑。
 */
import Layer from '../models/Layer.model.js';

// @desc    创建一个新的 Layer
// @route   POST /api/layers
// @access  Private (需要管理员权限)
export const createLayer = async (req, res) => {
  try {
    // 从请求体中获取数据
    const { name, order, layout, contentBlocks, isEnabled } = req.body;

    // 创建一个新的 Layer 实例
    const newLayer = new Layer({
      name,
      order,
      layout,
      contentBlocks,
      isEnabled,
    });

    // 保存到数据库
    const savedLayer = await newLayer.save();

    res.status(201).json({
      success: true,
      message: 'Layer created successfully.',
      data: savedLayer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating layer.',
      error: error.message,
    });
  }
};

// @desc    获取所有 Layers
// @route   GET /api/layers
// @access  Public/Private (可根据需要调整)
export const getAllLayers = async (req, res) => {
  try {
    // 查找所有 layers 并根据 order 字段升序排序
    const layers = await Layer.find().sort({ order: 'asc' });

    res.status(200).json({
      success: true,
      count: layers.length,
      data: layers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching layers.',
      error: error.message,
    });
  }
};

// @desc    根据 ID 获取单个 Layer
// @route   GET /api/layers/:id
// @access  Public/Private
export const getLayerById = async (req, res) => {
  try {
    const layer = await Layer.findById(req.params.id);

    if (!layer) {
      return res.status(404).json({
        success: false,
        message: 'Layer not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: layer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching layer.',
      error: error.message,
    });
  }
};

// @desc    根据 ID 更新一个 Layer
// @route   PUT /api/layers/:id
// @access  Private
export const updateLayer = async (req, res) => {
  try {
    const layerId = req.params.id;
    const updateData = req.body;

    const updatedLayer = await Layer.findByIdAndUpdate(layerId, updateData, {
      new: true, // 返回更新后的文档
      runValidators: true, // 运行 Mongoose schema 的验证
    });

    if (!updatedLayer) {
      return res.status(404).json({
        success: false,
        message: 'Layer not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Layer updated successfully.',
      data: updatedLayer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating layer.',
      error: error.message,
    });
  }
};

// @desc    根据 ID 删除一个 Layer
// @route   DELETE /api/layers/:id
// @access  Private
export const deleteLayer = async (req, res) => {
  try {
    const layer = await Layer.findByIdAndDelete(req.params.id);

    if (!layer) {
      return res.status(404).json({
        success: false,
        message: 'Layer not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Layer deleted successfully.',
      data: {}, // 或者返回被删除的 layer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting layer.',
      error: error.message,
    });
  }
};
