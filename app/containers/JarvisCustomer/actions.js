/*
 *
 * JarvisCustomer actions
 *
 */

import { DEFAULT_ACTION, SAVE_DATA } from './constants';

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
