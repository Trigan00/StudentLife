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

  async getProfile() {
    const response = await axiosWithAuth.get<{
      user: IUser;
      completed: number;
      overdue: number;
      notCompleted: number;
    }>('/users/profile');
    return response.data;
  },

  async update(data: { username: string }) {
    const response = await axiosWithAuth.patch<{
      message: string;
    }>('/users', data);
    return response;
  },
};
