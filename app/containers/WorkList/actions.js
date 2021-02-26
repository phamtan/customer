/*
 *
 * WorkList actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_WORKLIST_SUCCESS,
  GET_WORKLIST,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getWorkList(data) {
  return {
    type: GET_WORKLIST,
    payload: data,
  };
}

export function getWorkListDataSuccess(data) {
  return {
    type: GET_WORKLIST_SUCCESS,
    payload: data,
  };
}
