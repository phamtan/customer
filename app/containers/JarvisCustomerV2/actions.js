/*
 *
 * JarvisCustomer actions
 *
 */

import {
  DEFAULT_ACTION,
  SAVE_DATA,
  REQUEST_COUNTRIES,
  REQUEST_COUNTRIES_SUCCESS,
  REQUEST_COUNTRIES_FAILURE,
  REQUEST_PROVINCES,
  REQUEST_PROVINCES_SUCCESS,
  REQUEST_PROVINCES_FAILURE,
  SAVE_DATA_SUCCESS,
  REQUEST_OTP,
  VERIFY_OTP,
  CHECK_LOS_ROUND1,
  SAVE_RAW_DATA,
  UPLOAD_VIDEO_PENDING,
  REQUEST_SELECTION_SUCCESS,
  CHECK_LOS_RESULT_ROUND1,
  CHECK_LOS_ROUND2,
  CHECK_LOS_RESULT_ROUND2,
  SAVE_DATA_APP,
  UPLOAD_OCR_FRONT,
  UPLOAD_OCR_BACK,
  FACE_MATCHING,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveData(form, resolve, reject) {
  return {
    type: SAVE_DATA,
    payload: form,
    resolve,
    reject,
  };
}

export function saveRawData(form, resolve, reject) {
  return {
    type: SAVE_RAW_DATA,
    payload: form,
    resolve,
    reject,
  };
}

export function createApplication(form) {
  return {
    type: SAVE_DATA,
    payload: form,
  };
}


export function callapi() {
  return {
    type: REQUEST_COUNTRIES,
  };
}

export function callapiSuccess(data) {
  return {
    type: REQUEST_COUNTRIES_SUCCESS,
    payload: data,
  };
}

export function callapiErorr() {
  return {
    type: REQUEST_COUNTRIES_FAILURE,
  };
}

export function getProvinces() {
  return {
    type: REQUEST_PROVINCES,
  };
}

export function getProvincesSuccess(data) {
  return {
    type: REQUEST_PROVINCES_SUCCESS,
    payload: data,
  };
}

export function getSelectionSuccess(data) {
  return {
    type: REQUEST_SELECTION_SUCCESS,
    payload: data,
  };
}

export function getProvincesError() {
  return {
    type: REQUEST_PROVINCES_FAILURE,
  };
}

export function createApplicationSuccess(data) {
  return {
    type: SAVE_DATA_SUCCESS,
    payload: data,
  };
}

export function requestOtp(data) {
  return {
    type: REQUEST_OTP,
    payload: data,
  };
}

export function verifyOtp(data, resolve, reject) {
  return {
    type: VERIFY_OTP,
    payload: data,
    resolve,
    reject
  };
}

export function checkLosRound1(data, resolve, reject) {
  return {
    type: CHECK_LOS_ROUND1,
    payload: data,
    resolve,
    reject,
  }
}

export function uploadLiveNess(data, resolve, reject) {
  return {
    type: UPLOAD_VIDEO_PENDING,
    payload: data,
    resolve,
    reject,
  }
}

export function uploadOCRFront(data, resolve, reject) {
  return {
    type: UPLOAD_OCR_FRONT,
    payload: data,
    resolve,
    reject,
  }
}

export function uploadOCRBack(data, resolve, reject) {
  return {
    type: UPLOAD_OCR_BACK,
    payload: data,
    resolve,
    reject,
  }
}

export function checkLosResult(data, resolve, reject) {
  return {
    type: CHECK_LOS_RESULT_ROUND1,
    payload: data,
    resolve,
    reject,
  }
}

export function checkLosRound2(data, resolve, reject) {
  return {
    type: CHECK_LOS_ROUND2,
    payload: data,
    resolve,
    reject,
  }
}

export function saveDataApp(form, resolve, reject) {
  return {
    type: SAVE_DATA_APP,
    payload: form,
    resolve,
    reject,
  };
}

export function faceMatching(data, resolve, reject) {
  return {
    type: FACE_MATCHING,
    payload: data,
    resolve,
    reject,
  };
}