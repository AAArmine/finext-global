import { AxiosRequestConfig } from 'axios';
import { store } from 'redux/store';

export const setAxiosHeader = (
  options: AxiosRequestConfig
): AxiosRequestConfig => {
  const { token } = store.getState().auth;
  if (token && options && options.headers) {
    options.headers['token'] = `${token}`;
  }
  return options;
};
