import { axiosWithAuth } from '@/api/interceptors';
import { CreateTaskDto, Task, UpdateTaskDto } from '@/types/tasks.types';

export const tasksService = {
  async getAll() {
    const response = await axiosWithAuth.get<Task[]>('/tasks');
    return response;
  },

  async getOne(id: number) {
    const response = await axiosWithAuth.get<Task>('/tasks/' + id);
    return response;
  },

  async create(data: CreateTaskDto) {
    const response = await axiosWithAuth.post<{ message: string }>(
      '/tasks',
      data,
    );
    return response;
  },

  async update(data: UpdateTaskDto) {
    const response = await axiosWithAuth.patch<{ id: number; message: string }>(
      '/tasks/' + data.id,
      data,
    );
    return response;
  },

  async delete(id: number) {
    const response = await axiosWithAuth.delete<{ message: string }>(
      '/tasks/' + id,
    );
    return response;
  },
};
