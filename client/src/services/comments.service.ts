import { axiosWithAuth } from '@/api/interceptors';
import { Comment, UpdateCommentDto } from '@/types/comments.types';

export const commentsService = {
  async getAll(taskId: number) {
    const response = await axiosWithAuth.get<Comment[]>('/comments/' + taskId);
    return response;
  },

  async getOne(id: number) {
    const response = await axiosWithAuth.get<Comment>('/comments/' + id);
    return response;
  },

  async create(data: FormData) {
    const response = await axiosWithAuth.post<{ message: string }>(
      '/comments',
      data,
    );
    return response;
  },

  async update(data: UpdateCommentDto) {
    const response = await axiosWithAuth.patch<{ message: string }>(
      '/comments/' + data.id,
      data,
    );
    return response;
  },

  async delete(id: number) {
    const response = await axiosWithAuth.delete<{ message: string }>(
      '/comments/' + id,
    );
    return response;
  },
};
