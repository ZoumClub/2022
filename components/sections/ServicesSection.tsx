"use client";

import { useServices } from "@/lib/hooks/useServices";
import { ServiceCard } from "@/components/services/ServiceCard";
import { LoadingSection } from "@/components/ui/loading-section";
import { ErrorSection } from "@/components/ui/error-section";

export default function ServicesSection() {
  const { data: services, isLoading, error } = useServices();

  if (isLoading) {
    return <LoadingSection title="Our Services" count={3} />;
  }

  if (error) {
    return <ErrorSection title="Our Services" error={error} />;
  }

  if (!services?.length) {
    return null;
  }

  return (
    <section className="py-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}