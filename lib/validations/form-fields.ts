import { SellCarFormData } from "@/types/sellCar";

// Define validation fields for each form tab
export const tabValidationFields: Record<string, (keyof SellCarFormData)[]> = {
  contact: ["name", "pinCode"],
  car: ["brand", "model", "year", "price", "mileage", "previousOwners"],
  specs: ["fuelType", "transmission", "bodyType", "exteriorColor", "interiorColor"],
  features: ["features"],
  media: ["images"],
} as const;

// Helper function to validate specific form fields
export function validateFormFields(
  fields: (keyof SellCarFormData)[],
  data: Partial<SellCarFormData>
): boolean {
  return fields.every(field => {
    const value = data[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== undefined && value !== null && value !== "";
  });
}