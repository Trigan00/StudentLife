import { axiosWithAuth } from '@/api/interceptors';
import { Class } from '@/types/classes.types';

export const classService = {
  async getAll() {
    const response = await axiosWithAuth.get<Class[]>('/classes');
    return response;
  },
};
