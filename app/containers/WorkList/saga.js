import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import { GET_WORKLIST } from './constants';
import { getWorkListDataSuccess } from './actions';

function* fetchWorkListData(action) {
  const payload = {
    url: '/admin/application/list',
    params: action.payload,
  };

  try {
    const workListData = yield call(Api.get, payload);
    yield put(getWorkListDataSuccess(workListData));
  } catch (error) {}
}

// Individual exports for testing
export default function* workListSaga() {
  // See example in containers/HomePage/saga.js
  yield all([takeEvery(GET_WORKLIST, fetchWorkListData)]);
}
