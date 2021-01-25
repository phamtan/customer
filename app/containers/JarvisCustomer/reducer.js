/*
 *
 * JarvisCustomer reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, SAVE_DATA } from './constants';

export const initialState = {
  jarvisCustomer: {}
};

/* eslint-disable default-case, no-param-reassign */
const jarvisCustomerReducer = (state = initialState, action) =>
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
    }
  });

export default jarvisCustomerReducer;
