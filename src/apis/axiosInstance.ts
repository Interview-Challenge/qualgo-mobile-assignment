import axios from 'axios';
import {BASE_URL, ACCESS_TOKEN} from '@env';
import CAlertProvider from '@/components/common/CAlert';
import Localization from '@/utils/localization.ts';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
    console.log('Config', config);
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

const isNetworkError = (err: any) => {
  return !!err.isAxiosError && !err.response;
};

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log('API ERROR:', error);
    if (isNetworkError(error)) {
      CAlertProvider.showAlert({
        title: Localization.t('ALERT.NETWORK_ERROR.TITLE'),
        type: 'error',
      });
    }
    return Promise.reject(error.response || error.request);
  },
);

export default axiosInstance;
