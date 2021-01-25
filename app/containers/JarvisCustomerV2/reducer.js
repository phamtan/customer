/*
 *
 * JarvisCustomerV2 reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SAVE_DATA,
  API_CALL_REQUEST,
  API_CALL_SUCCESS,
  API_CALL_FAILURE,
  REQUEST_PROVINCES_SUCCESS,
  REQUEST_PROVINCES_FAILURE,
} from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const jarvisCustomerV2Reducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case DEFAULT_ACTION:
        break;
      case SAVE_DATA:
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        };
      case API_CALL_REQUEST:
        return { ...state, fetching: true, error: null };
      case API_CALL_SUCCESS:
        return { ...state, countries: action.payload };
      case API_CALL_FAILURE:
        return { ...state, countries: [] };
      case REQUEST_PROVINCES_SUCCESS:
        return { ...state, provinces: action.payload };
      case REQUEST_PROVINCES_FAILURE:
        return { ...state, provinces: [] };
    }
  });

export default jarvisCustomerV2Reducer;
