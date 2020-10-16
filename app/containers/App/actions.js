import {
  DEFAULT_ACTION,
  GET_PROFESSIONS_PENDING,
  GET_PROFESSIONS_SUCCESS,
  GET_PROFESSIONS_ERROR,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function getProfessions() {
  return {
    type: GET_PROFESSIONS_PENDING,
  };
}

export function getProfessionsSuccess(respond) {
  return {
    type: GET_PROFESSIONS_SUCCESS,
    respond,
  };
}

export function getProfessionsError(error) {
  return {
    type: GET_PROFESSIONS_ERROR,
    error,
  };
}
