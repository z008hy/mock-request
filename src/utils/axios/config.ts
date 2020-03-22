import { AxiosRequestConfig } from 'axios';

export const proxyConfig: AxiosRequestConfig = {
  baseURL: '//localhost:3000',
  // TODO
  transformResponse: [(data) => {
    return data;
  }],
  timeout: 3000,
  withCredentials: false,
  // responseType: 'json',
  validateStatus: (status: number) => (status >= 200 && status < 300),
};

export const requestConfig: AxiosRequestConfig = {
  baseURL: '//localhost:3000',
  // TODO
  transformResponse: [(data) => {
    return data;
  }],
  timeout: 3000,
  withCredentials: false,
  responseType: 'json',
  validateStatus: (status: number) => (status >= 200 && status < 300),
};
