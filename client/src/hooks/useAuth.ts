import { authService } from '@/services/auth.service';
import { IAuthResponse } from '@/types/auth.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: () => authService.getNewTokens(),
  });

  const [auth, setAuth] = useState<IAuthResponse | undefined>(data?.data);

  useEffect(() => {
    setAuth(data?.data);
  }, [data?.data]);

  return { auth, isLoading };
}
