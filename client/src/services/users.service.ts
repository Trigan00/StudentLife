import { axiosWithAuth } from '@/api/interceptors';
import { IUser } from '@/types/auth.types';

export const usersService = {
  async searchUsers(query: string) {
    const response = await axiosWithAuth.get<IUser[]>('/users/search', {
      params: {
        query,
      },
    });
    return response.data;
  },
};
