import { DealerCar } from '@/types/dealerCar';
import { fetchData } from './client';

export async function fetchDealerCars(): Promise<DealerCar[]> {
  return fetchData<DealerCar>('dealer_cars', { status: 'approved' });
}