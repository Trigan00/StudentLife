import axios, { type CreateAxiosDefaults } from 'axios';

import { errorCatch } from './error';
import { toast } from 'sonner';
import {
  getAccessToken,
  removeFromStorage,
} from '@/services/auth-token.service';
import { authService } from '@/services/auth.service';

const options: CreateAxiosDefaults = {
  baseURL: process.env.REACT_APP_SERVERURL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error?.response?.status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await authService.getNewTokens();
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        toast.error('Нет авторизации');
        removeFromStorage();
      }
    }

    throw error;
  },
);

export { axiosClassic, axiosWithAuth };
