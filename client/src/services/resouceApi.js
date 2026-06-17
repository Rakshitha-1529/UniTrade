import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const resourceService = {
  upload: (formData) => axios.post(`${API_URL}/resources`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getAll: (params) => axios.get(`${API_URL}/resources`, { params }),
  getById: (id) => axios.get(`${API_URL}/resources/${id}`),
  update: (id, data) => axios.put(`${API_URL}/resources/${id}`, data),
  delete: (id) => axios.delete(`${API_URL}/resources/${id}`),
  download: (id) => axios.get(`${API_URL}/resources/${id}/download`),
  rate: (id, data) => axios.post(`${API_URL}/resources/${id}/rate`, data),
};
