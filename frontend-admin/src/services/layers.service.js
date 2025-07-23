/**
 * layers.service.js
 * 封装所有与 Layer 模块相关的 API 请求。
 */
import apiClient from './apiClient';

/**
 * 获取所有层级
 * @returns {Promise}
 */
export const getLayers = () => {
  return apiClient.get('/layers');
};

/**
 * 根据 ID 删除一个层级
 * @param {string} id - 要删除的层级的 ID
 * @returns {Promise}
 */
export const deleteLayer = (id) => {
  return apiClient.delete(`/layers/${id}`);
};

/**
 * 创建一个新的层级
 * @param {object} data - 新层级的数据
 * @returns {Promise}
 */
export const createLayer = (data) => {
  return apiClient.post('/layers', data);
};

/**
 * 根据 ID 更新一个层级
 * @param {string} id - 要更新的层级的 ID
 * @param {object} data - 更新后的数据
 * @returns {Promise}
 */
export const updateLayer = (id, data) => {
  return apiClient.put(`/layers/${id}`, data);
};
