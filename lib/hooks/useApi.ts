import { useState, useEffect, useCallback } from 'react';
import { FetchError } from '@/lib/api/types';
import { toast } from 'sonner';

interface UseApiOptions<T> {
  onError?: (error: Error) => void;
  onSuccess?: (data: T[]) => void;
  errorMessage?: string;
  initialData?: T[];
  deps?: any[];
}

interface UseApiResult<T> {
  data: T[] | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export function useApi<T>(
  fetchFn: () => Promise<T[]>,
  options: UseApiOptions<T> = {}
): UseApiResult<T> {
  const [data, setData] = useState<T[] | null>(options.initialData || null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (typeof window === 'undefined') return; // Skip on server-side
    
    try {
      setIsLoading(true);
      setError(null);
      const result = await fetchFn();
      setData(result);
      
      if (options.onSuccess) {
        options.onSuccess(result);
      }
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
  }, [fetchFn, options.onSuccess, options.onError, options.errorMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...(options.deps || [])]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
}