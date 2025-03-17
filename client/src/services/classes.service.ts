import { axiosWithAuth } from '@/api/interceptors';
import { Class, CreateClassDto, UpdateClassDto } from '@/types/classes.types';

export const classService = {
  async getAll() {
    const response = await axiosWithAuth.get<Class[]>('/classes');
    return response;
  },

  async getOne(id: number) {
    const response = await axiosWithAuth.get<Class>('/classes/' + id);
    return response;
  },

  async create(data: CreateClassDto) {
    const response = await axiosWithAuth.post<{ message: string }>(
      '/classes',
      data,
    );
    return response;
  },

  async update(data: UpdateClassDto) {
    const response = await axiosWithAuth.patch<{ message: string }>(
      '/classes/' + data.id,
      data,
    );
    return response;
  },

  async delete(id: number) {
    const response = await axiosWithAuth.delete<{ message: string }>(
      '/classes/' + id,
    );
    return response;
  },
};
