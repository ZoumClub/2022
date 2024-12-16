"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { CarCard } from "@/components/cars/CarCard";
import BrandsSection from "./BrandsSection";
import { useCarFilters, FilterType } from "@/lib/hooks/useCarFilters";
import { useDealerCars } from "@/lib/hooks/useDealerCars";
import { LoadingSection } from "@/components/ui/loading-section";
import { ErrorSection } from "@/components/ui/error-section";
import { ErrorBoundary } from "@/components/ui/error-boundary";

const FILTER_OPTIONS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'All Cars' },
  { value: 'new', label: 'New Cars' },
  { value: 'used', label: 'Used Cars' },
];

interface BrowseSectionProps {
  selectedBrand: string | null;
  onBrandSelect: (brand: string | null) => void;
}

export default function BrowseSection({ selectedBrand, onBrandSelect }: BrowseSectionProps) {
  const { data: cars, isLoading, error } = useDealerCars();
  const { typeFilter, setTypeFilter, filteredCars } = useCarFilters(cars || []);

  const displayedCars = useMemo(() => {
    if (!filteredCars.length) return [];
    return selectedBrand
      ? filteredCars.filter(car => car.brand === selectedBrand)
      : filteredCars;
  }, [filteredCars, selectedBrand]);

  if (isLoading) {
    return <LoadingSection title="Browse Our Collection" count={3} />;
  }

  if (error) {
    return <ErrorSection title="Browse Our Collection" error={error} />;
  }

  return (
    <ErrorBoundary>
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">Browse Our Collection</h2>
          
          <BrandsSection
            selectedBrand={selectedBrand}
            onBrandSelect={onBrandSelect}
          />

          <div className="flex flex-col items-center gap-6 mb-12">
            {selectedBrand && selectedBrand !== "All Brands" && (
              <p className="text-lg text-muted-foreground">
                Showing {selectedBrand} vehicles
              </p>
            )}

            <div className="flex justify-center gap-4">
              {FILTER_OPTIONS.map(option => (
                <Button 
                  key={option.value}
                  variant={typeFilter === option.value ? "default" : "outline"}
                  onClick={() => setTypeFilter(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>

          {displayedCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayedCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">
                No cars found matching your criteria
              </p>
            </div>
          )}
        </div>
      </section>
    </ErrorBoundary>
  );
}