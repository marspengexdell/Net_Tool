/**
 * public.controller.js
 * 专为公共前端提供数据的控制器。
 */
import Setting from '../models/Setting.model.js';
import Layer from '../models/Layer.model.js';
import MenuItem from '../models/MenuItem.model.js';

// @desc    获取所有公共数据 (设置, 层级, 菜单)
// @route   GET /api/public/data
// @access  Public
export const getPublicData = async (req, res) => {
  try {
    // 使用 Promise.all 并行执行所有数据库查询，以提高效率
    const [settings, layers, menuItems] = await Promise.all([
      // 查找唯一的设置文档，如果不存在则创建一个默认的
      Setting.findOneAndUpdate(
        { singleton: 'global-settings' },
        {},
        { upsert: true, new: true }
      ),
      // 查找所有已启用的层级，并按 order 排序
      Layer.find({ isEnabled: true }).sort({ order: 'asc' }),
      // 查找所有已启用的菜单项，并按 order 排序
      MenuItem.find({ isEnabled: true }).sort({ order: 'asc' }),
    ]);

    // 将所有数据打包到一个对象中
    const publicData = {
      settings,
      layers,
      menuItems,
    };

    res.status(200).json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching public data.',
      error: error.message,
    });
  }
};
