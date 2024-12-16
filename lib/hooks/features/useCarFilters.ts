"use client";

import { useState, useMemo } from 'react';
import { DealerCar } from '@/types';

export type FilterType = 'all' | 'new' | 'used';

interface UseCarFiltersResult {
  typeFilter: FilterType;
  setTypeFilter: (filter: FilterType) => void;
  filteredCars: DealerCar[];
}

export function useCarFilters(cars: DealerCar[]): UseCarFiltersResult {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all');

  const filteredCars = useMemo(() => {
    if (!cars.length) return [];
    return typeFilter === 'all' 
      ? cars 
      : cars.filter(car => car.type === typeFilter);
  }, [cars, typeFilter]);

  return {
    typeFilter,
    setTypeFilter,
    filteredCars,
  };
}