import React, { useEffect, useMemo } from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Filter,
  Calendar,
  Users,
  Building2,
  MapPin,
  Target,
  Save,
  Pin,
  PinOff,
  Check,
  Settings,
  Package,
  BarChart3,
  FileText,
  Layers,
} from 'lucide-react';

// Redux imports
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import {
  setSelectedDepartment,
  setSelectedReportType,
  setSelectedDuration,
  setPinnedItems,
  setSelectedProducts,
  setSelectedInsurers,
  setSelectedPolicy,
  setSelectedLob,
  setSelectedVertical,
  setSelectedClientTypes,
  setSelectedRegions,
  setSelectedStates,
  setSelectedTeams,
  updateBusinessDataFilter,
  clearBusinessDataFilters,
  selectBusinessDataFilters,
  selectIsBusinessDataFilterActive,
  toggleBusinessDataFilter,
} from '@/redux/slices/filterSlice';

// Constants imports
import { DEPARTMENTS, DepartmentType } from '@/constants/enums/departments';
import { DurationType } from '@/constants/enums/durations';
import {
  getReportTypesForDepartment,
  ReportType,
} from '@/constants/enums/reportTypes';

// Data imports
import { insurerRetentionAnalyticsData } from '@/data/retentionByInsurerData';
import { brokerRetentionAnalyticsData } from '@/data/retentionByBrokerData';
import { businessData } from '@/redux/slices/businessData';
import {
  extractFilterOptions,
  applyBusinessDataFilters,
} from '@/utils/businessDataFilter';
import { Label } from '@/components/ui';

interface AdvancedFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  // Optional props with default values - keeping for backward compatibility
  selectedEntity?: string;
  selectedBusinessType?: string;
  selectedLocation?: string;
  selectedReportType?: string;
  selectedDuration?: string;
  pinnedItems?: string[];
  onPinnedItemsChange?: (pinnedItems: string[]) => void;
}

export function AdvancedFilters({
  isOpen,
  onClose,
  // Legacy props - keeping for backward compatibility but using Redux state instead
  selectedEntity: legacySelectedEntity,
  selectedLocation: legacySelectedLocation,
  onPinnedItemsChange,
}: AdvancedFiltersProps) {
  console.log('🔍 AdvancedFilters component rendered, isOpen:', isOpen);

  const dispatch = useAppDispatch();

  // Get current filter state from Redux
  const {
    selectedDepartment,
    selectedReportType,
    selectedDuration,
    pinnedItems,
    selectedProducts,
    selectedInsurers,
    selectedPolicy,
    selectedLob,
    selectedVertical,
    selectedClientTypes,
    selectedRegions,
    selectedStates,
    selectedCities,
    selectedTeams,
  } = useAppSelector(state => state.filter);

  // Get business data filtering state
  const businessDataFilters = useAppSelector(selectBusinessDataFilters);
  const isBusinessDataFilterActive = useAppSelector(
    selectIsBusinessDataFilterActive
  );

  // Get imported data state from Redux
  const importedData = useAppSelector(state => state.importedData);

  const arraysEqual = (a: string[], b: string[]) => {
    if (a.length !== b.length) return false;
    const setA = new Set(a);
    for (const item of b) {
      if (!setA.has(item)) return false;
    }
    return true;
  };

  // Extract filter options from business data
  // Base dataset for all cascading computations
  const baseBusinessData = useMemo(() => {
    return importedData.rawExcelData && importedData.rawExcelData.length > 0
      ? importedData.rawExcelData
      : businessData;
  }, [importedData.rawExcelData]);

  // All options from base dataset (used to render full set with disabled states)
  const allBusinessFilterOptions = useMemo(() => {
    return extractFilterOptions(baseBusinessData);
  }, [baseBusinessData]);

  // Cascading available options per stage
  const optionsByDuration = useMemo(() => {
    const filtered = applyBusinessDataFilters(baseBusinessData, {
      durations: (selectedDuration as unknown as string[]) || [],
    });
    return extractFilterOptions(filtered);
  }, [baseBusinessData, selectedDuration]);

  const optionsByDurationRegion = useMemo(() => {
    const filtered = applyBusinessDataFilters(baseBusinessData, {
      durations: (selectedDuration as unknown as string[]) || [],
      regions: selectedRegions || [],
    });
    return extractFilterOptions(filtered);
  }, [baseBusinessData, selectedDuration, selectedRegions]);

  const optionsByDurRegClient = useMemo(() => {
    const filtered = applyBusinessDataFilters(baseBusinessData, {
      durations: (selectedDuration as unknown as string[]) || [],
      regions: selectedRegions || [],
      clientTypes: selectedClientTypes || [],
    });
    return extractFilterOptions(filtered);
  }, [
    baseBusinessData,
    selectedDuration,
    selectedRegions,
    selectedClientTypes,
  ]);

  // Removed unused state variables: dateRange, selectedMembers, performanceRange, policyTypes, businessVerticals, revenueRange

  // Primary filter options data
  const entities = [
    'ABC Broking Pvt Ltd',
    'XYZ Insurance Agency',
    'PQR Financial Services',
    'DEF Risk Management',
  ];

  const businessTypes = DEPARTMENTS;

  // Get report types based on selected department
  const reportTypes = getReportTypesForDepartment(selectedDepartment);

  // Removed commented-out locations array

  // Removed hardcoded fallback arrays for durations/regions; now always sourced
  // from businessData.ts via extractFilterOptions

  // Team filters
  const teams = [
    'Sales Team A',
    'Sales Team B',
    'Sales Team C',
    'Marketing Team',
    'Operations Team',
    'Support Team',
  ];

  // Excel-style cascading: derive product options from currently filtered dataset
  // This uses businessFilterOptions, which itself is computed from
  // selectFilteredBusinessData so all other active filters constrain options here.
  const getDynamicProducts = () => {
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return allBusinessFilterOptions.products || [];
  };

  const getDynamicInsurers = () => {
    // Retention reports use retention datasets
    if (selectedDepartment === 'Retention') {
      if (selectedReportType === 'Retention - By Insurer') {
        return insurerRetentionAnalyticsData.map(insurer => insurer.name);
      }
      if (selectedReportType === 'Retention - Broker') {
        return brokerRetentionAnalyticsData.map(broker => broker.name);
      }
      return insurerRetentionAnalyticsData.map(insurer => insurer.name);
    }

    // Business: cascade from filtered dataset
    if (selectedDepartment === 'Business') {
      return allBusinessFilterOptions.insurers || [];
    }

    return [];
  };

  const getDynamicPolicyTypes = () => {
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return allBusinessFilterOptions.policyTypes || [];
  };

  const getDynamicLobs = () => {
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return allBusinessFilterOptions.lobs || [];
  };

  const getDynamicVerticals = () => {
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return allBusinessFilterOptions.businessVerticals || [];
  };

  const getDynamicDurations = () => {
    return allBusinessFilterOptions.durations || [];
  };

  const getDynamicRegions = () => {
    return allBusinessFilterOptions.regions || [];
  };

  const getDynamicClientTypes = () => {
    return allBusinessFilterOptions.clientTypes || [];
  };

  // Get dynamic filter values using useMemo; these options are derived from
  // businessFilterOptions (cascading Excel-style) so any change in filters
  // updates other filter options. Retention department keeps its own logic.
  const products = useMemo(
    () => getDynamicProducts(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const insurers = useMemo(
    () => getDynamicInsurers(),
    [allBusinessFilterOptions, selectedDepartment, selectedReportType]
  );
  const dynamicLobs = useMemo(
    () => getDynamicLobs(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const dynamicPolicyTypes = useMemo(
    () => getDynamicPolicyTypes(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const dynamicVerticals = useMemo(
    () => getDynamicVerticals(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const dynamicDurations = useMemo(
    () => getDynamicDurations(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const dynamicRegions = useMemo(
    () => getDynamicRegions(),
    [allBusinessFilterOptions, selectedDepartment]
  );
  const dynamicClientTypes = useMemo(
    () => getDynamicClientTypes(),
    [allBusinessFilterOptions, selectedDepartment]
  );

  // Auto-deselect invalid downstream selections when upstream constraints change
  useEffect(() => {
    // Regions invalidated by Duration change
    if (selectedRegions.length > 0) {
      const availableRegions = optionsByDuration.regions || [];
      const nextRegions = selectedRegions.filter(r =>
        availableRegions.includes(r)
      );
      if (nextRegions.length !== selectedRegions.length) {
        dispatch(setSelectedRegions(nextRegions));
        if (selectedDepartment === 'Business') {
          dispatch(
            updateBusinessDataFilter({
              filterType: 'regions',
              values: nextRegions,
            })
          );
        }
      }
    }

    // Client Types invalidated by Duration/Region change
    if (selectedClientTypes.length > 0) {
      const availableClientTypes = optionsByDurationRegion.clientTypes || [];
      const nextClientTypes = selectedClientTypes.filter(c =>
        availableClientTypes.includes(c)
      );
      if (nextClientTypes.length !== selectedClientTypes.length) {
        dispatch(setSelectedClientTypes(nextClientTypes));
        if (selectedDepartment === 'Business') {
          dispatch(
            updateBusinessDataFilter({
              filterType: 'clientTypes',
              values: nextClientTypes,
            })
          );
        }
      }
    }
  }, [selectedDuration, selectedRegions, selectedDepartment]);

  // Auto-deselect downstream Business filters when Duration/Region/Client Types change
  useEffect(() => {
    if (selectedDepartment !== 'Business') return;

    // Products
    if (selectedProducts.length > 0) {
      const availableProducts = optionsByDurRegClient.products || [];
      const nextProducts = selectedProducts.filter(p =>
        availableProducts.includes(p)
      );
      if (nextProducts.length !== selectedProducts.length) {
        dispatch(setSelectedProducts(nextProducts));
        dispatch(
          updateBusinessDataFilter({
            filterType: 'products',
            values: nextProducts,
          })
        );
      }
    }

    // Insurers
    if (selectedInsurers.length > 0) {
      const availableInsurers = optionsByDurRegClient.insurers || [];
      const nextInsurers = selectedInsurers.filter(i =>
        availableInsurers.includes(i)
      );
      if (nextInsurers.length !== selectedInsurers.length) {
        dispatch(setSelectedInsurers(nextInsurers));
        dispatch(
          updateBusinessDataFilter({
            filterType: 'insurers',
            values: nextInsurers,
          })
        );
      }
    }

    // Policy Types
    if (selectedPolicy.length > 0) {
      const availablePolicy = optionsByDurRegClient.policyTypes || [];
      const nextPolicy = selectedPolicy.filter(p =>
        availablePolicy.includes(p)
      );
      if (nextPolicy.length !== selectedPolicy.length) {
        dispatch(setSelectedPolicy(nextPolicy));
        dispatch(
          updateBusinessDataFilter({
            filterType: 'policyTypes',
            values: nextPolicy,
          })
        );
      }
    }

    // LOBs
    if (selectedLob.length > 0) {
      const availableLobs = optionsByDurRegClient.lobs || [];
      const nextLobs = selectedLob.filter(l => availableLobs.includes(l));
      if (nextLobs.length !== selectedLob.length) {
        dispatch(setSelectedLob(nextLobs));
        dispatch(
          updateBusinessDataFilter({
            filterType: 'lobs',
            values: nextLobs,
          })
        );
      }
    }

    // Vertical
    if (selectedVertical.length > 0) {
      const availableVerticals = optionsByDurRegClient.businessVerticals || [];
      const nextVerticals = selectedVertical.filter(v =>
        availableVerticals.includes(v)
      );
      if (nextVerticals.length !== selectedVertical.length) {
        dispatch(setSelectedVertical(nextVerticals));
        dispatch(
          updateBusinessDataFilter({
            filterType: 'businessVerticals',
            values: nextVerticals,
          })
        );
      }
    }
  }, [
    selectedDuration,
    selectedRegions,
    selectedClientTypes,
    selectedDepartment,
    optionsByDurRegClient,
    selectedProducts,
    selectedInsurers,
    selectedPolicy,
    selectedLob,
    selectedVertical,
  ]);

  // Removed commented-out getDynamicFilterOptionsForReportType function

  // Get department-aware filter items
  const getDepartmentAwareFilterItems = () => {
    const baseFilterItems = [
      {
        id: 'department',
        name: 'Department',
        icon: Users,
        currentValue: selectedDepartment,
        category: 'Primary',
      },
      {
        id: 'reportType',
        name: 'Report Type',
        icon: Target,
        currentValue: selectedReportType,
        category: 'Primary',
      },
      {
        id: 'duration',
        name: 'Duration',
        icon: Calendar,
        currentValue: selectedDuration,
        category: 'Primary',
      },

      {
        id: 'regions',
        name: 'Regions',
        icon: MapPin,
        currentValue: `${selectedRegions.length} selected`,
        category: 'Regional',
      },
      {
        id: 'clientTypes',
        name: 'Client Types',
        icon: Users,
        currentValue: `${selectedClientTypes.length} selected`,
        category: 'Business',
      },
    ];

    // Add department-specific filters
    if (selectedDepartment === 'Business') {
      baseFilterItems.push(
        {
          id: 'products',
          name: 'Products',
          icon: Package,
          currentValue:
            selectedProducts.length > 0
              ? selectedProducts.length <= 3
                ? selectedProducts.join(', ')
                : `${selectedProducts.slice(0, 2).join(', ')}, +${selectedProducts.length - 2} more`
              : 'None selected',
          category: 'Business',
        },
        {
          id: 'insurers',
          name: 'Insurers',
          icon: Building2,
          currentValue:
            selectedInsurers.length > 0
              ? selectedInsurers.length <= 3
                ? selectedInsurers.join(', ')
                : `${selectedInsurers.slice(0, 2).join(', ')}, +${selectedInsurers.length - 2} more`
              : 'None selected',
          category: 'Business',
        },
        {
          id: 'policy',
          name: 'Policy Type',
          icon: FileText,
          currentValue:
            selectedPolicy.length > 0
              ? selectedPolicy.length <= 3
                ? selectedPolicy.join(', ')
                : `${selectedPolicy.slice(0, 2).join(', ')}, +${selectedPolicy.length - 2} more`
              : 'None selected',
          category: 'Business',
        },
        {
          id: 'lob',
          name: 'Line of Business',
          icon: BarChart3,
          currentValue:
            selectedLob.length > 0
              ? selectedLob.length <= 3
                ? selectedLob.join(', ')
                : `${selectedLob.slice(0, 2).join(', ')}, +${selectedLob.length - 2} more`
              : 'None selected',
          category: 'Business',
        },
        {
          id: 'vertical',
          name: 'Vertical',
          icon: Layers,
          currentValue:
            selectedVertical.length > 0
              ? selectedVertical.length <= 3
                ? selectedVertical.join(', ')
                : `${selectedVertical.slice(0, 2).join(', ')}, +${selectedVertical.length - 2} more`
              : 'None selected',
          category: 'Business',
        }
      );
    } else if (selectedDepartment === 'Retention') {
      // For Retention department, show different options based on report type
      if (selectedReportType === 'Retention - By Insurer') {
        baseFilterItems.push({
          id: 'insurers',
          name: 'Retention By Insurers',
          icon: Building2,
          currentValue: `${selectedInsurers.length} selected`,
          category: 'Retention',
        });
      } else if (selectedReportType === 'Retention - Broker') {
        baseFilterItems.push({
          id: 'brokers',
          name: 'Retention By Brokers',
          icon: Building2,
          currentValue: `${selectedInsurers.length} selected`,
          category: 'Retention',
        });
      }
    }

    return baseFilterItems;
  };

  // All available filter items with metadata (department-aware)
  const allFilterItems = getDepartmentAwareFilterItems();

  // Filter change handlers that dispatch Redux actions
  const handleDepartmentChange = (value: string) => {
    dispatch(setSelectedDepartment(value as DepartmentType));

    // Automatically update report type to the first available option for the new department
    const newReportTypes = getReportTypesForDepartment(value as DepartmentType);
    if (newReportTypes.length > 0) {
      dispatch(setSelectedReportType(newReportTypes[0] as ReportType));
    }

    // Clear department-specific filters when department changes
    dispatch(setSelectedProducts([]));
    dispatch(setSelectedInsurers([]));
    dispatch(setSelectedClientTypes([]));

    // Reset cascading filters when leaving Business department
    if (value !== 'Business') {
      dispatch(clearBusinessDataFilters());
    }
  };

  const handleReportTypeChange = (value: string) => {
    dispatch(setSelectedReportType(value as ReportType));

    // Clear specific filters when report type changes to ensure clean state
    dispatch(setSelectedProducts([]));
    dispatch(setSelectedInsurers([]));

    // Reset cascading filters if leaving Business report contexts
    if (selectedDepartment !== 'Business') {
      dispatch(clearBusinessDataFilters());
    }
  };

  // Enhanced duration handler to support multi-select
  const handleDurationChange = (value: string) => {
    const currentDurations = selectedDuration || [];

    if (currentDurations.includes(value as DurationType)) {
      // Remove if already selected (multi-select behavior)
      const newDurations = currentDurations.filter(d => d !== value);
      dispatch(
        setSelectedDuration(
          newDurations.length > 0 ? newDurations : [value as DurationType]
        )
      );
    } else {
      // Add to selection (multi-select behavior)
      const newDurations = [...currentDurations, value as DurationType];
      dispatch(setSelectedDuration(newDurations));
    }
  };

  const togglePinItem = (itemId: string) => {
    let newPinnedItems;
    if (pinnedItems.includes(itemId)) {
      // Unpinning - always allowed
      newPinnedItems = pinnedItems.filter(id => id !== itemId);
    } else {
      // Pinning - check if we're at the 5-item limit
      if (pinnedItems.length >= 5) {
        // Show error message or toast
        alert(
          'Maximum 5 filters can be pinned at a time. Please unpin a filter first.'
        );
        return;
      }
      newPinnedItems = [...pinnedItems, itemId];
    }

    // Update Redux state
    dispatch(setPinnedItems(newPinnedItems));

    // Call legacy callback if provided
    if (onPinnedItemsChange) {
      onPinnedItemsChange(newPinnedItems);
    }
  };

  // Removed commented-out resetFilters function

  const saveConfiguration = () => {
    // Save both filter settings and pinned items configuration
    const configuration = {
      pinnedItems,
      selectedRegions,
      selectedStates,
      selectedCities,
      selectedTeams,
      selectedProducts,
      selectedInsurers,
      clientTypes: selectedClientTypes,
    };

    // Implementation for saving configuration to localStorage or API
    localStorage.setItem(
      'dashboardConfiguration',
      JSON.stringify(configuration)
    );

    // Show success message
    alert('Dashboard configuration saved successfully!');
  };

  // Load configuration on mount
  useEffect(() => {
    const savedConfig = localStorage.getItem('dashboardConfiguration');
    if (savedConfig) {
      try {
        const configuration = JSON.parse(savedConfig);
        // Load pinned items if available
        if (configuration.pinnedItems && onPinnedItemsChange) {
          onPinnedItemsChange(configuration.pinnedItems);
        }
        if (configuration.selectedRegions)
          dispatch(setSelectedRegions(configuration.selectedRegions));
        if (configuration.selectedStates)
          dispatch(setSelectedStates(configuration.selectedStates));
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    }
  }, [onPinnedItemsChange]);

  // Default-all selection: ensure core cascading filters start with "all" selected
  // 1) Durations: select all available durations on initial load when empty
  useEffect(() => {
    const allDurations = dynamicDurations || [];
    const currentDurations = (selectedDuration as unknown as string[]) || [];
    if (currentDurations.length === 0 && allDurations.length > 0) {
      dispatch(setSelectedDuration(allDurations as DurationType[]));
      if (selectedDepartment === 'Business') {
        dispatch(
          updateBusinessDataFilter({
            filterType: 'durations',
            values: allDurations as unknown as string[],
          })
        );
      }
    }
  }, [dynamicDurations, selectedDepartment]);

  // 2) Regions: once durations are known, select all available regions when empty
  useEffect(() => {
    const availableRegions = optionsByDuration.regions || [];
    if ((selectedRegions?.length ?? 0) === 0 && availableRegions.length > 0) {
      dispatch(setSelectedRegions([...availableRegions]));
      if (selectedDepartment === 'Business') {
        dispatch(
          updateBusinessDataFilter({
            filterType: 'regions',
            values: [...availableRegions],
          })
        );
      }
    }
  }, [optionsByDuration, selectedDuration, selectedDepartment]);

  // 3) Client Types: once durations/regions are set, select all available client types when empty
  useEffect(() => {
    const availableClientTypes = optionsByDurationRegion.clientTypes || [];
    if (
      (selectedClientTypes?.length ?? 0) === 0 &&
      availableClientTypes.length > 0
    ) {
      dispatch(setSelectedClientTypes([...availableClientTypes]));
      if (selectedDepartment === 'Business') {
        dispatch(
          updateBusinessDataFilter({
            filterType: 'clientTypes',
            values: [...availableClientTypes],
          })
        );
      }
    }
  }, [
    optionsByDurationRegion,
    selectedRegions,
    selectedDuration,
    selectedDepartment,
  ]);

  // Auto-select all available items when department or report type changes
  useEffect(() => {
    console.log(
      '🔍 useEffect triggered - selectedDepartment:',
      selectedDepartment
    );
    console.log('🔍 dynamicLobs length:', dynamicLobs.length);
    console.log('🔍 dynamicLobs values:', dynamicLobs);
    console.log('🔍 current selectedLob:', selectedLob);

    // Handle Business department filters
    if (selectedDepartment === 'Business') {
      // Keep UI selections in sync, but do not apply non-Region filters to data here
      if (products.length > 0 && !arraysEqual(selectedProducts, products)) {
        dispatch(setSelectedProducts([...products]));
      }
      if (dynamicLobs.length > 0 && !arraysEqual(selectedLob, dynamicLobs)) {
        dispatch(setSelectedLob([...dynamicLobs]));
      }
      if (
        dynamicPolicyTypes.length > 0 &&
        !arraysEqual(selectedPolicy, dynamicPolicyTypes)
      ) {
        dispatch(setSelectedPolicy([...dynamicPolicyTypes]));
      }
      if (
        dynamicVerticals.length > 0 &&
        !arraysEqual(selectedVertical, dynamicVerticals)
      ) {
        dispatch(setSelectedVertical([...dynamicVerticals]));
      }
      if (
        dynamicClientTypes.length > 0 &&
        !arraysEqual(selectedClientTypes, dynamicClientTypes)
      ) {
        dispatch(setSelectedClientTypes([...dynamicClientTypes]));
      }
    } else {
      // Clear Business-specific filters when not in Business department
      if (selectedProducts.length > 0) dispatch(setSelectedProducts([]));
      if (selectedLob.length > 0) dispatch(setSelectedLob([]));
      if (selectedPolicy.length > 0) dispatch(setSelectedPolicy([]));
      if (selectedVertical.length > 0) dispatch(setSelectedVertical([]));
      const hasBusinessFilters =
        (businessDataFilters.products?.length ?? 0) > 0 ||
        (businessDataFilters.lobs?.length ?? 0) > 0 ||
        (businessDataFilters.policyTypes?.length ?? 0) > 0 ||
        (businessDataFilters.businessVerticals?.length ?? 0) > 0 ||
        (businessDataFilters.clientTypes?.length ?? 0) > 0 ||
        (businessDataFilters.insurers?.length ?? 0) > 0 ||
        (businessDataFilters.regions?.length ?? 0) > 0;
      if (hasBusinessFilters) dispatch(clearBusinessDataFilters());
    }

    // Handle Retention department filters
    if (selectedDepartment === 'Retention') {
      if (
        dynamicClientTypes.length > 0 &&
        !arraysEqual(selectedClientTypes, dynamicClientTypes)
      ) {
        dispatch(setSelectedClientTypes([...dynamicClientTypes]));
      }
    } else if (selectedDepartment !== 'Business') {
      if (selectedClientTypes.length > 0) dispatch(setSelectedClientTypes([]));
    }

    // Auto-select all insurers for departments that support them (Business and Retention)
    if (
      (selectedDepartment === 'Business' ||
        selectedDepartment === 'Retention') &&
      insurers.length > 0
    ) {
      if (!arraysEqual(selectedInsurers, insurers)) {
        dispatch(setSelectedInsurers([...insurers]));
      }
    } else {
      if (selectedInsurers.length > 0) dispatch(setSelectedInsurers([]));
    }
  }, [
    selectedDepartment,
    selectedReportType,
    products,
    insurers,
    dynamicLobs,
    dynamicPolicyTypes,
    dynamicVerticals,
    dynamicDurations,
    dynamicRegions,
    dynamicClientTypes,
  ]);

  // Group filter items by category
  const filtersByCategory = allFilterItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category]!.push(item);
      return acc;
    },
    {} as Record<string, typeof allFilterItems>
  );

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="right"
        className="w-[700px] sm:w-[800px] overflow-y-auto"
      >
        <SheetHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <SheetTitle className="text-base font-medium font-bold text-black">
                  Dashboard Configuration
                </SheetTitle>
                <SheetDescription className="text-xs text-gray-500 mt-1">
                  Customize filters, chart axes, display settings, and dashboard
                  preferences
                </SheetDescription>
              </div>

              <Button
                variant="outline"
                onClick={saveConfiguration}
                className="text-xs text-gray-600 "
              >
                <Save className="w-4 h-4 text-green-600" />
                Save
              </Button>

              <Button
                variant={isBusinessDataFilterActive ? 'default' : 'outline'}
                onClick={() => dispatch(toggleBusinessDataFilter())}
                className="text-xs"
              >
                <Filter className="w-4 h-4" />
                Excel Filters
              </Button>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-6 p-4">
          {/* Currently Applied Filters */}
          <Card className="p-2 bg-blue-50 border-blue-200 gap-4">
            <div className="flex items-center gap-1">
              <Filter className="w-4 h-4 text-blue-600" />
              <h3 className="font-medium text-sm text-blue-900">
                Currently Applied Configuration
              </h3>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="bg-blue-600 text-white">
                  Organisation: {legacySelectedEntity || 'ABC Broking Pvt Ltd'}
                </Badge>
                <Badge variant="default" className="bg-blue-600 text-white">
                  Department: {selectedDepartment}
                </Badge>
                <Badge variant="default" className="bg-blue-600 text-white">
                  Location: {legacySelectedLocation || 'All Location'}
                </Badge>
                <Badge variant="default" className="bg-blue-600 text-white">
                  Report: {selectedReportType}
                </Badge>
                <Badge variant="default" className="bg-blue-600 text-white">
                  Period: {selectedDuration}
                </Badge>
                {/* <Badge variant="default" className="bg-green-600 text-white">
                  Values: {valueUnit}
                </Badge> */}
                {selectedReportType === 'Revenue vs Expenses' && (
                  <Badge variant="default" className="bg-purple-600 text-white">
                    Expenses: Top {}
                  </Badge>
                )}
              </div>
            </div>
          </Card>

          {/* Pinned Items Management */}
          <Card className="p-2 gap-4">
            <div className="flex items-center gap-2">
              <Pin className="w-4 h-4 text-gray-600" />
              <h3 className="font-medium text-sm text-gray-900">
                Pin Filters to Main Dashboard
              </h3>
              <Badge
                variant="outline"
                className="ml-auto text-xs bg-blue-50 border-blue-200 text-gray-600"
              >
                {pinnedItems.length} pinned
              </Badge>
            </div>

            <div className="bg-gray-100 border-gray-200 rounded-lg p-3">
              <p className="text-xs text-gray-700 mb-2">
                <strong>Pinned filters</strong> appear on the main dashboard for
                quick access.
                <strong>Unpinned filters</strong> are available through More
                button.
              </p>
              <p className="text-xs text-gray-600">
                Click any filter below to pin/unpin it. Click individual options
                to preview available choices.
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(filtersByCategory).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    {category} Filters
                  </h4>
                  <div className="grid grid-cols-1 gap-4">
                    {items.map(item => {
                      const IconComponent = item.icon;
                      const isPinned = pinnedItems.includes(item.id);

                      // Get available options for each filter type - now using dynamic data
                      const getFilterOptions = (filterId: string) => {
                        switch (filterId) {
                          case 'organisation':
                            return entities;
                          case 'department':
                            return businessTypes;
                          case 'reportType':
                            return reportTypes;
                          case 'duration':
                            // Dynamic durations based on imported data or default data
                            return getDynamicDurations();

                          case 'teams':
                            return teams;
                          case 'regions':
                            // Dynamic regions based on imported data or default data
                            return getDynamicRegions();
                          case 'products':
                            // Dynamic products based on imported data or default data
                            return getDynamicProducts();
                          case 'insurers':
                            // Dynamic insurers based on imported data or default data
                            return getDynamicInsurers();
                          case 'brokers':
                            // Dynamic brokers for retention data
                            return getDynamicInsurers();
                          case 'clientTypes':
                            // Dynamic client types based on imported data or default data
                            return getDynamicClientTypes();
                          case 'policy':
                            // Dynamic policy types based on business data
                            return getDynamicPolicyTypes();
                          case 'lob':
                            // Dynamic LOBs based on business data
                            return getDynamicLobs();
                          case 'vertical':
                            // Dynamic verticals based on business data
                            return getDynamicVerticals();
                          default:
                            return [];
                        }
                      };

                      const getCurrentSelection = (filterId: string) => {
                        switch (filterId) {
                          case 'organisation':
                            return (
                              legacySelectedEntity || 'ABC Broking Pvt Ltd'
                            );
                          case 'department':
                            return selectedDepartment;
                          case 'reportType':
                            return selectedReportType;
                          case 'duration':
                            return selectedDuration;

                          case 'teams':
                            return selectedTeams;
                          case 'regions':
                            return selectedRegions;
                          case 'products':
                            return selectedProducts;
                          case 'insurers':
                            return selectedInsurers;
                          case 'brokers':
                            return selectedInsurers;
                          case 'clientTypes':
                            return selectedClientTypes;
                          case 'policy':
                            return selectedPolicy;
                          case 'lob':
                            return selectedLob;
                          case 'vertical':
                            return selectedVertical;
                          default:
                            return '';
                        }
                      };

                      const isMultiSelect = (filterId: string) => {
                        return [
                          'duration', // Now supporting multi-select for duration
                          'teams',
                          'regions',
                          'products',
                          'insurers',
                          'clientTypes',
                          'policy',
                          'lob',
                          'vertical',
                        ].includes(filterId);
                      };

                      const filterOptions = getFilterOptions(item.id);
                      const currentSelection = getCurrentSelection(item.id);

                      // Add debugging for LOB specifically
                      if (item.id === 'lob') {
                        console.log('🔍 LOB filter rendering:');
                        console.log('🔍 filterOptions:', filterOptions);
                        console.log('🔍 currentSelection:', currentSelection);
                        console.log('🔍 selectedLob from Redux:', selectedLob);
                        console.log('🔍 dynamicLobs:', dynamicLobs);
                      }

                      return (
                        <div
                          key={item.id}
                          className={`border rounded-lg transition-all ${
                            isPinned
                              ? 'bg-green-50 border-green-200'
                              : 'bg-gray-50 border-gray-200'
                          }`}
                        >
                          {/* Filter Header */}
                          <div
                            className={`flex items-center justify-between p-3 cursor-pointer hover:bg-opacity-80 ${
                              isPinned
                                ? 'hover:bg-green-100'
                                : 'hover:bg-gray-100'
                            }`}
                            onClick={() => togglePinItem(item.id)}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`p-2 rounded-lg ${
                                  isPinned ? 'bg-green-100' : 'bg-gray-100'
                                }`}
                              >
                                <IconComponent
                                  className={`w-4 h-4 ${
                                    isPinned
                                      ? 'text-green-600'
                                      : 'text-gray-600'
                                  }`}
                                />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-600">
                                  {item.currentValue}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {isPinned && (
                                <div className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                  <Check className="w-3 h-3" />
                                  Pinned
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="sm"
                                className={
                                  isPinned
                                    ? 'text-green-600 hover:text-green-700 hover:bg-green-100'
                                    : 'text-gray-600 hover:text-gray-700 hover:bg-gray-100'
                                }
                                title={
                                  isPinned
                                    ? 'Unpin from main dashboard'
                                    : 'Pin to main dashboard'
                                }
                              >
                                {isPinned ? (
                                  <PinOff className="w-4 h-4" />
                                ) : (
                                  <Pin className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Available Options */}
                          <div className="px-3 pb-3">
                            <div className="border-t border-gray-200 pt-3">
                              <Label className="text-xs font-medium text-gray-600 mb-2 block">
                                Available Options ({filterOptions.length})
                                {isMultiSelect(item.id) &&
                                  Array.isArray(currentSelection) &&
                                  currentSelection && (
                                    <span className="text-blue-600 ml-1">
                                      • {currentSelection.length} selected
                                    </span>
                                  )}
                              </Label>
                              {filterOptions.length === 0 ? (
                                <div className="text-xs text-gray-500 italic py-2">
                                  No options available for current selection
                                </div>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {filterOptions.map(option => {
                                    const isSelected = isMultiSelect(item.id)
                                      ? Array.isArray(currentSelection) &&
                                        currentSelection.includes(option)
                                      : option === currentSelection;

                                    const isDisabled = (() => {
                                      switch (item.id) {
                                        case 'regions':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            !(
                                              optionsByDuration.regions || []
                                            ).includes(option)
                                          );
                                        case 'clientTypes':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            !(
                                              optionsByDurationRegion.clientTypes ||
                                              []
                                            ).includes(option)
                                          );
                                        case 'products':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            (selectedClientTypes?.length ??
                                              0) === 0 ||
                                            !(
                                              optionsByDurRegClient.products ||
                                              []
                                            ).includes(option)
                                          );
                                        case 'insurers':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            (selectedClientTypes?.length ??
                                              0) === 0 ||
                                            !(
                                              optionsByDurRegClient.insurers ||
                                              []
                                            ).includes(option)
                                          );
                                        case 'policy':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            (selectedClientTypes?.length ??
                                              0) === 0 ||
                                            !(
                                              optionsByDurRegClient.policyTypes ||
                                              []
                                            ).includes(option)
                                          );
                                        case 'lob':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            (selectedClientTypes?.length ??
                                              0) === 0 ||
                                            !(
                                              optionsByDurRegClient.lobs || []
                                            ).includes(option)
                                          );
                                        case 'vertical':
                                          return (
                                            (selectedDuration?.length ?? 0) ===
                                              0 ||
                                            (selectedRegions?.length ?? 0) ===
                                              0 ||
                                            (selectedClientTypes?.length ??
                                              0) === 0 ||
                                            !(
                                              optionsByDurRegClient.businessVerticals ||
                                              []
                                            ).includes(option)
                                          );
                                        default:
                                          return false;
                                      }
                                    })();

                                    return (
                                      <Badge
                                        key={option}
                                        variant={
                                          isSelected && !isDisabled
                                            ? 'default'
                                            : 'outline'
                                        }
                                        title={
                                          isDisabled
                                            ? 'Not available in current selection'
                                            : undefined
                                        }
                                        className={`text-xs transition-all duration-200 ${
                                          isDisabled
                                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                            : 'cursor-pointer ' +
                                              (isSelected
                                                ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                : 'hover:bg-gray-100 hover:border-gray-300')
                                        }`}
                                        onClick={e => {
                                          e.stopPropagation();
                                          if (isDisabled) return;
                                          if (isMultiSelect(item.id)) {
                                            // Handle multi-select for duration, teams, regions, products, insurers, etc.
                                            switch (item.id) {
                                              case 'duration': {
                                                const newSelection =
                                                  Array.isArray(
                                                    selectedDuration
                                                  ) &&
                                                  selectedDuration.includes(
                                                    option as DurationType
                                                  )
                                                    ? (
                                                        selectedDuration as DurationType[]
                                                      ).filter(
                                                        d =>
                                                          d !==
                                                          (option as DurationType)
                                                      )
                                                    : [
                                                        ...(selectedDuration as DurationType[]),
                                                        option as DurationType,
                                                      ];
                                                dispatch(
                                                  setSelectedDuration(
                                                    newSelection
                                                  )
                                                );
                                                if (
                                                  selectedDepartment ===
                                                  'Business'
                                                ) {
                                                  dispatch(
                                                    updateBusinessDataFilter({
                                                      filterType: 'durations',
                                                      values:
                                                        newSelection as unknown as string[],
                                                    })
                                                  );
                                                }
                                                break;
                                              }
                                              case 'teams':
                                                dispatch(
                                                  setSelectedTeams(
                                                    selectedTeams.includes(
                                                      option
                                                    )
                                                      ? selectedTeams.filter(
                                                          t => t !== option
                                                        )
                                                      : [
                                                          ...selectedTeams,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'regions':
                                                {
                                                  const newSelection =
                                                    selectedRegions.includes(
                                                      option
                                                    )
                                                      ? selectedRegions.filter(
                                                          r => r !== option
                                                        )
                                                      : [
                                                          ...selectedRegions,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedRegions(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType: 'regions',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'products':
                                                {
                                                  const newSelection =
                                                    selectedProducts.includes(
                                                      option
                                                    )
                                                      ? selectedProducts.filter(
                                                          p => p !== option
                                                        )
                                                      : [
                                                          ...selectedProducts,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedProducts(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType: 'products',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'insurers':
                                                {
                                                  const newSelection =
                                                    selectedInsurers.includes(
                                                      option
                                                    )
                                                      ? selectedInsurers.filter(
                                                          i => i !== option
                                                        )
                                                      : [
                                                          ...selectedInsurers,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedInsurers(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType: 'insurers',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'brokers':
                                                {
                                                  const newSelection =
                                                    selectedInsurers.includes(
                                                      option
                                                    )
                                                      ? selectedInsurers.filter(
                                                          i => i !== option
                                                        )
                                                      : [
                                                          ...selectedInsurers,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedInsurers(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    // Do not apply non-Region filters to business data here
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'clientTypes':
                                                {
                                                  const newSelection =
                                                    selectedClientTypes.includes(
                                                      option
                                                    )
                                                      ? selectedClientTypes.filter(
                                                          c => c !== option
                                                        )
                                                      : [
                                                          ...selectedClientTypes,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedClientTypes(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType:
                                                          'clientTypes',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'policy':
                                                {
                                                  const newSelection =
                                                    selectedPolicy.includes(
                                                      option
                                                    )
                                                      ? selectedPolicy.filter(
                                                          p => p !== option
                                                        )
                                                      : [
                                                          ...selectedPolicy,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedPolicy(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType:
                                                          'policyTypes',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'lob':
                                                {
                                                  const newSelection =
                                                    selectedLob.includes(option)
                                                      ? selectedLob.filter(
                                                          l => l !== option
                                                        )
                                                      : [
                                                          ...selectedLob,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedLob(newSelection)
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType: 'lobs',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                              case 'vertical':
                                                {
                                                  const newSelection =
                                                    selectedVertical.includes(
                                                      option
                                                    )
                                                      ? selectedVertical.filter(
                                                          v => v !== option
                                                        )
                                                      : [
                                                          ...selectedVertical,
                                                          option,
                                                        ];
                                                  dispatch(
                                                    setSelectedVertical(
                                                      newSelection
                                                    )
                                                  );
                                                  if (
                                                    selectedDepartment ===
                                                    'Business'
                                                  ) {
                                                    dispatch(
                                                      updateBusinessDataFilter({
                                                        filterType:
                                                          'businessVerticals',
                                                        values: newSelection,
                                                      })
                                                    );
                                                  }
                                                  break;
                                                }
                                                break;
                                            }
                                          } else {
                                            // Handle single-select filters by dispatching Redux actions
                                            switch (item.id) {
                                              case 'department':
                                                handleDepartmentChange(option);
                                                break;
                                              case 'reportType':
                                                handleReportTypeChange(option);
                                                break;
                                              case 'duration':
                                                // Duration now supports multi-select
                                                handleDurationChange(option);
                                                break;
                                            }
                                          }
                                        }}
                                      >
                                        {isSelected &&
                                          isMultiSelect(item.id) && (
                                            <Check className="w-3 h-3 mr-1" />
                                          )}
                                        {option}
                                      </Badge>
                                    );
                                  })}
                                </div>
                              )}
                              {isMultiSelect(item.id) && (
                                <div className="mt-2 flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={(() => {
                                      switch (item.id) {
                                        case 'regions':
                                          return (
                                            (optionsByDuration.regions || [])
                                              .length === 0
                                          );
                                        case 'clientTypes':
                                          return (
                                            (
                                              optionsByDurationRegion.clientTypes ||
                                              []
                                            ).length === 0
                                          );
                                        case 'products':
                                          return (
                                            (
                                              optionsByDurRegClient.products ||
                                              []
                                            ).length === 0
                                          );
                                        case 'insurers':
                                          return (
                                            (
                                              optionsByDurRegClient.insurers ||
                                              []
                                            ).length === 0
                                          );
                                        case 'policy':
                                          return (
                                            (
                                              optionsByDurRegClient.policyTypes ||
                                              []
                                            ).length === 0
                                          );
                                        case 'lob':
                                          return (
                                            (optionsByDurRegClient.lobs || [])
                                              .length === 0
                                          );
                                        case 'vertical':
                                          return (
                                            (
                                              optionsByDurRegClient.businessVerticals ||
                                              []
                                            ).length === 0
                                          );
                                        default:
                                          return filterOptions.length === 0;
                                      }
                                    })()}
                                    onClick={e => {
                                      e.stopPropagation();
                                      switch (item.id) {
                                        case 'duration':
                                          {
                                            const allDurations =
                                              getDynamicDurations();
                                            dispatch(
                                              setSelectedDuration(
                                                allDurations as DurationType[]
                                              )
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'durations',
                                                  values:
                                                    allDurations as unknown as string[],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'teams':
                                          dispatch(
                                            setSelectedTeams([...teams])
                                          );
                                          break;
                                        case 'regions':
                                          {
                                            const available =
                                              optionsByDuration.regions || [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedRegions([...available])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'regions',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'products':
                                          {
                                            const available =
                                              optionsByDurRegClient.products ||
                                              [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedProducts([
                                                ...available,
                                              ])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'products',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'insurers':
                                          {
                                            const available =
                                              optionsByDurRegClient.insurers ||
                                              [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedInsurers([
                                                ...available,
                                              ])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'insurers',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'brokers':
                                          dispatch(
                                            setSelectedInsurers([...insurers])
                                          );
                                          break;
                                        case 'clientTypes':
                                          {
                                            const allClientTypes =
                                              optionsByDurationRegion.clientTypes ||
                                              [];
                                            if (allClientTypes.length === 0)
                                              break;
                                            dispatch(
                                              setSelectedClientTypes([
                                                ...allClientTypes,
                                              ])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'clientTypes',
                                                  values: [...allClientTypes],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'policy':
                                          {
                                            const available =
                                              optionsByDurRegClient.policyTypes ||
                                              [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedPolicy([...available])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'policyTypes',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'lob':
                                          {
                                            const available =
                                              optionsByDurRegClient.lobs || [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedLob([...available])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType: 'lobs',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                        case 'vertical':
                                          {
                                            const available =
                                              optionsByDurRegClient.businessVerticals ||
                                              [];
                                            if (available.length === 0) break;
                                            dispatch(
                                              setSelectedVertical([
                                                ...available,
                                              ])
                                            );
                                            if (
                                              selectedDepartment === 'Business'
                                            ) {
                                              dispatch(
                                                updateBusinessDataFilter({
                                                  filterType:
                                                    'businessVerticals',
                                                  values: [...available],
                                                })
                                              );
                                            }
                                          }
                                          break;
                                      }
                                    }}
                                  >
                                    Select All
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 px-2 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                    onClick={e => {
                                      e.stopPropagation();
                                      switch (item.id) {
                                        case 'duration':
                                          dispatch(setSelectedDuration([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'durations',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'teams':
                                          dispatch(setSelectedTeams([]));
                                          break;
                                        case 'regions':
                                          dispatch(setSelectedRegions([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'regions',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'products':
                                          dispatch(setSelectedProducts([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'products',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'insurers':
                                          dispatch(setSelectedInsurers([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'insurers',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'brokers':
                                          dispatch(setSelectedInsurers([]));
                                          break;
                                        case 'clientTypes':
                                          dispatch(setSelectedClientTypes([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'clientTypes',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'policy':
                                          dispatch(setSelectedPolicy([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'policyTypes',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'lob':
                                          dispatch(setSelectedLob([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'lobs',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                        case 'vertical':
                                          dispatch(setSelectedVertical([]));
                                          if (
                                            selectedDepartment === 'Business'
                                          ) {
                                            dispatch(
                                              updateBusinessDataFilter({
                                                filterType: 'businessVerticals',
                                                values: [],
                                              })
                                            );
                                          }
                                          break;
                                      }
                                    }}
                                  >
                                    Clear All
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
