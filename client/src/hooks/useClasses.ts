import { errorCatch } from '@/api/error';
import { classService } from '@/services/classes.service';
import { Class } from '@/types/classes.types';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export function useAllClasses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['classes'],
    queryFn: () => classService.getAll(),
  });

  // const [items, setItems] = useState<Class[] | undefined>(data?.data)

  useEffect(() => {
    if (error) toast.error(errorCatch(error));
  }, [error]);

  // useEffect(() => {
  // 	setItems(data?.data.boards)
  // }, [data?.data])

  return { data: data?.data, isLoading };
}
