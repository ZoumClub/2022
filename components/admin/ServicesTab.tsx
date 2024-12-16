"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useServices } from "@/lib/hooks/useServices";
import { ServiceDialog } from "./dialogs/ServiceDialog";
import { columns } from "./columns/servicesColumns";
import { Service } from "@/types/service";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function ServicesTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { data: services, isLoading, refresh } = useServices();

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedService(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Services</h2>
          <Button onClick={() => setShowDialog(true)}>Add New Service</Button>
        </div>

        <DataTable
          columns={columns}
          data={services || []}
          isLoading={isLoading}
          onEdit={handleEdit}
        />

        <ServiceDialog
          open={showDialog}
          onClose={handleClose}
          service={selectedService}
        />
      </div>
    </ErrorBoundary>
  );
}