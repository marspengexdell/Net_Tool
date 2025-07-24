/**
 * settings.service.js
 * 封装所有与全局设置模块相关的 API 请求。
 */
import apiClient from './apiClient';

/**
 * 获取全局设置
 * @returns {Promise}
 */
export const getSettings = () => {
  return apiClient.get('/settings');
};

/**
 * 更新全局设置
 * @param {object} data - 更新后的设置数据
 * @returns {Promise}
 */
export const updateSettings = (data) => {
  return apiClient.put('/settings', data);
};
