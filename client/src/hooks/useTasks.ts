import { errorCatch } from '@/api/error';
import { tasksService } from '@/services/tasks.service';
import { CreateTaskDto, UpdateTaskDto } from '@/types/tasks.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useAllTasks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => tasksService.getAll(),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useTasksBySubject(classId: number, deadline: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['tasksBySubject', classId],
    queryFn: () => tasksService.getBySubject(classId, deadline),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useOneTask(id?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['task', id],
    queryFn: () => tasksService.getOne(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useAddTask(onSuccessFunc: () => void) {
  const queryClient = useQueryClient();

  const { mutate: addTask, isPending } = useMutation({
    mutationFn: (data: CreateTaskDto) => tasksService.create(data),
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasksBySubject', res.data.classId],
      });
      onSuccessFunc();
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  return { addTask, isPending };
}

export function useUpdateTask(id?: number, onSuccessFunc?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isPending } = useMutation({
    mutationKey: ['task', id],
    mutationFn: (data: UpdateTaskDto) => tasksService.update(data),
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      queryClient.invalidateQueries({
        queryKey: ['task', res.data.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasksBySubject', res.data.classId],
      });
      onSuccessFunc && onSuccessFunc();
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { updateTask, isPending };
}

export function useDeleteTask(onDelete: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteTask, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete task'],
    mutationFn: (id: number) => tasksService.delete(id),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      queryClient.invalidateQueries({
        queryKey: ['tasksBySubject', res.data.classId],
      });
      onDelete();
      toast.success(res.data.message);
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { deleteTask, isDeletePending };
}
