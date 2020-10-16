import axios from 'axios';
import { store } from 'react-notifications-component';
import { ROOT_URI, API_TIMEOUT } from './constants';

const instance = axios.create({
  baseURL: ROOT_URI,
  timeout: API_TIMEOUT,
});

const sendRequest = ({ url, method, params, data, apiName = '' }) =>
  instance({
    url,
    method,
    params,
    data,
    headers: {
      Authorization: localStorage.getItem('token') || '',
    },
  })
    .then(response => handleSuccess(response.data, apiName))
    .catch(error => handleError(error, apiName));

export const get = ({ url, params, apiName }) =>
  sendRequest({ url, params, method: 'GET', apiName });

export const post = ({ url, params, data, apiName }) =>
  sendRequest({ url, params, data, method: 'POST', apiName });

export const put = ({ url, params, data, apiName }) =>
  sendRequest({ url, params, data, method: 'PUT', apiName });

export const deleteData = ({ url, params, data, apiName }) =>
  sendRequest({ url, params, data, method: 'DELETE', apiName });

const handleSuccess = (respond, apiName) => {
  if (apiName) {
    const message = `${apiName} is succeed`;

    store.addNotification({
      message,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 2000,
      },
    });
  }
  return Promise.resolve(respond);
};

const handleError = (error, apiName) => {
  let message = `Something went wrong`;
  if (error.response) {
    if (error.response.data) {
      message = error.response.data.error || error.response.data.message;
    }
  }

  message = `${apiName} is failed`;

  store.addNotification({
    message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 2000,
    },
  });
  return Promise.reject(error);
};
