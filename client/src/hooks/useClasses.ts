import { errorCatch } from '@/api/error';
import { classService } from '@/services/classes.service';
import { CreateClassDto, UpdateClassDto } from '@/types/classes.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useAllClasses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: () => classService.getAll(),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useOneClass(id?: number) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['class', id],
    queryFn: () => classService.getOne(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}

export function useAddClass(onSuccessFunc: () => void) {
  const queryClient = useQueryClient();

  const { mutate: addClass, isPending } = useMutation({
    mutationFn: (data: CreateClassDto) => classService.create(data),
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
      onSuccessFunc();
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  return { addClass, isPending };
}

export function useUpdateClass(id?: number, onSuccessFunc?: () => void) {
  const queryClient = useQueryClient();

  const { mutate: updateClass, isPending } = useMutation({
    mutationKey: ['class', id],
    mutationFn: (data: UpdateClassDto) => classService.update(data),
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
      onSuccessFunc && onSuccessFunc();
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { updateClass, isPending };
}

export function useDeleteClass(onDelete: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteClass, isPending: isDeletePending } = useMutation({
    mutationKey: ['delete class'],
    mutationFn: (id: number) => classService.delete(id),
    onSuccess(res) {
      queryClient.invalidateQueries({
        queryKey: ['classes'],
      });
      onDelete();
      toast.success(res.data.message);
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { deleteClass, isDeletePending };
}
