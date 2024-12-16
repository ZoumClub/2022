"use client";

import { useState } from 'react';
import HeroSection from '@/components/sections/HeroSection';
import BrowseSection from '@/components/sections/BrowseSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AccessoriesSection from '@/components/sections/AccessoriesSection';
import NewsSection from '@/components/sections/NewsSection';
import WhyChooseUs from '@/components/sections/WhyChooseUs';

export default function HomePage() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <BrowseSection 
        selectedBrand={selectedBrand}
        onBrandSelect={setSelectedBrand}
      />
      <ServicesSection />
      <AccessoriesSection />
      <NewsSection />
      <WhyChooseUs />
    </main>
  );
}