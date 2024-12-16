import { Accessory } from '@/types';
import { api } from '@/lib/api/client';
import { useQuery } from '../query/useQuery';

export function useAccessories() {
  return useQuery<Accessory>('accessories', api.accessories.list);
}