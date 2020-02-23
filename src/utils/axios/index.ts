import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from './config';
import { AxiosResponse } from 'axios';

const service: AxiosInstance = axios.create(config);

service.interceptors.request.use((config: AxiosRequestConfig) => {
  return config;
}, (error: any) => {
  return Promise.reject(error);
});

service.interceptors.response.use((res: AxiosResponse) => {
  // TODO
  if (res.status === 200) {
    return res.data;
  }
  return res;
}, (error: any) => {
  return Promise.reject(error);
});

export default service;
