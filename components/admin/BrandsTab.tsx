"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { useBrands } from "@/lib/hooks/data/useBrands";
import { BrandDialog } from "./dialogs/BrandDialog";
import { columns } from "./columns/brandsColumns";
import { Brand } from "@/types";
import { ErrorBoundary } from "@/components/ui/error-boundary";

export function BrandsTab() {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const { data: brands, isLoading, refresh } = useBrands();

  const handleEdit = (brand: Brand) => {
    setSelectedBrand(brand);
    setShowDialog(true);
  };

  const handleClose = () => {
    setSelectedBrand(null);
    setShowDialog(false);
    refresh();
  };

  return (
    <ErrorBoundary>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Brands</h2>
          <Button onClick={() => setShowDialog(true)}>Add New Brand</Button>
        </div>

        <DataTable
          columns={columns}
          data={brands || []}
          isLoading={isLoading}
          onEdit={handleEdit}
        />

        <BrandDialog
          open={showDialog}
          onClose={handleClose}
          brand={selectedBrand}
        />
      </div>
    </ErrorBoundary>
  );
}