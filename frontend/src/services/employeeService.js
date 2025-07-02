import axios from 'axios';

const API_URL = 'http://localhost:3000/api/employees';//se deja fijo por temas e simplicidad de creación

const getAll = () => {
  return axios.get(API_URL);
};

const getById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

const create = (data) => {
  return axios.post(API_URL, data);
};

const update = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

const remove = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

const employeeService = {
  getAll,
  getById,
  create,
  update,
  remove,
};

export default employeeService;