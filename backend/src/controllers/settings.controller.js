/**
 * settings.controller.js
 * 全局设置模块的控制器，负责处理相关业务逻辑。
 */
import Setting from '../models/Setting.model.js';

// @desc    获取全局设置
// @route   GET /api/settings
// @access  Public
export const getSettings = async (req, res) => {
  try {
    // 查找唯一的设置文档
    let settings = await Setting.findOne({ singleton: 'global-settings' });

    // 如果数据库中还没有设置，就创建一个默认的
    if (!settings) {
      settings = await new Setting().save();
    }

    res.status(200).json({
      success: true,
      data: settings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching settings.',
      error: error.message,
    });
  }
};

// @desc    创建或更新全局设置
// @route   PUT /api/settings
// @access  Private (需要管理员权限)
export const updateSettings = async (req, res) => {
  try {
    const updateData = req.body;

    // 查找并更新，如果不存在则创建 (upsert: true)
    const updatedSettings = await Setting.findOneAndUpdate(
      { singleton: 'global-settings' }, // 查询条件
      { $set: updateData },             // 更新的数据
      { new: true, upsert: true, runValidators: true } // 选项
    );

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully.',
      data: updatedSettings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating settings.',
      error: error.message,
    });
  }
};
