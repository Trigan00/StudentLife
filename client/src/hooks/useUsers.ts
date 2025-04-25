import { errorCatch } from '@/api/error';
import { usersService } from '@/services/users.service';
import { useQuery } from '@tanstack/react-query';
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
