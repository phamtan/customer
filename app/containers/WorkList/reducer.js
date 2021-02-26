/*
 *
 * WorkList reducer
 *
 */
import produce from 'immer';
import { DEFAULT_ACTION, GET_WORKLIST_SUCCESS } from './constants';

export const initialState = {};

/* eslint-disable default-case, no-param-reassign */
const workListReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case GET_WORKLIST_SUCCESS:
        return {
          ...state,
          workList: action.payload,
        };
      case DEFAULT_ACTION:
        break;
    }
  });

export default workListReducer;
