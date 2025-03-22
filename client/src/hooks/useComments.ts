import { errorCatch } from '@/api/error';
import { commentsService } from '@/services/comments.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useAllComments(taskId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => commentsService.getAll(taskId),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useAddComment(taskId: number, onSuccessFunc: () => void) {
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: (data: FormData) => commentsService.create(data),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['comments', taskId],
      });
      toast.success(res.data.message);
      onSuccessFunc();
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  return { addComment, isPending };
}

export function useDeleteComment(taskId: number, onDelete?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete comments'],
    mutationFn: (id: number) => commentsService.delete(id),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['comments', taskId],
      });
      onDelete && onDelete();
      toast.success(res.data.message);
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { deleteComment, isDeletePending };
}
