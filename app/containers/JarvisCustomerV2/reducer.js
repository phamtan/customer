/*
 *
 * JarvisCustomerV2 reducer
 *
 */
import produce from 'immer';
import {
  DEFAULT_ACTION,
  SAVE_DATA,
  REQUEST_COUNTRIES,
  REQUEST_COUNTRIES_SUCCESS,
  REQUEST_COUNTRIES_FAILURE,
  REQUEST_PROVINCES_SUCCESS,
  REQUEST_PROVINCES_FAILURE,
  SAVE_DATA_SUCCESS,
  SAVE_RAW_DATA,
  REQUEST_SELECTION_SUCCESS,
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
      case SAVE_RAW_DATA:
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        };  
      case REQUEST_COUNTRIES:
        return { ...state, fetching: true, error: null };
      case REQUEST_COUNTRIES_SUCCESS:
        return { ...state, countries: action.payload };
      case REQUEST_COUNTRIES_FAILURE:
        return { ...state, countries: [] };
      case REQUEST_PROVINCES_SUCCESS:
        return { ...state, provinces: action.payload };
      case REQUEST_SELECTION_SUCCESS:
        return { ...state, selections: action.payload };
      case REQUEST_PROVINCES_FAILURE:
        return { ...state, provinces: [] };
      case SAVE_DATA_SUCCESS: 
        return {
          ...state,
          jarvisCustomer: {
            ...state.jarvisCustomer,
            ...action.payload,
          },
        }
        
    }
  });

export default jarvisCustomerV2Reducer;
