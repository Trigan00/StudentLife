import { errorCatch } from '@/api/error';
import { authService } from '@/services/auth.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: () => authService.getNewTokens(),
  });

  return { auth: data?.data, isLoading };
}

export function useLogout() {
  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess() {
      window.location.reload();
    },
    onError: (error: any) => toast.error(errorCatch(error)),
  });

  return { logout, isPending };
}
