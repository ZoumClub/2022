import { Brand } from '@/types/brand';
import { fetchData } from './client';

export async function fetchBrands(): Promise<Brand[]> {
  return fetchData<Brand>('brands', { is_active: true });
}