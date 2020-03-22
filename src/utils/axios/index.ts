import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { proxyConfig, requestConfig } from './config';

const proxyService: AxiosInstance = axios.create(proxyConfig);

proxyService.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

proxyService.interceptors.response.use((res: AxiosResponse) => {
  return res;
}, (error: any) => {
  return Promise.reject(error);
});

const requestService: AxiosInstance = axios.create(requestConfig);

requestService.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

requestService.interceptors.response.use((res: AxiosResponse) => {
  if (res.status === 200) {
    return res.data;
  }
  return res;
}, (error: any) => {
  return Promise.reject(error);
});

export { proxyService, requestService };
