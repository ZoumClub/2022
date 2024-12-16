import { Accessory } from '@/types/accessory';
import { fetchAccessories } from '@/lib/api/accessories';
import { useApi } from './useApi';

export function useAccessories() {
  return useApi<Accessory>(fetchAccessories, {
    errorMessage: 'Failed to load accessories',
  });
}