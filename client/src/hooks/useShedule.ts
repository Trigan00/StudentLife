import { errorCatch } from '@/api/error';
import { scheduleService } from '@/services/schedule.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { toast } from 'sonner';

export function useSchedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['schedule'],
    queryFn: () => scheduleService.getSchedule(),
  });

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  return { data: data?.data, isLoading };
}
