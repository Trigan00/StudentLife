import { axiosClassic } from '@/api/interceptors';
import {
  IAuthForm,
  IAuthResponse,
  IAuthRecoveryForm,
} from '@/types/auth.types';
import { saveTokenStorage, removeFromStorage } from './auth-token.service';

export const authService = {
  async main(type: 'login' | 'registration', data: IAuthForm) {
    const response = await axiosClassic.post<IAuthResponse>(
      `/auth/${type}/`,
      data,
    );
    if (response.data.token && type === 'login') {
      saveTokenStorage(response.data.token);
    }
    return response;
  },

  async getNewTokens() {
    const response = await axiosClassic.post<IAuthResponse>('/auth/refresh');

    if (response.data.token) saveTokenStorage(response.data.token);

    return response;
  },

  async logout() {
    const response = await axiosClassic.post<boolean>('/auth/logout/');

    if (response.data) removeFromStorage();

    return response;
  },

  async recovery(
    type: 'forgotpassword' | 'resetpassword',
    data: IAuthRecoveryForm,
    token: string | null,
  ) {
    const response = await axiosClassic.post<true>(
      `/auth/${type}/`,
      type === 'forgotpassword'
        ? { email: data.email }
        : { password: data.password, token },
    );
    return response;
  },
};
