/**
 * menu.controller.js
 * 菜单模块的控制器，负责处理所有与菜单项相关的业务逻辑。
 */
import MenuItem from '../models/MenuItem.model.js';

// @desc    创建一个新的菜单项
// @route   POST /api/menu
// @access  Private
export const createMenuItem = async (req, res) => {
  try {
    const { title, link, order, isEnabled } = req.body;
    const newMenuItem = new MenuItem({ title, link, order, isEnabled });
    const savedMenuItem = await newMenuItem.save();
    res.status(201).json({ success: true, data: savedMenuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating menu item.', error: error.message });
  }
};

// @desc    获取所有菜单项
// @route   GET /api/menu
// @access  Public
export const getAllMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ isEnabled: true }).sort({ order: 'asc' });
    res.status(200).json({ success: true, count: menuItems.length, data: menuItems });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching menu items.', error: error.message });
  }
};

// @desc    根据 ID 更新一个菜单项
// @route   PUT /api/menu/:id
// @access  Private
export const updateMenuItem = async (req, res) => {
  try {
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedMenuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.status(200).json({ success: true, data: updatedMenuItem });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating menu item.', error: error.message });
  }
};

// @desc    根据 ID 删除一个菜单项
// @route   DELETE /api/menu/:id
// @access  Private
export const deleteMenuItem = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);
    if (!menuItem) {
      return res.status(404).json({ success: false, message: 'Menu item not found.' });
    }
    res.status(200).json({ success: true, message: 'Menu item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting menu item.', error: error.message });
  }
};
