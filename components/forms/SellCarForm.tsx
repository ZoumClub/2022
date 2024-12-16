"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContactInfo } from "./sell-car/ContactInfo";
import { CarInfo } from "./sell-car/CarInfo";
import { TechnicalSpecs } from "./sell-car/TechnicalSpecs";
import { FeaturesSection } from "./sell-car/FeaturesSection";
import { MediaUpload } from "./sell-car/MediaUpload";
import { submitCarListing } from "@/lib/api/sellCar";
import { toast } from "sonner";
import { FORM_TABS } from "@/lib/constants/formTabs";
import { sellCarSchema, type SellCarFormData } from "@/lib/validations/sellCar";
import { FetchError } from "@/lib/api/types";
import { useFormValidation } from "@/lib/hooks/useFormValidation";
import { useFormNavigation } from "@/lib/hooks/useFormNavigation";

const defaultValues: Partial<SellCarFormData> = {
  name: "",
  pinCode: "",
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: "",
  previousOwners: 0,
  fuelType: undefined,
  transmission: undefined,
  bodyType: undefined,
  exteriorColor: undefined,
  interiorColor: undefined,
  features: [],
  images: [],
};

export function SellCarForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<SellCarFormData>({
    resolver: zodResolver(sellCarSchema),
    defaultValues,
    mode: "onChange",
  });

  const { validateTabFields, isValidating } = useFormValidation(form);
  const {
    currentTab,
    setCurrentTab,
    handleNext,
    handlePrevious,
    isFirstTab,
    isLastTab,
  } = useFormNavigation();

  const onSubmit = async (data: SellCarFormData) => {
    try {
      setIsSubmitting(true);
      const result = await submitCarListing(data);
      
      if (result.success) {
        toast.success("Car listing submitted successfully!", {
          description: "Your listing will be reviewed by our team.",
        });
        router.push("/");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      const message = error instanceof FetchError 
        ? error.message 
        : "Failed to submit car listing. Please try again.";
      
      toast.error(message, {
        description: error instanceof FetchError ? error.details : undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextClick = async () => {
    const isValid = await validateTabFields(currentTab);
    handleNext(isValid);
  };

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="grid grid-cols-5 w-full">
              {FORM_TABS.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id}>
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="contact">
              <ContactInfo form={form} />
            </TabsContent>

            <TabsContent value="car">
              <CarInfo form={form} />
            </TabsContent>

            <TabsContent value="specs">
              <TechnicalSpecs form={form} />
            </TabsContent>

            <TabsContent value="features">
              <FeaturesSection form={form} />
            </TabsContent>

            <TabsContent value="media">
              <MediaUpload form={form} />
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstTab || isSubmitting || isValidating}
            >
              Previous
            </Button>

            {isLastTab ? (
              <Button 
                type="submit" 
                disabled={isSubmitting || isValidating}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleNextClick}
                disabled={isSubmitting || isValidating}
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </Card>
  );
}