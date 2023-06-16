import axios from 'axios';
import queryString from 'query-string';
import { ServiceRequestInterface, ServiceRequestGetQueryInterface } from 'interfaces/service-request';
import { GetQueryInterface } from '../../interfaces';

export const getServiceRequests = async (query?: ServiceRequestGetQueryInterface) => {
  const response = await axios.get(`/api/service-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createServiceRequest = async (serviceRequest: ServiceRequestInterface) => {
  const response = await axios.post('/api/service-requests', serviceRequest);
  return response.data;
};

export const updateServiceRequestById = async (id: string, serviceRequest: ServiceRequestInterface) => {
  const response = await axios.put(`/api/service-requests/${id}`, serviceRequest);
  return response.data;
};

export const getServiceRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/service-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServiceRequestById = async (id: string) => {
  const response = await axios.delete(`/api/service-requests/${id}`);
  return response.data;
};
