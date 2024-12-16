import { supabase } from '@/lib/supabase/client';
import { FetchError } from './types';
import { Accessory, Brand, DealerCar, NewsArticle, Service } from '@/types';

// Base fetch function
async function fetchData<T>(
  tableName: string,
  options: {
    select?: string;
    eq?: Record<string, any>;
    order?: { column: string; ascending?: boolean };
    limit?: number;
  } = {}
): Promise<T[]> {
  try {
    let query = supabase.from(tableName).select(options.select || '*');

    if (options.eq) {
      Object.entries(options.eq).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (options.order) {
      query = query.order(options.order.column, { 
        ascending: options.order.ascending ?? true 
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error) {
      throw new FetchError(error.message, error.code, error.details, error.hint);
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

// API endpoints
export const api = {
  accessories: {
    list: () => fetchData<Accessory>('accessories'),
  },
  brands: {
    list: () => fetchData<Brand>('brands', { 
      eq: { is_active: true },
      order: { column: 'order_index' }
    }),
  },
  dealerCars: {
    list: () => fetchData<DealerCar>('dealer_cars', {
      eq: { status: 'approved' }
    }),
  },
  news: {
    list: () => fetchData<NewsArticle>('news_articles', {
      order: { column: 'published_at', ascending: false }
    }),
  },
  services: {
    list: () => fetchData<Service>('services'),
  },
};