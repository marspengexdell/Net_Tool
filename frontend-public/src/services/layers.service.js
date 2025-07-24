/**
 * layers.service.js
 * \u5c01\u88c5\u6240\u6709\u4e0e Layer \u6a21\u5757\u76f8\u5173\u7684 API \u8bf7\u6c42\u3002
 */
import apiClient from './apiClient';

/**
 * \u83b7\u53d6\u6240\u6709\u5c42\u7ea7
 * @returns {Promise}
 */
export const getLayers = () => {
  return apiClient.get('/layers');
};

/**
 * \u6839\u636e ID \u5220\u9664\u4e00\u4e2a\u5c42\u7ea7
 * @param {string} id - \u8981\u5220\u9664\u7684\u5c42\u7ea7\u7684 ID
 * @returns {Promise}
 */
export const deleteLayer = (id) => {
  return apiClient.delete(`/layers/${id}`);
};

/**
 * \u521b\u5efa\u4e00\u4e2a\u65b0\u7684\u5c42\u7ea7
 * @param {object} data - \u65b0\u5c42\u7ea7\u7684\u6570\u636e
 * @returns {Promise}
 */
export const createLayer = (data) => {
  return apiClient.post('/layers', data);
};

/**
 * \u6839\u636e ID \u66f4\u65b0\u4e00\u4e2a\u5c42\u7ea7
 * @param {string} id - \u8981\u66f4\u65b0\u7684\u5c42\u7ea7\u7684 ID
 * @param {object} data - \u66f4\u65b0\u540e\u7684\u6570\u636e
 * @returns {Promise}
 */
export const updateLayer = (id, data) => {
  return apiClient.put(`/layers/${id}`, data);
};
