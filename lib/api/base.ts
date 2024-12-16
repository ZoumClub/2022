import { supabase } from '@/lib/supabase/client';
import { FetchError } from './types';

interface QueryOptions {
  select?: string;
  eq?: Record<string, any>;
  order?: { column: string; ascending?: boolean };
  limit?: number;
}

export async function fetchFromTable<T>(
  tableName: string,
  options: QueryOptions = {}
): Promise<T[]> {
  try {
    let query = supabase.from(tableName).select(options.select || '*');

    // Apply filters
    if (options.eq) {
      Object.entries(options.eq).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    // Apply ordering
    if (options.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? true 
      });
    }

    // Apply limit
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new FetchError(
        error.message,
        error.code,
        error.details,
        error.hint
      );
    }

    return data as T[];
  } catch (error) {
    if (error instanceof FetchError) throw error;
    
    throw new FetchError(
      `Failed to fetch data from ${tableName}`,
      'FETCH_ERROR',
      error instanceof Error ? error.message : undefined
    );
  }
}