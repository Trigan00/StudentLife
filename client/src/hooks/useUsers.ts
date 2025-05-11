import { errorCatch } from '@/api/error';
import { usersService } from '@/services/users.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useUsersSearch(inputValue: string) {
  const {
    data: users = [],
    refetch,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['searchUsers', inputValue],
    queryFn: () => usersService.searchUsers(inputValue),
    enabled: false, // Отключаем автоматический запрос
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { users, isFetching, refetch };
}

export function useProfile() {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: () => usersService.getProfile(),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { profile, isLoading };
}

export function useNotifications() {
  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['notifications'],
    queryFn: () => usersService.getNotifications(),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { notifications, isLoading };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending } = useMutation({
    mutationKey: ['profile'],
    mutationFn: (data: { username: string }) => usersService.update(data),
    onSuccess(res) {
      toast.success(res.data.message);
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      });
    },
    onError(error: any) {
      toast.error(errorCatch(error));
    },
  });

  return { updateUser, isPending };
}
