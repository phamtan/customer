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
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function saveData(form) {
  return {
    type: SAVE_DATA,
    payload: form,
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