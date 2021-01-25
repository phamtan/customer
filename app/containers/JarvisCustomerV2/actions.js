/*
 *
 * JarvisCustomer actions
 *
 */

import {
  DEFAULT_ACTION,
  SAVE_DATA,
  API_CALL_REQUEST,
  API_CALL_FAILURE,
  API_CALL_SUCCESS,
  REQUEST_PROVINCES,
  REQUEST_PROVINCES_SUCCESS,
  REQUEST_PROVINCES_FAILURE,
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

export function callapi() {
  return {
    type: API_CALL_REQUEST,
  };
}

export function callapiSuccess() {
  return {
    type: API_CALL_SUCCESS,
  };
}

export function callapiEror() {
  return {
    type: API_CALL_FAILURE,
  };
}

export function getProvinces() {
  return {
    type: REQUEST_PROVINCES,
  };
}

export function getProvincesSuccess() {
  return {
    type: REQUEST_PROVINCES_SUCCESS,
  };
}

export function getProvincesError() {
  return {
    type: REQUEST_PROVINCES_FAILURE,
  };
}
