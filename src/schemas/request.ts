/* eslint-disable no-unused-vars */
import { Dictionary, RequestType } from './global';

export interface RequestQuery {
  method?: string,
  URL?: string,
}
export interface KeyValue {
  key: string | undefined,
  value: string | undefined,
}
export interface RequestModel {
  readonly id: string,
  type: RequestType,
  url: string,
  headers: Dictionary,
  params: Dictionary,
  body: string,
  mocker?: string,
}
