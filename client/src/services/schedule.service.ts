import { axiosWithAuth } from '@/api/interceptors';
import { Class } from '@/types/classes.types';

type ExtendedClass = Class & { time: string };
export const scheduleService = {
  async getSchedule() {
    const response = await axiosWithAuth.get<ExtendedClass[][]>('/schedule');
    return response;
  },
};
