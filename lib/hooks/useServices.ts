import { Service } from '@/types/service';
import { fetchServices } from '@/lib/api/services';
import { useApi } from './useApi';

export function useServices() {
  return useApi<Service>(fetchServices, {
    errorMessage: 'Failed to load services',
  });
}