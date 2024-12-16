"use client";

import { useBrands } from "@/lib/hooks/useBrands";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { LoadingSection } from "@/components/ui/loading-section";
import { ErrorSection } from "@/components/ui/error-section";

interface BrandsSectionProps {
  selectedBrand: string | null;
  onBrandSelect: (brandName: string | null) => void;
}

export default function BrandsSection({ selectedBrand, onBrandSelect }: BrandsSectionProps) {
  const { data: brands, isLoading, error } = useBrands();

  if (isLoading) {
    return (
      <div className="flex justify-center gap-6 px-4 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="w-16 h-16 bg-gray-100 rounded-lg animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4 mb-8">
        <p className="text-red-600">Failed to load brands</p>
      </div>
    );
  }

  if (!brands?.length) {
    return null;
  }

  const handleBrandSelect = (brandName: string) => {
    if (brandName === "All Brands" || brandName === selectedBrand) {
      onBrandSelect(null);
    } else {
      onBrandSelect(brandName);
    }
  };

  return (
    <div className="mb-8">
      <div className="flex flex-wrap justify-center gap-6 px-4">
        {brands.map((brand) => (
          <BrandLogo
            key={brand.id}
            brand={brand}
            isSelected={brand.name === selectedBrand || (brand.name === "All Brands" && !selectedBrand)}
            onClick={() => handleBrandSelect(brand.name)}
          />
        ))}
      </div>
    </div>
  );
}