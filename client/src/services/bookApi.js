import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const bookService = {
  list: (data) => axios.post(`${API_URL}/books`, data),
  getAll: (params) => axios.get(`${API_URL}/books`, { params }),
  getById: (id) => axios.get(`${API_URL}/books/${id}`),
  request: (id) => axios.post(`${API_URL}/books/${id}/request`),
  handleRequest: (data) => axios.post(`${API_URL}/books/request/handle`, data),
  getExchanges: () => axios.get(`${API_URL}/exchanges`),
  verifyOTP: (data) => axios.post(`${API_URL}/exchanges/verify`, data),
  rateExchange: (id, data) =>
    axios.post(`${API_URL}/exchanges/${id}/rate`, data),
};
