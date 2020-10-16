import { call, put, takeLatest, all } from 'redux-saga/effects';
import * as Api from 'utils/request';
import { getProfessionsSuccess, getProfessionsError } from './actions';
import { GET_PROFESSIONS_PENDING } from './constants';

export function* getProfessions() {
  const payload = {
    url: '/professions',
    params: null,
    apiName: 'get professions',
  };
  try {
    const respond = yield call(Api.get, payload);
    const prosessedData = respond.data.map(({ name: label, ...rest }) => ({
      label,
      ...rest,
    }));
    respond.data = prosessedData;
    yield put(getProfessionsSuccess(respond));
  } catch (err) {
    yield put(getProfessionsError(err));
  }
}

export default function* watchAll() {
  yield all([takeLatest(GET_PROFESSIONS_PENDING, getProfessions)]);
}
