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
  REQUEST_COMPANIES_SUCCESS,
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
  GET_ALL_CARD_SUCCESS,
  GET_BRANCHES_SUCCESS,
  GET_BRANCHES,
  GET_DOC_REQUIRED,
  GET_DOC_REQUIRED_SUCCESS,
  UPLOAD_DOCUMENT,
  GET_DOC_APP,
  GET_DOC_APP_SUCCESS,
  UPLOAD_DOCUMENT_SUCCESS,
  GET_SHOW_VIRTUAL_CARD,
  GET_SHOW_VIRTUAL_CARD_SUCCESS,
  CHECK_LOS_ROUND3,
  SHOW_LOADING,
  HIDE_LOADING,
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

export function getCompaniesSuccess(data) {
  return {
    type: REQUEST_COMPANIES_SUCCESS,
    payload: data,
  };
}

export function getAllCard() {
  return {
    type: GET_ALL_CARD,
  };
}

export function getAllCardSuccess(data) {
  return {
    type: GET_ALL_CARD_SUCCESS,
    payload: data,
  };
}

export function getBranches() {
  return {
    type: GET_BRANCHES,
  };
}

export function getBranchesSuccess(data) {
  return {
    type: GET_BRANCHES_SUCCESS,
    payload: data,
  };
}

export function getDocRequired(data) {
  return {
    type: GET_DOC_REQUIRED,
    payload: data,
  };
}

export function getDocRequiredSuccess(data) {
  return {
    type: GET_DOC_REQUIRED_SUCCESS,
    payload: data,
  };
}

export function getDocApp(data) {
  return {
    type: GET_DOC_APP,
    payload: data,
  };
}

export function getDocAppSuccess(data) {
  return {
    type: GET_DOC_APP_SUCCESS,
    payload: data,
  };
}

export function uploadDocument(data, resolve, reject) {
  return {
    type: UPLOAD_DOCUMENT,
    payload: data,
    resolve,
    reject,
  };
}

export function uploadDocumentSuccess(data) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    payload: data,
  };
}

export function getCompaniesSearch(data) {
  return {
    type: REQUEST_COMPANIES_SEARCH,
    payload: data,
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
    reject,
  };
}

export function checkLosRound1(data, resolve, reject) {
  return {
    type: CHECK_LOS_ROUND1,
    payload: data,
    resolve,
    reject,
  };
}

export function uploadLiveNess(data, resolve, reject) {
  return {
    type: UPLOAD_VIDEO_PENDING,
    payload: data,
    resolve,
    reject,
  };
}

export function uploadOCRFront(data, resolve, reject) {
  return {
    type: UPLOAD_OCR_FRONT,
    payload: data,
    resolve,
    reject,
  };
}

export function uploadOCRBack(data, resolve, reject) {
  return {
    type: UPLOAD_OCR_BACK,
    payload: data,
    resolve,
    reject,
  };
}

export function checkLosResult(data, resolve, reject) {
  return {
    type: CHECK_LOS_RESULT_ROUND1,
    payload: data,
    resolve,
    reject,
  };
}

export function checkLosRound2(data, resolve, reject) {
  return {
    type: CHECK_LOS_ROUND2,
    payload: data,
    resolve,
    reject,
  };
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

export function register(data, resolve, reject) {
  return {
    type: REGISTER,
    payload: data,
    resolve,
    reject,
  };
}

export function getDetailApp(data, resolve, reject) {
  return {
    type: GET_DETAIL,
    payload: data,
    resolve,
    reject,
  };
}

export function getAppDetailByToken() {
  return {
    type: GET_DETAIL_APP_BY_TOKEN,
  };
}

export function login(data, resolve, reject) {
  return {
    type: LOGIN,
    payload: data,
    resolve,
    reject,
  };
}

export function getShowVirtualCard(data) {
  return {
    type: GET_SHOW_VIRTUAL_CARD,
    payload: data,
  };
}

export function getShowVirtualCardSuccess(data) {
  return {
    type: GET_SHOW_VIRTUAL_CARD_SUCCESS,
    payload: data,
  };
}

export function checkLosRound3(data, resolve, reject) {
  return {
    type: CHECK_LOS_ROUND3,
    payload: data,
    resolve,
    reject,
  };
}

export function showLoading() {
  return {
    type: SHOW_LOADING,
  };
}

export function hideLoading() {
  return {
    type: HIDE_LOADING,
  };
}
