import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import { REQUEST_COUNTRIES, REQUEST_OTP, SAVE_DATA, VERIFY_OTP, CHECK_LOS_ROUND1, SAVE_RAW_DATA,
UPLOAD_VIDEO_PENDING } from './constants';
import {callapiSuccess, callapiErorr, getProvincesSuccess, createApplication, requestOtp, createApplicationSuccess, getSelectionSuccess} from './actions'

function* fetchCountriesSaga() {
  const payload = {
    url: '/countries',
    params: null,
  };
  const payloadProvinces = {
    url: '/provinces',
    params: null,
  };
  const payloadSelection = {
    url: '/selection-list-all',
    params: null,
  };
  try {
    const [countries, provinces, selections] = yield all([
      call(Api.get, payload),
      call(Api.get, payloadProvinces),
      call(Api.get, payloadSelection),
    ]);
    yield put(callapiSuccess(countries));
    yield put(getProvincesSuccess(provinces));
    yield put(getSelectionSuccess(selections));
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

    yield put(createApplicationSuccess(response));
    action.resolve(response);
    // yield put(getProvincesSuccess(provinces));
    yield put(requestOtp({
      phoneOrEmail: response.mobileNumber
    }));
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
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
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* verifyOtpSaga(action) {
  const payload = {
    url: '/esb/verify-otp',
    params: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
    action.resolve(response);
  } catch (error) {
    action.reject(error);
    yield put(callapiErorr());
  }
}

function* checkLosRound1(action) {
  const payload = {
    url: '/c-flow/check-round-one',
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadLiveness(action) {
  const formData = new FormData();
  formData.append("video", action.payload.video);
  const payload = {
    url: `/jarvis-bio/customer-liveness/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* saveRawDataSaga(action) {
  // const payload = {
  //   url: '/c-flow/check-round-one',
  //   data: action.payload,
  // };
  try {
    action.resolve(1);
    // const response = yield call(Api.post, payload);
    // yield put(callapiSuccess(countries));
    // yield put(getProvincesSuccess(provinces));
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
    takeEvery(CHECK_LOS_ROUND1, checkLosRound1),
    takeEvery(UPLOAD_VIDEO_PENDING, uploadLiveness),
    takeEvery(SAVE_RAW_DATA, saveRawDataSaga),
  ]);
}
