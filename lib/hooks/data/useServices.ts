import { Service } from '@/types';
import { api } from '@/lib/api/client';
import { useQuery } from '../query/useQuery';

export function useServices() {
  return useQuery<Service>('services', api.services.list);
}