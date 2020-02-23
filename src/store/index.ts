/* eslint-disable no-unused-vars */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { RequestState } from './reducers/request';

export interface StoreState {
  request: RequestState
}

export default createStore(reducer, applyMiddleware(thunk));
