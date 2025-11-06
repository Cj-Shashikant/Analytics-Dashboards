/**
 * Custom hook for combined filtering functionality
 * Integrates with Redux state and provides filtered data
 */

import { useMemo } from 'react';
import { useAppSelector } from './hooks';
import {
  applyAllFilters,
  getFilteredDataForReport,
  hasActiveFilters,
  getActiveFilterCount,
  getFilterSummary,
  validateFiltersForReport,
  FilterableDataItem,
  FilterState as CombinedFilterState,
} from '@/utils/combinedFilterUtils';

/**
 * Main hook for combined filtering
 */
export const useCombinedFilters = () => {
  const filterState = useAppSelector(state => state.filter);

  // Convert Redux filter state to combined filter format
  const combinedFilters: CombinedFilterState = useMemo(
    () => ({
      selectedDepartment: filterState.selectedDepartment,
      selectedReportType: filterState.selectedReportType,
      selectedDuration: filterState.selectedDuration,
      selectedProducts: filterState.selectedProducts,
      selectedInsurers: filterState.selectedInsurers,
      selectedClientTypes: filterState.selectedClientTypes,
      selectedRegions: filterState.selectedRegions,
      selectedStates: filterState.selectedStates,
      selectedCities: filterState.selectedCities,
      selectedTeams: filterState.selectedTeams,
    }),
    [
      filterState.selectedDepartment,
      filterState.selectedReportType,
      filterState.selectedDuration,
      filterState.selectedProducts,
      filterState.selectedInsurers,
      filterState.selectedClientTypes,
      filterState.selectedRegions,
      filterState.selectedStates,
      filterState.selectedCities,
      filterState.selectedTeams,
    ]
  );

  // Validate filters for current department/report type
  const validatedFilters = useMemo(
    () =>
      validateFiltersForReport(
        combinedFilters,
        filterState.selectedDepartment,
        filterState.selectedReportType
      ),
    [
      combinedFilters,
      filterState.selectedDepartment,
      filterState.selectedReportType,
    ]
  );

  // Filter application function
  const applyFilters = useMemo(
    () => (data: FilterableDataItem[]) =>
      applyAllFilters(data, validatedFilters),
    [validatedFilters]
  );

  // Report-specific filter function
  const applyFiltersForReport = useMemo(
    () =>
      (
        data: FilterableDataItem[],
        reportSpecificFilters?: Partial<CombinedFilterState>
      ) =>
        getFilteredDataForReport(data, validatedFilters, reportSpecificFilters),
    [validatedFilters]
  );

  // Filter status
  const isFiltersActive = useMemo(
    () => hasActiveFilters(validatedFilters),
    [validatedFilters]
  );
  const activeFilterCount = useMemo(
    () => getActiveFilterCount(validatedFilters),
    [validatedFilters]
  );
  const filterSummary = useMemo(
    () => getFilterSummary(validatedFilters),
    [validatedFilters]
  );

  return {
    // Filter state
    filters: validatedFilters,
    originalFilters: combinedFilters,

    // Filter application
    applyFilters,
    applyFiltersForReport,

    // Filter status
    isFiltersActive,
    activeFilterCount,
    filterSummary,

    // Individual filter states for convenience
    selectedDepartment: filterState.selectedDepartment,
    selectedReportType: filterState.selectedReportType,
    selectedDuration: filterState.selectedDuration,
    selectedProducts: filterState.selectedProducts,
    selectedInsurers: filterState.selectedInsurers,
    selectedClientTypes: filterState.selectedClientTypes,
    selectedRegions: filterState.selectedRegions,
    selectedStates: filterState.selectedStates,
    selectedCities: filterState.selectedCities,
    selectedTeams: filterState.selectedTeams,
  };
};

/**
 * Hook for filtering specific data arrays
 */
export const useFilteredData = <T extends FilterableDataItem>(
  data: T[],
  reportSpecificFilters?: Partial<CombinedFilterState>
): T[] => {
  const { applyFiltersForReport } = useCombinedFilters();

  return useMemo(
    () => applyFiltersForReport(data, reportSpecificFilters) as T[],
    [data, applyFiltersForReport, reportSpecificFilters]
  );
};

/**
 * Hook for product-specific filtering
 */
export const useProductFilters = () => {
  const { filters, selectedProducts, selectedClientTypes } =
    useCombinedFilters();

  const productFilters = useMemo(
    () => ({
      selectedProducts,
      selectedClientTypes,
      selectedDuration: filters.selectedDuration,
      selectedRegions: filters.selectedRegions,
    }),
    [
      selectedProducts,
      selectedClientTypes,
      filters.selectedDuration,
      filters.selectedRegions,
    ]
  );

  return productFilters;
};

/**
 * Hook for insurer-specific filtering
 */
export const useInsurerFilters = () => {
  const { filters, selectedInsurers, selectedClientTypes } =
    useCombinedFilters();

  const insurerFilters = useMemo(
    () => ({
      selectedInsurers,
      selectedClientTypes,
      selectedDuration: filters.selectedDuration,
      selectedRegions: filters.selectedRegions,
    }),
    [
      selectedInsurers,
      selectedClientTypes,
      filters.selectedDuration,
      filters.selectedRegions,
    ]
  );

  return insurerFilters;
};

/**
 * Hook for retention-specific filtering
 */
export const useRetentionFilters = () => {
  const { filters, selectedInsurers, selectedClientTypes, selectedProducts } =
    useCombinedFilters();

  const retentionFilters = useMemo(
    () => ({
      selectedInsurers,
      selectedProducts,
      selectedClientTypes,
      selectedDuration: filters.selectedDuration,
      selectedRegions: filters.selectedRegions,
    }),
    [
      selectedInsurers,
      selectedProducts,
      selectedClientTypes,
      filters.selectedDuration,
      filters.selectedRegions,
    ]
  );

  return retentionFilters;
};
