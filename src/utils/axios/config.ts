import { AxiosRequestConfig } from 'axios';

const axiosCondig: AxiosRequestConfig = {
  baseURL: '//localhost:8080',
  // TODO
  transformResponse: [(data) => {
    return data;
  }],
  timeout: 3000,
  withCredentials: true,
  responseType: 'json',
  validateStatus: (status: number) => (status >= 200 && status < 300),
};

export default axiosCondig;
