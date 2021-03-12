import { takeEvery, call, put, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import moment from 'moment';
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
  REQUEST_COMPANIES_SEARCH,
  REGISTER,
  GET_DETAIL,
  GET_DETAIL_APP_BY_TOKEN,
  LOGIN,
  GET_ALL_CARD,
  GET_BRANCHES,
  GET_DOC_REQUIRED,
  UPLOAD_DOCUMENT,
  GET_DOC_APP,
  GET_SHOW_VIRTUAL_CARD,
  CHECK_LOS_ROUND3,
} from './constants';
import {
  callapiSuccess,
  callapiErorr,
  getProvincesSuccess,
  saveRawData,
  requestOtp,
  createApplicationSuccess,
  getSelectionSuccess,
  getCompaniesSuccess,
  getAllCardSuccess,
  getBranchesSuccess,
  getDocRequiredSuccess,
  getDocAppSuccess,
  uploadDocumentSuccess,
  getShowVirtualCardSuccess,
  showLoading,
  hideLoading,
} from './actions';

function* fetchCountriesSaga() {
  const payload = {
    url: '/c-flow/countries',
    params: null,
  };
  const payloadProvinces = {
    url: '/c-flow/provinces',
    params: null,
  };
  const payloadSelection = {
    url: '/c-flow/selection-list-all',
    params: null,
  };
  const payloadCompanies = {
    url: '/c-flow/companies',
    params: {
      searchKey: '',
    },
  };
  try {
    const [countries, provinces, selections, companies] = yield all([
      call(Api.get, payload),
      call(Api.get, payloadProvinces),
      call(Api.get, payloadSelection),
      call(Api.get, payloadCompanies),
    ]);
    yield put(callapiSuccess(countries));
    yield put(getProvincesSuccess(provinces));
    yield put(getSelectionSuccess(selections));
    yield put(getCompaniesSuccess(companies));
  } catch (error) {
    yield put(callapiErorr());
  }
}

function* fetchCardSaga() {
  const payloadCards = {
    url: '/credit-cards',
  };
  try {
    const cards = yield call(Api.get, payloadCards);
    yield put(getAllCardSuccess(cards));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* fetchBranchesSaga() {
  const payloadBranches = {
    url: '/branches',
  };
  try {
    const branches = yield call(Api.get, payloadBranches);
    yield put(getBranchesSuccess(branches));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* fetchDocRequiredSaga(action) {
  const payloadDocRequired = {
    url: `/c-flow/c-flow/get-doc-required/${action.payload.id}`,
  };
  try {
    const docRequired = yield call(Api.get, payloadDocRequired);
    yield put(getDocRequiredSuccess(docRequired));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* fetchDocAppSaga(action) {
  const payloadDocRequired = {
    url: `/c-flow/c-flow/get-docs-by-appid/${action.payload.id}`,
  };
  try {
    const docRequired = yield call(Api.post, payloadDocRequired);
    yield put(getDocAppSuccess(docRequired));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* saveApplicationSaga(action) {
  const payload = {
    url: '/c-flow/customer/save',
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
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* registerSaga(action) {
  yield put(showLoading());
  const payload = {
    url: '/c-flow/c-flow/register',
    params: null,
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);

    yield put(createApplicationSuccess(response));
    action.resolve(response);
    if (response.needVerifyOTP) {
      yield put(
        requestOtp({
          phoneOrEmail: response.mobileNumber,
        }),
      );
    }
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* saveDataApplicationSaga(action) {
  const payload = {
    url: '/c-flow/customer/save',
    params: null,
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);

    yield put(createApplicationSuccess(response));
    // if (values.hasResultR1) {
    //   yield put(
    //     checkLosResult(
    //       { appId: response.applicationId, round: 'Check_2' },
    //       action.resolve,
    //       action.reject,
    //     ),
    //   );
    // } else {
    //   yield put(
    //     checkLosResult(
    //       { appId: response.applicationId, round: 'Check_1' },
    //       action.resolve,
    //       action.reject,
    //     ),
    //   );
    // }
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* requestOtpSaga(action) {
  const payload = {
    url: '/c-flow/esb/assign-otp',
    params: action.payload,
  };
  try {
    yield call(Api.post, payload);
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* verifyOtpSaga(action) {
  const payload = {
    url: '/c-flow/esb/verify-otp',
    params: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    action.reject(error);
    // yield put(callapiErorr());
  }
}

function* checkLosRound1(action) {
  const payload = {
    url: '/c-flow/c-flow/check-round-one',
    params: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    yield put(createApplicationSuccess(action.payload));
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* checkLosRound2(action) {
  const payload = {
    url: '/c-flow/c-flow/check-round-two',
    data: action.payload,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadLiveness(action) {
  const formData = new FormData();
  formData.append('video', action.payload.video);
  const payload = {
    url: `/c-flow/jarvis-bio/customer-liveness/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* saveRawDataSaga(action) {
  try {
    action.resolve(1);
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* checkLosResultSaga(action) {
  const payload = {
    url: `/c-flow/c-flow/check-result-los/${action.payload.appId}`,
    params: {
      step: action.payload.round,
    },
  };

  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* uploadOCRFrontSaga(action) {
  const formData = new FormData();
  formData.append('imgFront', action.payload.imgFront);
  const payload = {
    url: `/c-flow/jarvis-bio/customer-orcFront/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadOCRBackSaga(action) {
  const formData = new FormData();
  formData.append('imgBack', action.payload.imgBack);
  const payload = {
    url: `/c-flow/jarvis-bio/customer-ocrBack/${action.payload.customerId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* faceMatchingSaga(action) {
  const payload = {
    url: `/c-flow/jarvis-bio/customer-facematching/${
      action.payload.customerId
    }`,
  };
  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* fetchCompaniesSearchSaga(action) {
  const payloadCompanies = {
    url: '/c-flow/companies',
    params: {
      searchKey: action.payload,
    },
  };
  try {
    const companies = yield call(Api.get, payloadCompanies);
    if (companies.length === 0) {
      companies.push({ code: 'others', name: 'Khác' });
    }
    yield put(getCompaniesSuccess(companies));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* getApplicationDataSaga(action) {
  const payload = {
    // url: `/customer/get-app-detail/${action.payload.custId}`,
    url: `/c-flow/customer/get-app-detail`,
    params: null,
  };
  try {
    const response = yield call(Api.get, payload);
    if (response.dob) {
      response.dob = moment(response.dob).format('DD/MM/YYYY');
    }
    yield put(createApplicationSuccess(response));
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* getApplicationByTokenSaga() {
  const payload = {
    url: `/c-flow/customer/get-app-detail`,
    params: null,
  };
  try {
    const response = yield call(Api.get, payload);

    yield put(createApplicationSuccess(response));
  } catch (error) {
    console.log(error);
  }
}

function* loginSaga(action) {
  const payload = {
    // url: `/customer/get-app-detail/${action.payload.custId}`,
    url: `/c-flow/c-flow/check-exist/${action.payload.mobileNumber}`,
    params: null,
  };
  try {
    const response = yield call(Api.get, payload);
    if (response.outputObject && response.outputObject === 'true') {
      yield put(
        requestOtp({
          phoneOrEmail: action.payload.mobileNumber,
        }),
      );
      yield put(saveRawData(action.payload));
      action.resolve(response);
    } else {
      action.reject('Số điện thoại chưa tồn tại');
    }
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* uploadDocumentSaga(action) {
  const formData = new FormData();
  formData.append('uploadingFiles', action.payload.multipartFile);
  formData.append('documentType', action.payload.documentType);
  const payload = {
    url: `/c-flow/c-flow/upload-docs/${action.payload.appId}`,
    data: formData,
  };
  try {
    const response = yield call(Api.post, payload);
    yield put(uploadDocumentSuccess(response[0]));
    action.resolve(response[0]);
  } catch (error) {
    // yield put(callapiErorr());
    action.reject(error);
  }
}

function* fetchShowVirtualCardSaga(action) {
  const payloadVirtualCard = {
    url: '/c-flow/virtual-cards/has-config',
    params: action.payload,
  };
  try {
    const docRequired = yield call(Api.get, payloadVirtualCard);
    yield put(getShowVirtualCardSuccess(docRequired));
  } catch (error) {
    // yield put(callapiErorr());
  }
}

function* checkLosRound3Saga(action) {
  const payload = {
    url: `/c-flow/c-flow/check-two-third`,
    params: {
      jarvisId: action.payload.jarvisId,
    },
  };

  try {
    const response = yield call(Api.post, payload);
    action.resolve(response);
  } catch (error) {
    // yield put(callapiErorr());
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
    takeEvery(REQUEST_COMPANIES_SEARCH, fetchCompaniesSearchSaga),
    takeEvery(REGISTER, registerSaga),
    takeEvery(GET_DETAIL, getApplicationDataSaga),
    takeEvery(LOGIN, loginSaga),
    takeEvery(GET_DETAIL_APP_BY_TOKEN, getApplicationByTokenSaga),
    takeEvery(GET_ALL_CARD, fetchCardSaga),
    takeEvery(GET_BRANCHES, fetchBranchesSaga),
    takeEvery(GET_DOC_REQUIRED, fetchDocRequiredSaga),
    takeEvery(UPLOAD_DOCUMENT, uploadDocumentSaga),
    takeEvery(GET_DOC_APP, fetchDocAppSaga),
    takeEvery(GET_SHOW_VIRTUAL_CARD, fetchShowVirtualCardSaga),
    takeEvery(CHECK_LOS_ROUND3, checkLosRound3Saga),
  ]);
}
