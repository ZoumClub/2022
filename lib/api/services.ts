import { Service } from '@/types/service';
import { fetchData } from './client';

export async function fetchServices(): Promise<Service[]> {
  return fetchData<Service>('services');
}