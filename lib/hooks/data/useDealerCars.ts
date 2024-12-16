import { DealerCar } from '@/types';
import { api } from '@/lib/api/client';
import { useQuery } from '../query/useQuery';

export function useDealerCars() {
  return useQuery<DealerCar>('dealerCars', api.dealerCars.list);
}