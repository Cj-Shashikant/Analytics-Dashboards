// Combined Filter Utils

export interface FilterableDataItem {
  id?: string | number;
  name?: string;
  product?: string;
  insurer?: string;
  lob?: string;
  policyType?: string;
  vertical?: string;
  clientType?: string;
  region?: string;
  state?: string;
  city?: string;
  team?: string;
  [key: string]: any;
}

export interface FilterState {
  selectedDepartment?: string;
  selectedReportType?: string;
  selectedDuration?: string[];
  selectedProducts?: string[];
  selectedInsurers?: string[];
  selectedClientTypes?: string[];
  selectedRegions?: string[];
  selectedStates?: string[];
  selectedCities?: string[];
  selectedTeams?: string[];
}

export const applyAllFilters = (
  data: FilterableDataItem[],
  filters: FilterState
): FilterableDataItem[] => {
  return data.filter(item => {
    // Apply product filter
    if (filters.selectedProducts && filters.selectedProducts.length > 0) {
      if (!filters.selectedProducts.includes(item.product || '')) {
        return false;
      }
    }

    // Apply insurer filter
    if (filters.selectedInsurers && filters.selectedInsurers.length > 0) {
      if (!filters.selectedInsurers.includes(item.insurer || '')) {
        return false;
      }
    }

    // Apply client type filter
    if (filters.selectedClientTypes && filters.selectedClientTypes.length > 0) {
      if (!filters.selectedClientTypes.includes(item.clientType || '')) {
        return false;
      }
    }

    // Apply region filter
    if (filters.selectedRegions && filters.selectedRegions.length > 0) {
      if (!filters.selectedRegions.includes(item.region || '')) {
        return false;
      }
    }

    // Apply state filter
    if (filters.selectedStates && filters.selectedStates.length > 0) {
      if (!filters.selectedStates.includes(item.state || '')) {
        return false;
      }
    }

    // Apply city filter
    if (filters.selectedCities && filters.selectedCities.length > 0) {
      if (!filters.selectedCities.includes(item.city || '')) {
        return false;
      }
    }

    // Apply team filter
    if (filters.selectedTeams && filters.selectedTeams.length > 0) {
      if (!filters.selectedTeams.includes(item.team || '')) {
        return false;
      }
    }

    return true;
  });
};

export const getFilteredDataForReport = (
  data: FilterableDataItem[],
  filters: FilterState,
  reportSpecificFilters?: Partial<FilterState>
): FilterableDataItem[] => {
  const combinedFilters = { ...filters, ...reportSpecificFilters };
  return applyAllFilters(data, combinedFilters);
};

export const hasActiveFilters = (filters: FilterState): boolean => {
  return !!(
    (filters.selectedProducts && filters.selectedProducts.length > 0) ||
    (filters.selectedInsurers && filters.selectedInsurers.length > 0) ||
    (filters.selectedClientTypes && filters.selectedClientTypes.length > 0) ||
    (filters.selectedRegions && filters.selectedRegions.length > 0) ||
    (filters.selectedStates && filters.selectedStates.length > 0) ||
    (filters.selectedCities && filters.selectedCities.length > 0) ||
    (filters.selectedTeams && filters.selectedTeams.length > 0)
  );
};

export const getActiveFilterCount = (filters: FilterState): number => {
  let count = 0;
  if (filters.selectedProducts && filters.selectedProducts.length > 0) count++;
  if (filters.selectedInsurers && filters.selectedInsurers.length > 0) count++;
  if (filters.selectedClientTypes && filters.selectedClientTypes.length > 0)
    count++;
  if (filters.selectedRegions && filters.selectedRegions.length > 0) count++;
  if (filters.selectedStates && filters.selectedStates.length > 0) count++;
  if (filters.selectedCities && filters.selectedCities.length > 0) count++;
  if (filters.selectedTeams && filters.selectedTeams.length > 0) count++;
  return count;
};

export const getFilterSummary = (filters: FilterState): string => {
  const activeFilters: string[] = [];

  if (filters.selectedProducts && filters.selectedProducts.length > 0) {
    activeFilters.push(`Products: ${filters.selectedProducts.length}`);
  }
  if (filters.selectedInsurers && filters.selectedInsurers.length > 0) {
    activeFilters.push(`Insurers: ${filters.selectedInsurers.length}`);
  }
  if (filters.selectedClientTypes && filters.selectedClientTypes.length > 0) {
    activeFilters.push(`Client Types: ${filters.selectedClientTypes.length}`);
  }
  if (filters.selectedRegions && filters.selectedRegions.length > 0) {
    activeFilters.push(`Regions: ${filters.selectedRegions.length}`);
  }
  if (filters.selectedStates && filters.selectedStates.length > 0) {
    activeFilters.push(`States: ${filters.selectedStates.length}`);
  }
  if (filters.selectedCities && filters.selectedCities.length > 0) {
    activeFilters.push(`Cities: ${filters.selectedCities.length}`);
  }
  if (filters.selectedTeams && filters.selectedTeams.length > 0) {
    activeFilters.push(`Teams: ${filters.selectedTeams.length}`);
  }

  return activeFilters.length > 0
    ? activeFilters.join(', ')
    : 'No active filters';
};

export const validateFiltersForReport = (
  filters: FilterState,
  department?: string,
  reportType?: string
): FilterState => {
  // Create a copy of filters to avoid mutation
  const validatedFilters = { ...filters };

  // Apply department-specific validation
  if (department === 'Analytics') {
    // For analytics department, all filters are valid
    return validatedFilters;
  }

  // Apply report-specific validation
  switch (reportType) {
    case 'product':
      // For product reports, focus on product-related filters
      return {
        ...validatedFilters,
        selectedProducts: validatedFilters.selectedProducts || [],
        selectedClientTypes: validatedFilters.selectedClientTypes || [],
        selectedRegions: validatedFilters.selectedRegions || [],
        selectedDuration: validatedFilters.selectedDuration || [],
      };

    case 'insurer':
      // For insurer reports, focus on insurer-related filters
      return {
        ...validatedFilters,
        selectedInsurers: validatedFilters.selectedInsurers || [],
        selectedClientTypes: validatedFilters.selectedClientTypes || [],
        selectedRegions: validatedFilters.selectedRegions || [],
        selectedDuration: validatedFilters.selectedDuration || [],
      };

    case 'vertical':
      // For vertical reports, focus on vertical-related filters
      return {
        ...validatedFilters,
        selectedClientTypes: validatedFilters.selectedClientTypes || [],
        selectedRegions: validatedFilters.selectedRegions || [],
        selectedDuration: validatedFilters.selectedDuration || [],
      };

    default:
      // For unknown report types, return all filters
      return validatedFilters;
  }
};

// Legacy functions for backward compatibility
export const applyCombinedFilters = (data: any[], filters: any) => {
  return applyAllFilters(data, filters);
};

export const getFilteredDataCount = (data: any[], filters: any) => {
  return applyAllFilters(data, filters).length;
};
