/**
 * menu.service.js
 * 封装所有与菜单项模块相关的 API 请求。
 */
import apiClient from './apiClient';

/**
 * 获取所有菜单项
 * @returns {Promise}
 */
export const getMenuItems = () => {
  return apiClient.get('/menu');
};

/**
 * 创建一个新的菜单项
 * @param {object} data - 新菜单项的数据
 * @returns {Promise}
 */
export const createMenuItem = (data) => {
  return apiClient.post('/menu', data);
};

/**
 * 根据 ID 更新一个菜单项
 * @param {string} id - 要更新的菜单项的 ID
 * @param {object} data - 更新后的数据
 * @returns {Promise}
 */
export const updateMenuItem = (id, data) => {
  return apiClient.put(`/menu/${id}`, data);
};

/**
 * 根据 ID 删除一个菜单项
 * @param {string} id - 要删除的菜单项的 ID
 * @returns {Promise}
 */
export const deleteMenuItem = (id) => {
  return apiClient.delete(`/menu/${id}`);
};
