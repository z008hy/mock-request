/* eslint-disable no-unused-vars */
import { Dictionary, RequestType } from './global';

export interface RequestQuery {
  method?: string,
  URL?: string,
}
export interface RequestModel {
  readonly id: string,
  method: RequestType,
  URL: string,
  headers: Dictionary,
  params: Dictionary,
  body: string
}
