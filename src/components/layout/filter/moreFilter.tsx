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
import { DURATIONS, DurationType } from '@/constants/enums/durations';
import {
  getReportTypesForDepartment,
  ReportType,
} from '@/constants/enums/reportTypes';
import { CLIENT_TYPES } from '@/constants/enums/revenue';

// Data imports
import { insurerRetentionAnalyticsData } from '@/data/retentionByInsurerData';
import { brokerRetentionAnalyticsData } from '@/data/retentionByBrokerData';
import { businessData } from '@/redux/slices/businessData';
import { extractFilterOptions } from '@/utils/businessDataFilter';
import { selectFilteredBusinessData } from '@/redux/slices/filterSlice';
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
  const filteredBusinessData = useAppSelector(selectFilteredBusinessData);

  // Extract filter options from business data
  const businessFilterOptions = useMemo(() => {
    // Base dataset: imported raw Excel or static business data
    const baseData =
      importedData.rawExcelData && importedData.rawExcelData.length > 0
        ? importedData.rawExcelData
        : businessData;

    // When filters are active, derive options from the currently filtered subset
    const currentData =
      isBusinessDataFilterActive && filteredBusinessData?.length > 0
        ? filteredBusinessData
        : baseData;

    return extractFilterOptions(currentData);
  }, [
    importedData.rawExcelData,
    isBusinessDataFilterActive,
    filteredBusinessData,
    businessDataFilters,
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

  const durations = DURATIONS;

  // Regional filters
  const regions = [
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Kolkata',
    'Ahmedabad',
  ];

  // Team filters
  const teams = [
    'Sales Team A',
    'Sales Team B',
    'Sales Team C',
    'Marketing Team',
    'Operations Team',
    'Support Team',
  ];

  // Dynamic data functions - prioritize JSON data, then imported data, fallback to default data, and filter by department
  const getDynamicProducts = () => {
    // Products are only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }

    // First check if there's imported data with proper safety checks
    if (
      importedData &&
      importedData.isDataImported &&
      importedData.productData &&
      Array.isArray(importedData.productData) &&
      importedData.productData.length > 0
    ) {
      return importedData.productData
        .map(product => product?.name || '')
        .filter(name => name.trim() !== '');
    }

    // Fallback to business data slice - extract only Product name values
    if (
      businessData &&
      Array.isArray(businessData) &&
      businessData.length > 0
    ) {
      const productNames: string[] = [];

      try {
        // Extract only Product name values with null/undefined checks
        businessData.forEach(item => {
          if (item && typeof item === 'object') {
            if (
              item['Product name'] &&
              typeof item['Product name'] === 'string'
            ) {
              productNames.push(item['Product name']);
            }
          }
        });

        // Get unique values and filter out empty ones
        const uniqueProducts = Array.from(new Set(productNames));
        return uniqueProducts.filter(
          product =>
            product && typeof product === 'string' && product.trim() !== ''
        );
      } catch (error) {
        console.error(
          'Error processing business data in getDynamicProducts:',
          error
        );
        return [];
      }
    }

    // Final fallback to empty array
    return [];
  };

  const getDynamicInsurers = () => {
    // For Retention department, prioritize retention-specific data over imported data
    if (selectedDepartment === 'Retention') {
      if (selectedReportType === 'Retention - By Insurer') {
        // Return actual insurer retention data names
        return insurerRetentionAnalyticsData.map(insurer => insurer.name);
      } else if (selectedReportType === 'Retention - Broker') {
        // Return actual broker retention data names
        return brokerRetentionAnalyticsData.map(broker => broker.name);
      }
      // Default fallback for retention department
      return insurerRetentionAnalyticsData.map(insurer => insurer.name);
    }

    // For Business department, use business data
    if (selectedDepartment === 'Business') {
      // First check if there's imported data with proper safety checks
      if (
        importedData &&
        importedData.isDataImported &&
        importedData.insurerData &&
        Array.isArray(importedData.insurerData) &&
        importedData.insurerData.length > 0
      ) {
        return importedData.insurerData
          .map(insurer => insurer?.name || '')
          .filter(name => name.trim() !== '');
      }

      // Fallback to business data slice - extract only Insurer name values
      if (
        businessData &&
        Array.isArray(businessData) &&
        businessData.length > 0
      ) {
        const insurerNames: string[] = [];

        try {
          // Extract only Insurer name values with null/undefined checks
          businessData.forEach(item => {
            if (item && typeof item === 'object') {
              if (
                item['Insurer name'] &&
                typeof item['Insurer name'] === 'string'
              ) {
                insurerNames.push(item['Insurer name']);
              }
            }
          });

          // Get unique values and filter out empty ones
          const uniqueInsurers = Array.from(new Set(insurerNames));
          return uniqueInsurers.filter(
            insurer =>
              insurer && typeof insurer === 'string' && insurer.trim() !== ''
          );
        } catch (error) {
          console.error(
            'Error processing business data in getDynamicInsurers:',
            error
          );
          return [];
        }
      }
    }

    // Skip JSON data check since hasImportedData is not available

    // Fallback to Redux imported data for other departments
    if (importedData.isDataImported && importedData.insurerData.length > 0) {
      return importedData.insurerData.map(insurer => insurer.name);
    }

    // Final fallback to empty array (no default data)
    return [];
  };

  const getDynamicPolicyTypes = () => {
    // Policy Types are only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }

    // Use business data slice - extract only Policy Type values
    if (
      businessData &&
      Array.isArray(businessData) &&
      businessData.length > 0
    ) {
      const policyTypes: string[] = [];

      try {
        // Extract only Policy Type values with null/undefined checks
        businessData.forEach(item => {
          if (item && typeof item === 'object') {
            if (
              item['Policy Type'] &&
              typeof item['Policy Type'] === 'string'
            ) {
              policyTypes.push(item['Policy Type']);
            }
          }
        });

        // Get unique values and filter out empty ones
        const uniquePolicyTypes = Array.from(new Set(policyTypes));
        return uniquePolicyTypes.filter(
          policyType =>
            policyType &&
            typeof policyType === 'string' &&
            policyType.trim() !== ''
        );
      } catch (error) {
        console.error(
          'Error processing business data in getDynamicPolicyTypes:',
          error
        );
        return [];
      }
    }

    // Final fallback to empty array
    return [];
  };

  const getDynamicLobs = () => {
    console.log(
      '🔍 getDynamicLobs called - selectedDepartment:',
      selectedDepartment
    );

    // LOBs are only available for Business department
    if (selectedDepartment !== 'Business') {
      console.log('🔍 Not Business department, returning empty array');
      return [];
    }

    // Use business data slice - extract only LOB name values
    if (
      businessData &&
      Array.isArray(businessData) &&
      businessData.length > 0
    ) {
      console.log('🔍 businessData length:', businessData.length);
      const lobNames: string[] = [];

      try {
        // Extract only LOB name values with null/undefined checks
        businessData.forEach(item => {
          if (item && typeof item === 'object') {
            if (item['LOB name'] && typeof item['LOB name'] === 'string') {
              lobNames.push(item['LOB name']);
            }
          }
        });

        console.log('🔍 Extracted LOB names:', lobNames);

        // Get unique values and filter out empty ones
        const uniqueLobs = Array.from(new Set(lobNames));
        console.log('🔍 Unique LOBs:', uniqueLobs);

        const filteredLobs = uniqueLobs.filter(
          lob => lob && typeof lob === 'string' && lob.trim() !== ''
        );

        console.log('🔍 Final filtered LOBs:', filteredLobs);
        return filteredLobs;
      } catch (error) {
        console.error(
          'Error processing business data in getDynamicLobs:',
          error
        );
        return [];
      }
    }

    console.log('🔍 No businessData available, returning empty array');
    // Final fallback to empty array
    return [];
  };

  const getDynamicVerticals = () => {
    // Business Verticals are only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }

    // Use business data slice - extract only Business Vertical values
    if (
      businessData &&
      Array.isArray(businessData) &&
      businessData.length > 0
    ) {
      const businessVerticals: string[] = [];

      try {
        // Extract only Business Vertical values with null/undefined checks
        businessData.forEach(item => {
          if (item && typeof item === 'object') {
            if (
              item['Bussiness Vertical'] &&
              typeof item['Bussiness Vertical'] === 'string'
            ) {
              businessVerticals.push(item['Bussiness Vertical']);
            }
          }
        });

        // Get unique values and filter out empty ones
        const uniqueVerticals = Array.from(new Set(businessVerticals));
        return uniqueVerticals.filter(
          vertical =>
            vertical && typeof vertical === 'string' && vertical.trim() !== ''
        );
      } catch (error) {
        console.error(
          'Error processing business data in getDynamicVerticals:',
          error
        );
        return [];
      }
    }

    // Final fallback to empty array
    return [];
  };

  const getDynamicDurations = () => {
    return durations;
  };

  const getDynamicRegions = () => {
    return regions;
  };

  const getDynamicClientTypes = () => {
    return ['Corporate', 'Retail', 'Affinity'];
  };

  // Get dynamic filter values using useMemo to prevent infinite re-renders
  const products = useMemo(() => getDynamicProducts(), [importedData]);
  const insurers = useMemo(() => getDynamicInsurers(), [importedData]);
  const dynamicLobs = useMemo(() => {
    console.log('🔍 dynamicLobs useMemo triggered');
    console.log('🔍 businessData in useMemo:', businessData?.length);
    const result = getDynamicLobs();
    console.log('🔍 dynamicLobs useMemo result:', result);
    return result;
  }, [businessData]);
  const dynamicPolicyTypes = useMemo(
    () => getDynamicPolicyTypes(),
    [businessData]
  );
  const dynamicVerticals = useMemo(() => getDynamicVerticals(), [businessData]);
  const dynamicDurations = useMemo(() => getDynamicDurations(), [importedData]);
  const dynamicRegions = useMemo(() => getDynamicRegions(), [importedData]);
  const dynamicClientTypes = useMemo(
    () => getDynamicClientTypes(),
    [importedData]
  );

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
  };

  const handleReportTypeChange = (value: string) => {
    dispatch(setSelectedReportType(value as ReportType));

    // Clear specific filters when report type changes to ensure clean state
    dispatch(setSelectedProducts([]));
    dispatch(setSelectedInsurers([]));
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
      clientTypes: CLIENT_TYPES,
    };

    // Implementation for saving configuration to localStorage or API
    localStorage.setItem(
      'dashboardConfiguration',
      JSON.stringify(configuration)
    );

    // Show success message
    alert('Dashboard configuration saved successfully!');
  };

  // Business Data Filtering Handlers
  const handleBusinessDataFilterChange = (
    filterType: keyof typeof businessDataFilters,
    value: string
  ) => {
    const currentValues = businessDataFilters[filterType] || [];
    let newValues: string[];

    if (currentValues.includes(value)) {
      // Remove if already selected
      newValues = currentValues.filter(v => v !== value);
    } else {
      // Add to selection
      newValues = [...currentValues, value];
    }

    dispatch(updateBusinessDataFilter({ filterType, values: newValues }));
  };

  const handleBusinessDataFilterSelectAll = (
    filterType: keyof typeof businessDataFilters
  ) => {
    let allOptions: string[] = [];

    switch (filterType) {
      case 'durations':
        allOptions = businessFilterOptions.durations;
        break;
      case 'regions':
        allOptions = businessFilterOptions.regions;
        break;
      case 'clientTypes':
        allOptions = businessFilterOptions.clientTypes;
        break;
      case 'products':
        allOptions = businessFilterOptions.products;
        break;
      case 'insurers':
        allOptions = businessFilterOptions.insurers;
        break;
      case 'policyTypes':
        allOptions = businessFilterOptions.policyTypes;
        break;
      case 'lobs':
        allOptions = businessFilterOptions.lobs;
        break;
      case 'businessVerticals':
        allOptions = businessFilterOptions.businessVerticals;
        break;
    }

    dispatch(updateBusinessDataFilter({ filterType, values: allOptions }));
  };

  const handleBusinessDataFilterClearAll = (
    filterType: keyof typeof businessDataFilters
  ) => {
    dispatch(updateBusinessDataFilter({ filterType, values: [] }));
  };

  const clearAllBusinessDataFilters = () => {
    dispatch(clearBusinessDataFilters());
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
        // Load other settings
        // if (configuration.dateRange) setDateRange(configuration.dateRange); // dateRange state was removed
        if (configuration.selectedRegions)
          dispatch(setSelectedRegions(configuration.selectedRegions));
        if (configuration.selectedStates)
          dispatch(setSelectedStates(configuration.selectedStates));
        // if (configuration.chartType) setChartType(configuration.chartType);
        // ... load other settings as needed
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    }
  }, [onPinnedItemsChange]);

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
      // Auto-select all products when Business department is selected and products are available
      if (products.length > 0) {
        dispatch(setSelectedProducts([...products]));
      }
      // Auto-select all LOBs for Business department
      if (dynamicLobs.length > 0) {
        console.log('🚀 Setting selectedLob to all dynamicLobs:', dynamicLobs);
        dispatch(setSelectedLob([...dynamicLobs]));
      }
      // Auto-select all policy types for Business department
      if (dynamicPolicyTypes.length > 0) {
        dispatch(setSelectedPolicy([...dynamicPolicyTypes]));
      }
      // Auto-select all verticals for Business department
      if (dynamicVerticals.length > 0) {
        dispatch(setSelectedVertical([...dynamicVerticals]));
      }
      // Auto-select all client types for Business department
      if (dynamicClientTypes.length > 0) {
        dispatch(setSelectedClientTypes([...dynamicClientTypes]));
      }
    } else {
      // Clear Business-specific filters when not in Business department
      dispatch(setSelectedProducts([]));
      dispatch(setSelectedLob([]));
      dispatch(setSelectedPolicy([]));
      dispatch(setSelectedVertical([]));
    }

    // Handle Retention department filters
    if (selectedDepartment === 'Retention') {
      // Auto-select all client types for Retention department
      if (dynamicClientTypes.length > 0) {
        dispatch(setSelectedClientTypes([...dynamicClientTypes]));
      }
    } else if (selectedDepartment !== 'Business') {
      // Clear client types for departments other than Business and Retention
      dispatch(setSelectedClientTypes([]));
    }

    // Auto-select all insurers for departments that support them (Business and Retention)
    if (
      (selectedDepartment === 'Business' ||
        selectedDepartment === 'Retention') &&
      insurers.length > 0
    ) {
      dispatch(setSelectedInsurers([...insurers]));
    } else {
      dispatch(setSelectedInsurers([]));
    }

    // Auto-select all regions (available for all departments)
    if (dynamicRegions.length > 0) {
      dispatch(setSelectedRegions([...dynamicRegions]));
    }

    // Auto-select all states (using regions data as they appear to be the same)
    const statesData = [
      'Maharashtra',
      'Delhi',
      'Karnataka',
      'Tamil Nadu',
      'Telangana',
      'Maharashtra',
      'West Bengal',
      'Gujarat',
    ];
    dispatch(setSelectedStates([...statesData]));

    // Auto-select all teams (available for all departments)
    if (teams.length > 0) {
      dispatch(setSelectedTeams([...teams]));
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
                          {filterOptions.length > 0 && (
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
                                <div className="flex flex-wrap gap-1">
                                  {filterOptions.map(option => {
                                    const isSelected = isMultiSelect(item.id)
                                      ? Array.isArray(currentSelection) &&
                                        currentSelection.includes(option)
                                      : option === currentSelection;

                                    return (
                                      <Badge
                                        key={option}
                                        variant={
                                          isSelected ? 'default' : 'outline'
                                        }
                                        className={`text-xs cursor-pointer transition-all duration-200 ${
                                          isSelected
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'hover:bg-gray-100 hover:border-gray-300'
                                        }`}
                                        onClick={e => {
                                          e.stopPropagation();
                                          if (isMultiSelect(item.id)) {
                                            // Handle multi-select for teams, regions, products, insurers
                                            switch (item.id) {
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
                                                dispatch(
                                                  setSelectedRegions(
                                                    selectedRegions.includes(
                                                      option
                                                    )
                                                      ? selectedRegions.filter(
                                                          r => r !== option
                                                        )
                                                      : [
                                                          ...selectedRegions,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'products':
                                                dispatch(
                                                  setSelectedProducts(
                                                    selectedProducts.includes(
                                                      option
                                                    )
                                                      ? selectedProducts.filter(
                                                          p => p !== option
                                                        )
                                                      : [
                                                          ...selectedProducts,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'insurers':
                                                dispatch(
                                                  setSelectedInsurers(
                                                    selectedInsurers.includes(
                                                      option
                                                    )
                                                      ? selectedInsurers.filter(
                                                          i => i !== option
                                                        )
                                                      : [
                                                          ...selectedInsurers,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'brokers':
                                                dispatch(
                                                  setSelectedInsurers(
                                                    selectedInsurers.includes(
                                                      option
                                                    )
                                                      ? selectedInsurers.filter(
                                                          i => i !== option
                                                        )
                                                      : [
                                                          ...selectedInsurers,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'clientTypes':
                                                dispatch(
                                                  setSelectedClientTypes(
                                                    selectedClientTypes.includes(
                                                      option
                                                    )
                                                      ? selectedClientTypes.filter(
                                                          c => c !== option
                                                        )
                                                      : [
                                                          ...selectedClientTypes,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'policy':
                                                dispatch(
                                                  setSelectedPolicy(
                                                    selectedPolicy.includes(
                                                      option
                                                    )
                                                      ? selectedPolicy.filter(
                                                          p => p !== option
                                                        )
                                                      : [
                                                          ...selectedPolicy,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'lob':
                                                dispatch(
                                                  setSelectedLob(
                                                    selectedLob.includes(option)
                                                      ? selectedLob.filter(
                                                          l => l !== option
                                                        )
                                                      : [...selectedLob, option]
                                                  )
                                                );
                                                break;
                                              case 'vertical':
                                                dispatch(
                                                  setSelectedVertical(
                                                    selectedVertical.includes(
                                                      option
                                                    )
                                                      ? selectedVertical.filter(
                                                          v => v !== option
                                                        )
                                                      : [
                                                          ...selectedVertical,
                                                          option,
                                                        ]
                                                  )
                                                );
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
                                {isMultiSelect(item.id) && (
                                  <div className="mt-2 flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                      onClick={e => {
                                        e.stopPropagation();
                                        switch (item.id) {
                                          case 'teams':
                                            dispatch(
                                              setSelectedTeams([...teams])
                                            );
                                            break;
                                          case 'regions':
                                            dispatch(
                                              setSelectedRegions([...regions])
                                            );
                                            break;
                                          case 'products':
                                            dispatch(
                                              setSelectedProducts([...products])
                                            );
                                            break;
                                          case 'insurers':
                                            dispatch(
                                              setSelectedInsurers([...insurers])
                                            );
                                            break;
                                          case 'brokers':
                                            dispatch(
                                              setSelectedInsurers([...insurers])
                                            );
                                            break;
                                          case 'clientTypes':
                                            dispatch(
                                              setSelectedClientTypes([
                                                'Corporate',
                                                'Retail',
                                                'Affinity',
                                              ])
                                            );
                                            break;
                                          case 'policy':
                                            dispatch(
                                              setSelectedPolicy([
                                                ...getDynamicPolicyTypes(),
                                              ])
                                            );
                                            break;
                                          case 'lob':
                                            dispatch(
                                              setSelectedLob([
                                                ...getDynamicLobs(),
                                              ])
                                            );
                                            break;
                                          case 'vertical':
                                            dispatch(
                                              setSelectedVertical([
                                                ...getDynamicVerticals(),
                                              ])
                                            );
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
                                          case 'teams':
                                            dispatch(setSelectedTeams([]));
                                            break;
                                          case 'regions':
                                            dispatch(setSelectedRegions([]));
                                            break;
                                          case 'products':
                                            dispatch(setSelectedProducts([]));
                                            break;
                                          case 'insurers':
                                            dispatch(setSelectedInsurers([]));
                                            break;
                                          case 'brokers':
                                            dispatch(setSelectedInsurers([]));
                                            break;
                                          case 'clientTypes':
                                            dispatch(
                                              setSelectedClientTypes([])
                                            );
                                            break;
                                          case 'policy':
                                            dispatch(setSelectedPolicy([]));
                                            break;
                                          case 'lob':
                                            dispatch(setSelectedLob([]));
                                            break;
                                          case 'vertical':
                                            dispatch(setSelectedVertical([]));
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
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Business Data Filters Section */}
            {isBusinessDataFilterActive && (
              <Card className="p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                    <Filter className="w-4 h-4 text-blue-600" />
                    Excel-Style Business Data Filters
                  </h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllBusinessDataFilters}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                </div>

                <div className="space-y-4">
                  {Object.entries(businessFilterOptions).map(
                    ([filterType, options]) => {
                      if (!options || options.length === 0) return null;

                      const currentSelection =
                        businessDataFilters[
                          filterType as keyof typeof businessDataFilters
                        ] || [];
                      const isExpanded = true; // You can add state to control expansion

                      return (
                        <div
                          key={filterType}
                          className="border border-gray-100 rounded-lg"
                        >
                          <div className="p-3 bg-gray-50 border-b border-gray-100">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-medium text-gray-700 capitalize flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                {filterType.replace(/([A-Z])/g, ' $1').trim()}
                                <span className="text-gray-500">
                                  ({currentSelection.length}/{options.length})
                                </span>
                              </h4>
                              <div className="flex gap-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() =>
                                    handleBusinessDataFilterSelectAll(
                                      filterType as keyof typeof businessDataFilters
                                    )
                                  }
                                >
                                  Select All
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs text-gray-600 hover:text-gray-700 hover:bg-gray-50"
                                  onClick={() =>
                                    handleBusinessDataFilterClearAll(
                                      filterType as keyof typeof businessDataFilters
                                    )
                                  }
                                >
                                  Clear All
                                </Button>
                              </div>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="p-3">
                              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
                                {options.map(option => (
                                  <label
                                    key={option}
                                    className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 cursor-pointer"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={currentSelection.includes(
                                        option
                                      )}
                                      onChange={() =>
                                        handleBusinessDataFilterChange(
                                          filterType as keyof typeof businessDataFilters,
                                          option
                                        )
                                      }
                                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700 flex-1">
                                      {option}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>

                {Object.keys(businessDataFilters).some(
                  key =>
                    businessDataFilters[key as keyof typeof businessDataFilters]
                      ?.length > 0
                ) && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <h5 className="text-xs font-medium text-blue-800 mb-2">
                      Active Filters:
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(businessDataFilters).map(
                        ([filterType, values]) =>
                          values?.map(value => (
                            <span
                              key={`${filterType}-${value}`}
                              className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                            >
                              {filterType}: {value}
                              <button
                                onClick={() =>
                                  handleBusinessDataFilterChange(
                                    filterType as keyof typeof businessDataFilters,
                                    value
                                  )
                                }
                                className="ml-1 text-blue-600 hover:text-blue-800"
                              >
                                ×
                              </button>
                            </span>
                          ))
                      )}
                    </div>
                  </div>
                )}
              </Card>
            )}
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
