import { Accessory } from '@/types/accessory';
import { fetchData } from './client';

export async function fetchAccessories(): Promise<Accessory[]> {
  return fetchData<Accessory>('accessories');
}