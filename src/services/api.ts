import { convertToFormData } from '../utils/formData';
import { setAxiosHeader } from '../utils/headers';
import axios, { AxiosRequestConfig } from 'axios';
import { loading } from 'redux/slices/loadingSlice';
import { store } from '../redux/store';
import { login, verifyUser } from 'redux/slices/authSlice';

const { dispatch } = store;
const state = store.getState();

export const axiosApiConfig = {
  baseURL: `https://exchange.finext.global/api/v1.3/`,
  timeout: 15000,
  headers: {
    // 'Content-Type': 'application/json'
  }
};

const api = axios.create(axiosApiConfig);

api.interceptors.request.use(
  async function (options: AxiosRequestConfig) {
    const data = convertToFormData(options.data);
    const requestOptions = setAxiosHeader(options);
    if (!state.loading.visibility) {
      dispatch(loading(true));
    }
    return { ...requestOptions, data };
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  async (response) => {
    if (response.data.error === 90005) {
      dispatch(login(''));
      dispatch(verifyUser(false));
    }
    dispatch(loading(false));
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
