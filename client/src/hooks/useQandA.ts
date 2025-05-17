import { errorCatch } from '@/api/error';
import { QandAService } from '@/services/q-and-a.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useAllQandAs(classId: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['q-and-a', classId],
    queryFn: () => QandAService.getAll(classId),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useAddQandA(onSuccessFunc: () => void) {
  const queryClient = useQueryClient();

  const { mutate: addQandA, isPending } = useMutation({
    mutationFn: (data: FormData) => QandAService.create(data),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['q-and-a', res.data.classId],
      });
      toast.success(res.data.message);
      onSuccessFunc();
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  return { addQandA, isPending };
}

export function useDeleteQandA(onDelete?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteQandA, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete q-and-a'],
    mutationFn: (id: number) => QandAService.delete(id),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['q-and-a', res.data.classId],
      });
      onDelete && onDelete();
      toast.success(res.data.message);
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { deleteQandA, isDeletePending };
}
