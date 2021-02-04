import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import { values } from 'lodash';
import {
  REQUEST_COUNTRIES,
  REQUEST_OTP,
  SAVE_DATA,
  VERIFY_OTP,
  CHECK_LOS_ROUND1,
  SAVE_RAW_DATA,
  UPLOAD_VIDEO_PENDING,
  CHECK_LOS_RESULT_ROUND1,
  CHECK_LOS_ROUND2,
  SAVE_DATA_APP,
  UPLOAD_OCR_FRONT,
  UPLOAD_OCR_BACK,
  FACE_MATCHING,
} from './constants';
import {
  callapiSuccess,
  callapiErorr,
  getProvincesSuccess,
  checkLosResult,
  requestOtp,
  createApplicationSuccess,
  getSelectionSuccess,
} from './actions';

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
    yield put(
      requestOtp({
        phoneOrEmail: response.mobileNumber,
      }),
    );
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* saveDataApplicationSaga(action) {
  const payload = {
    url: '/customer/save',
    params: null,
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);

    yield put(createApplicationSuccess(response));
    if (values.program) {
      yield put(
        checkLosResult(
          { appId: response.id, round: 'Check_2' },
          action.resolve,
          action.reject,
        ),
      );
    } else {
      yield put(
        checkLosResult(
          { appId: response.id, round: 'Check_1' },
          action.resolve,
          action.reject,
        ),
      );
    }
    action.resolve(response);
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
    yield call(Api.post, payload);
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
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* checkLosRound2(action) {
  const payload = {
    url: '/c-flow/check-round-two',
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadLiveness(action) {
  const formData = new FormData();
  formData.append('video', action.payload.video);
  const payload = {
    url: `/jarvis-bio/customer-liveness/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* saveRawDataSaga(action) {
  try {
    action.resolve(1);
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* checkLosResultSaga(action) {
  const payload = {
    url: `/c-flow/check-result-los/${action.payload.appId}`,
    params: {
      step: action.payload.round,
    },
  };

  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* uploadOCRFrontSaga(action) {
  const formData = new FormData();
  formData.append('imgFront', action.payload.imgFront);
  const payload = {
    url: `/jarvis-bio/customer-orcFront/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadOCRBackSaga(action) {
  const formData = new FormData();
  formData.append('imgBack', action.payload.imgBack);
  const payload = {
    url: `/jarvis-bio/customer-ocrBack/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
  }
}

function* faceMatchingSaga(action) {
  const payload = {
    url: `/jarvis-bio/customer-facematching/${action.payload.customerId}`,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    yield put(callapiErorr());
    action.reject(error);
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
    takeEvery(CHECK_LOS_RESULT_ROUND1, checkLosResultSaga),
    takeEvery(CHECK_LOS_ROUND2, checkLosRound2),
    takeEvery(SAVE_DATA_APP, saveDataApplicationSaga),
    takeEvery(UPLOAD_OCR_BACK, uploadOCRBackSaga),
    takeEvery(UPLOAD_OCR_FRONT, uploadOCRFrontSaga),
    takeEvery(FACE_MATCHING, faceMatchingSaga),
  ]);
}
