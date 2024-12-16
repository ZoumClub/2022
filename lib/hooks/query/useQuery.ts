import { useState, useEffect } from 'react';
import { FetchError } from '@/lib/api/types';
import { toast } from 'sonner';

interface UseQueryOptions<T> {
  onSuccess?: (data: T[]) => void;
  onError?: (error: Error) => void;
  errorMessage?: string;
  initialData?: T[];
}

interface UseQueryResult<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useQuery<T>(
  key: string,
  fetchFn: () => Promise<T[]>,
  options: UseQueryOptions<T> = {}
): UseQueryResult<T> {
  const [data, setData] = useState<T[] | null>(options.initialData || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('An unknown error occurred');
      setError(error);
      setData(null);
      
      if (options.onError) {
        options.onError(error);
      } else {
        const message = options.errorMessage || 'Failed to fetch data';
        toast.error(message, {
          description: error instanceof FetchError ? error.details : error.message,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData();
    }
  }, [key]); // Only re-run if key changes

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
}