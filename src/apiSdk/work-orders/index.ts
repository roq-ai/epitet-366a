import axios from 'axios';
import queryString from 'query-string';
import { WorkOrderInterface, WorkOrderGetQueryInterface } from 'interfaces/work-order';
import { GetQueryInterface } from '../../interfaces';

export const getWorkOrders = async (query?: WorkOrderGetQueryInterface) => {
  const response = await axios.get(`/api/work-orders${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createWorkOrder = async (workOrder: WorkOrderInterface) => {
  const response = await axios.post('/api/work-orders', workOrder);
  return response.data;
};

export const updateWorkOrderById = async (id: string, workOrder: WorkOrderInterface) => {
  const response = await axios.put(`/api/work-orders/${id}`, workOrder);
  return response.data;
};

export const getWorkOrderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/work-orders/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteWorkOrderById = async (id: string) => {
  const response = await axios.delete(`/api/work-orders/${id}`);
  return response.data;
};
