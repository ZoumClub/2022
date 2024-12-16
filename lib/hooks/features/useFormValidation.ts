"use client";

import { useState, useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { SellCarFormData } from "@/types";
import { tabValidationFields } from "@/lib/validations/form-fields";
import { FormTab } from "@/lib/constants/formTabs";

interface UseFormValidationResult {
  validateTabFields: (tabId: FormTab) => Promise<boolean>;
  isValidating: boolean;
}

export function useFormValidation(
  form: UseFormReturn<SellCarFormData>
): UseFormValidationResult {
  const [isValidating, setIsValidating] = useState(false);

  const validateTabFields = useCallback(
    async (tabId: FormTab) => {
      try {
        setIsValidating(true);
        const fields = tabValidationFields[tabId];
        if (!fields) return true;
        return await form.trigger(fields);
      } catch (error) {
        console.error(`Error validating ${tabId} tab:`, error);
        return false;
      } finally {
        setIsValidating(false);
      }
    },
    [form]
  );

  return {
    validateTabFields,
    isValidating,
  };
}