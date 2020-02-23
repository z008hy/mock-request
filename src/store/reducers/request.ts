/* eslint-disable no-unused-vars */
import { RequestModel } from '../../schemas/request';
import { Pagination } from '../../schemas/global';

export enum RequestActionType {
  GetList,
}

export interface RequestState {
  requests: RequestModel[],
  pagination: Pagination,
}

export interface RequestAction<T> {
  type: RequestActionType,
  data: T,
}

const initState: RequestState = {
  requests: [],
  pagination: {
    current: 1,
    total: 0,
    pageSize: 10,
  },
};

export default function (state: RequestState = initState, action: RequestAction<any>): RequestState {
  if (action.type === RequestActionType.GetList) {
    return {
      requests: action.data.items,
      pagination: {
        current: action.data.current,
        total: action.data.total,
        pageSize: action.data.pageSize,
      },
    };
  }
  return state;
}
