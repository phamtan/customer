import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as api from 'utils/request';
import { API_CALL_REQUEST } from './constants';

function* fetchCountriesSaga() {
  const param = {
    url: '/posts',
    params: null,
  };
  const paramProvinces = {
    url: '/comments',
    params: null,
  };
  try {
    const response = yield call(api.get(param));
    // const [countries, provinces] = yield all([
    //   call(api.get(param)),
    //   call(api.get(paramProvinces)),
    // ]);
    console.log(response.data);
    // console.log(provinces);
    // yield put({ type: 'API_CALL_SUCCESS', data });
  } catch (error) {
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}

// function* fetchProvinceSaga() {
//   const param = {
//     url: '/countries',
//     params: null,
//   };
//   try {
//     const response = yield call(api.get(param));
//     const { data } = response;
//     yield put({ type: 'API_CALL_SUCCESS', data });
//   } catch (error) {
//     yield put({ type: 'API_CALL_FAILURE', error });
//   }
// }

export default function* jarvisCustomerV2Saga() {
  // See example in containers/HomePage/saga.js
  yield takeEvery('API_CALL_REQUEST', fetchCountriesSaga);
  // yield takeEvery(API_CALL_REQUEST, fetchProvinceSaga);
}
