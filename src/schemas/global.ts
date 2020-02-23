/* eslint-disable no-unused-vars */

export enum RequestType {
  GET= 'GET',
  POST= 'POST',
  PUT= 'PUT',
  DELETE= 'DELETE',
}

export interface Dictionary {
  [key: string]: string,
}

export interface Pagination {
  current: number,
  pageSize: number,
  total: number,
}

export interface ListResponse<T>{
  current: number,
  pageSize: number,
  total: number,
  items: T[],
}
