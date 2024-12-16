import { Brand } from '@/types/brand';
import { fetchBrands } from '@/lib/api/brands';
import { useApi } from './useApi';

export function useBrands() {
  return useApi<Brand>(fetchBrands, {
    errorMessage: 'Failed to load brands',
  });
}