import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import { REQUEST_COUNTRIES, REQUEST_OTP, SAVE_DATA, VERIFY_OTP } from './constants';
import {callapiSuccess, callapiErorr, getProvincesSuccess, createApplication, requestOtp} from './actions'

function* fetchCountriesSaga() {
  const payload = {
    url: '/countries',
    params: null,
  };
  const payloadProvinces = {
    url: '/provinces',
    params: null,
  };
  try {
    const [countries, provinces] = yield all([
      call(Api.get, payload),
      call(Api.get, payloadProvinces),
    ]);
    yield put(callapiSuccess(countries));
    yield put(getProvincesSuccess(provinces));
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* saveApplicationSaga(action) {
  const payload = {
    url: '/customer/save',
    params: null,
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
    yield put(requestOtp({
      phoneOrEmail: response.mobileNumber
    }));
    return Promise.resolve(payload)
  } catch (error) {
    yield put(callapiErorr());
    return Promise.reject(error);
  }
}

function* requestOtpSaga(action) {
  const payload = {
    url: '/esb/assign-otp',
    params: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
    return Promise.resolve(payload)
  } catch (error) {
    yield put(callapiErorr());
    return Promise.reject(error);
  }
}

function* verifyOtpSaga(action, resolve, reject) {
  const payload = {
    url: '/esb/verify-otp',
    params: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
    resolve(response)
  } catch (error) {
    yield put(callapiErorr());
  }
}

export default function* jarvisCustomerV2Saga() {
  yield all([
    takeEvery(REQUEST_COUNTRIES, fetchCountriesSaga),
    takeEvery(SAVE_DATA, saveApplicationSaga),
    takeEvery(REQUEST_OTP, requestOtpSaga),
    takeEvery(VERIFY_OTP, verifyOtpSaga),
  ]);
}
