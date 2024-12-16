import { Brand } from '@/types';
import { api } from '@/lib/api/client';
import { useQuery } from '../query/useQuery';

export function useBrands() {
  return useQuery<Brand>('brands', api.brands.list);
}