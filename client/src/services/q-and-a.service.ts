import { axiosWithAuth } from '@/api/interceptors';
import { QandA } from '@/types/q-and-a.types';

export const QandAService = {
  async getAll(classId: number) {
    const response = await axiosWithAuth.get<QandA[]>(
      '/exam-qand-a/' + classId,
    );
    return response;
  },

  async getOne(id: number) {
    const response = await axiosWithAuth.get<QandA>('/exam-qand-a/' + id);
    return response;
  },

  async create(data: FormData) {
    const response = await axiosWithAuth.post<{
      message: string;
      classId: number;
    }>('/exam-qand-a', data);
    return response;
  },

  async update(id: number, data: FormData) {
    const response = await axiosWithAuth.patch<{ message: string }>(
      '/exam-qand-a/' + id,
      data,
    );
    return response;
  },

  async delete(id: number) {
    const response = await axiosWithAuth.delete<{
      message: string;
      classId: number;
    }>('/exam-qand-a/' + id);
    return response;
  },
};
