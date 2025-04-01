import { axiosWithAuth } from '@/api/interceptors';
import { Class } from '@/types/classes.types';

export const scheduleService = {
  async getSchedule() {
    const response = await axiosWithAuth.get<Class[][]>('/schedule');
    return response;
  },
};
