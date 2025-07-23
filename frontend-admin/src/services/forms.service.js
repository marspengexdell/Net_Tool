import apiClient from './apiClient';

export const getForms = () => {
  return apiClient.get('/forms');
};

export const createForm = (data) => {
  return apiClient.post('/forms', data);
};

export const updateForm = (id, data) => {
  return apiClient.put(`/forms/${id}`, data);
};

export const deleteForm = (id) => {
  return apiClient.delete(`/forms/${id}`);
};

export const submitForm = (id, data) => {
  return apiClient.post(`/forms/${id}/submit`, data);
};
