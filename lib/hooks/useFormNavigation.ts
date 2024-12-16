import { useState, useCallback } from "react";
import { FormTab, FORM_TABS } from "@/lib/constants/formTabs";

interface UseFormNavigationResult {
  currentTab: FormTab;
  setCurrentTab: (tab: FormTab) => void;
  handleNext: (isValid: boolean) => void;
  handlePrevious: () => void;
  isFirstTab: boolean;
  isLastTab: boolean;
  currentTabIndex: number;
}

export function useFormNavigation(): UseFormNavigationResult {
  const [currentTab, setCurrentTab] = useState<FormTab>("contact");

  const currentTabIndex = FORM_TABS.findIndex(tab => tab.id === currentTab);
  const isLastTab = currentTabIndex === FORM_TABS.length - 1;
  const isFirstTab = currentTabIndex === 0;

  const handleNext = useCallback((isValid: boolean) => {
    if (isValid && !isLastTab) {
      setCurrentTab(FORM_TABS[currentTabIndex + 1].id as FormTab);
    }
  }, [currentTabIndex, isLastTab]);

  const handlePrevious = useCallback(() => {
    if (!isFirstTab) {
      setCurrentTab(FORM_TABS[currentTabIndex - 1].id as FormTab);
    }
  }, [currentTabIndex, isFirstTab]);

  return {
    currentTab,
    setCurrentTab,
    handleNext,
    handlePrevious,
    isFirstTab,
    isLastTab,
    currentTabIndex,
  };
}