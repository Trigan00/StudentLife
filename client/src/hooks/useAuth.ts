import { authService } from '@/services/auth.service';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: () => authService.getNewTokens(),
  });

  return { auth: data, isLoading };
}
