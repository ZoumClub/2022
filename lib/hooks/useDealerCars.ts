import { DealerCar } from '@/types/dealerCar';
import { fetchDealerCars } from '@/lib/api/dealerCars';
import { useApi } from './useApi';

export function useDealerCars() {
  return useApi<DealerCar>(fetchDealerCars, {
    errorMessage: 'Failed to load dealer cars',
  });
}