"use client";

import { SellCarForm } from "@/components/forms/SellCarForm";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SellPage() {
  const router = useRouter();

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 relative">
        {/* Close button positioned at the top right of the container */}
        <div className="absolute -top-4 right-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="rounded-full hover:bg-gray-200 transition-colors"
            title="Return to home page"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <h1 className="text-4xl font-bold text-center mb-8">Sell Your Car</h1>
        <SellCarForm />
      </div>
    </div>
  );
}