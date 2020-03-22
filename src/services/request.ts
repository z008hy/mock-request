/* eslint-disable no-unused-vars */
import { requestService } from '../utils/axios';
import { RequestModel, RequestQuery } from '../schemas/request';
import { Pagination, ListResponse } from '../schemas/global';

export interface IListResponse<T>{
  current: number,
  pageSize: number,
  total: number,
  items: T[]
}

export const getRequests = async (pagination: Pagination, requestQuery?: RequestQuery) => {
  const res: ListResponse<RequestModel> = await requestService.get('/request', {
    params: {
      current: pagination.current,
      size: pagination.pageSize,
      ...requestQuery,
    },
  });
  return res;
};
