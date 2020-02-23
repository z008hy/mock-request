/* eslint-disable no-unused-vars */
import { Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RequestActionType } from '../reducers/request';
import { getRequests } from '../../services/request';
import { RequestModel, RequestQuery } from '../../schemas/request';
import { ListResponse, Pagination } from '../../schemas/global';

export function pullRequests(res: ListResponse<RequestModel>) {
  return {
    type: RequestActionType.GetList,
    data: res,
  };
}

export const pullRequestsAsync = (
  pagination: Pagination,
  requestQuery?: RequestQuery,
): ThunkAction<Promise<void>, any, unknown, AnyAction> => async (dispatch: Dispatch) => {
  const res: ListResponse<RequestModel> = await getRequests(pagination, requestQuery);
  dispatch(pullRequests(res));
};
