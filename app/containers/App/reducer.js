import produce from 'immer';
import {
  DEFAULT_ACTION,
  REQUEST_PENDING,
  REQUEST_SUCCESS,
  REQUEST_ERROR,
  GET_PROFESSIONS_PENDING,
  GET_PROFESSIONS_SUCCESS,
  GET_PROFESSIONS_ERROR,
} from './constants';

export const initialState = {
  loading: false,
  professions: [],
  locations: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  // eslint-disable-next-line consistent-return
  produce(state, (/* draft */) => {
    switch (action.type) {
      case REQUEST_PENDING:
        return { ...state, loading: true };
      case REQUEST_SUCCESS:
        return { ...state, loading: false };
      case REQUEST_ERROR:
        return { ...state, loading: false };
      case GET_PROFESSIONS_PENDING:
        return { ...state, loading: true };
      case GET_PROFESSIONS_SUCCESS:
        return { ...state, professions: action.respond.data, loading: false };
      case GET_PROFESSIONS_ERROR:
        return { ...state, loading: false };
      case DEFAULT_ACTION:
        break;
    }
  });

export default appReducer;
