import axios from 'axios';
import { getAuthToken } from './storage';

const api = axios.create({
  baseURL: 'YOUR_API_URL',
});

api.interceptors.request.use(async (config) => {
  const token = await getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
};

export const expenses = {
  list: async () => {
    const response = await api.get('/expenses');
    return response.data;
  },
  create: async (expense: any) => {
    const response = await api.post('/expenses', expense);
    return response.data;
  },
  update: async (id: string, expense: any) => {
    const response = await api.put(`/expenses/${id}`, expense);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
  },
};

export const incomes = {
  list: async () => {
    const response = await api.get('/incomes');
    return response.data;
  },
  create: async (income: any) => {
    const response = await api.post('/incomes', income);
    return response.data;
  },
  update: async (id: string, income: any) => {
    const response = await api.put(`/incomes/${id}`, income);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/incomes/${id}`);
    return response.data;
  },
};