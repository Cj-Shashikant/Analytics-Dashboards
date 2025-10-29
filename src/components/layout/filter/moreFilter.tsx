import React, { useState, useEffect } from 'react';
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
  Monitor,
  Settings,
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
  setSelectedLobs,
  setSelectedPolicyTypes,
  setSelectedVerticals,
  setSelectedClientTypes,
  setSelectedRegions,
  setSelectedStates,
  setSelectedTeams,
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
import { productAnalyticsData } from '@/data/productData';
import { lobAnalyticsData } from '@/data/lobData';
import { verticalAnalyticsData } from '@/data/verticalData';
import { insurerAnalyticsData } from '@/data/insurerData';
import { policyTypeAnalyticsData } from '@/data/policyTypeData';
import { insurerRetentionAnalyticsData } from '@/data/retentionByInsurerData';
import { brokerRetentionAnalyticsData } from '@/data/retentionByBrokerData';
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
  const dispatch = useAppDispatch();

  // Get current filter state from Redux
  const {
    selectedDepartment,
    selectedReportType,
    selectedDuration,
    pinnedItems,
    selectedProducts,
    selectedInsurers,
    selectedLobs,
    selectedPolicyTypes,
    selectedVerticals,
    selectedClientTypes,
    selectedRegions,
    selectedStates,
    selectedCities,
    selectedTeams,
  } = useAppSelector(state => state.filter);

  // Get imported data state from Redux
  const importedData = useAppSelector(state => state.importedData);

  // Date Range Filters
  const [dateRange, setDateRange] = useState('FY 2022-23');

  // Local state for non-Redux managed filters
  const [selectedMembers] = useState<string[]>(['All Members']);
  const [performanceRange] = useState([0, 100]);

  // Legacy Business Filters (keeping for compatibility)
  const [policyTypes] = useState<string[]>(['Individual', 'Group']);
  const [businessVerticals] = useState<string[]>(['Corporate', 'Retail']);
  const [revenueRange] = useState([0, 10000000]);

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

  // Get locations based on department (simplified for now)
  // const locations = [
  //   'All Location',
  //   'Mumbai',
  //   'Delhi',
  //   'Bangalore',
  //   'Chennai',
  //   'Hyderabad',
  //   'Pune',
  //   'Kolkata',
  //   'Ahmedabad',
  // ];

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

  // Dynamic data functions - prioritize imported data, fallback to default data, and filter by department
  const getDynamicProducts = () => {
    // Products are only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }

    if (importedData.isDataImported && importedData.productData.length > 0) {
      return importedData.productData.map(product => product.name);
    }
    return productAnalyticsData.map(product => product.name);
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

    // For other departments, use imported data if available
    if (importedData.isDataImported && importedData.insurerData.length > 0) {
      return importedData.insurerData.map(insurer => insurer.name);
    }

    // For Business department, show business insurers
    return insurerAnalyticsData.map(insurer => insurer.name);
  };

  const getDynamicLobs = () => {
    // LOB data is only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return lobAnalyticsData.map(lob => lob.name);
  };

  const getDynamicPolicyTypes = () => {
    // Policy types are only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return policyTypeAnalyticsData.map(policyType => policyType.name);
  };

  const getDynamicVerticals = () => {
    // Vertical data is only available for Business department
    if (selectedDepartment !== 'Business') {
      return [];
    }
    return verticalAnalyticsData.map(vertical => vertical.name);
  };

  // Get dynamic filter values
  const products = getDynamicProducts();
  const insurers = getDynamicInsurers();
  const lobs = getDynamicLobs();
  const policyTypeOptions = getDynamicPolicyTypes();
  const verticals = getDynamicVerticals();

  // Dynamic function to get filter options based on report type
  // const getDynamicFilterOptionsForReportType = (reportType: string) => {
  //   switch (reportType) {
  //     case 'Revenue by Products':
  //       return {
  //         label: 'Products',
  //         options: products,
  //         description: 'Select products to analyze revenue performance',
  //       };
  //     case 'Revenue by Insurers':
  //       return {
  //         label: 'Insurers',
  //         options: insurers,
  //         description: 'Select insurers to analyze revenue performance',
  //       };
  //     case 'Revenue by Policy Type':
  //       return {
  //         label: 'Policy Types',
  //         options: policyTypeOptions,
  //         description: 'Select policy types to analyze revenue performance',
  //       };
  //     case 'Revenue by Vertical':
  //       return {
  //         label: 'Business Verticals',
  //         options: verticals,
  //         description:
  //           'Select business verticals to analyze revenue performance',
  //       };
  //     case 'Revenue by LOB':
  //       return {
  //         label: 'Lines of Business',
  //         options: lobs,
  //         description: 'Select LOBs to analyze revenue performance',
  //       };
  //     case 'Retention - By Insurer':
  //       return {
  //         label: 'Insurers',
  //         options: insurers,
  //         description: 'Select insurers to analyze retention rates',
  //       };
  //     default:
  //       return {
  //         label: 'Options',
  //         options: [],
  //         description: 'No specific options available for this report type',
  //       };
  //   }
  // };

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
    ];

    // Add department-specific filters
    if (selectedDepartment === 'Business') {
      baseFilterItems.push(
        {
          id: 'products',
          name: 'Products',
          icon: Building2,
          currentValue: `${selectedProducts.length} selected`,
          category: 'Business',
        },
        {
          id: 'insurers',
          name: 'Insurers',
          icon: Building2,
          currentValue: `${selectedInsurers.length} selected`,
          category: 'Business',
        },
        {
          id: 'lob',
          name: 'LOB (Line of Business)',
          icon: Target,
          currentValue: `${selectedLobs.length} selected`,
          category: 'Business',
        },
        {
          id: 'policyType',
          name: 'Policy Type',
          icon: Building2,
          currentValue: `${selectedPolicyTypes.length} selected`,
          category: 'Business',
        },
        {
          id: 'vertical',
          name: 'Vertical Cross Cell Presentation',
          icon: Monitor,
          currentValue: `${selectedVerticals.length} selected`,
          category: 'Business',
        },
        {
          id: 'clientTypes',
          name: 'Client Types',
          icon: Users,
          currentValue: `${selectedClientTypes.length} selected`,
          category: 'Business',
        }
      );
    } else if (selectedDepartment === 'Retention') {
      // For Retention department, show different options based on report type
      if (selectedReportType === 'Retention - By Insurer') {
        baseFilterItems.push({
          id: 'insurers',
          name: 'Insurers',
          icon: Building2,
          currentValue: `${selectedInsurers.length} selected`,
          category: 'Retention',
        });
      } else if (selectedReportType === 'Retention - Broker') {
        baseFilterItems.push({
          id: 'brokers',
          name: 'Brokers',
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

    // Legacy callback removed - now using Redux state management
  };

  const handleReportTypeChange = (value: string) => {
    dispatch(setSelectedReportType(value as ReportType));
  };

  const handleDurationChange = (value: string) => {
    dispatch(setSelectedDuration(value as DurationType));
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

  // const resetFilters = () => {
  //   setDateRange('FY 2022-23');
  //   setSelectedRegions(['Mumbai', 'Delhi', 'Bangalore']);
  //   setSelectedStates(['Maharashtra', 'Delhi', 'Karnataka']);
  //   setSelectedCities(['Mumbai', 'Delhi', 'Bangalore']);
  //   setSelectedTeams(['Sales Team A', 'Sales Team B']);
  //   setSelectedMembers(['All Members']);
  //   setPerformanceRange([0, 100]);
  //   setSelectedProducts(['Health Insurance', 'Motor Insurance']);
  //   setSelectedInsurers(['ICICI Lombard', 'HDFC ERGO']);
  //   setPolicyTypes(['Individual', 'Group']);
  //   setBusinessVerticals(['Corporate', 'Retail']);
  //   setSelectedLobs(['General Insurance']);
  //   setSelectedPolicyTypes(['Individual']);
  //   setSelectedVerticals(['Corporate']);
  //   setClientTypes(['New', 'Existing']);
  //   setRevenueRange([0, 10000000]);
  //   setChartType('donut');
  //   setShowPercentages(true);
  //   setShowLegend(true);
  //   setAnimateCharts(true);
  //   setColorScheme('professional');
  //   setRefreshInterval('manual');
  //   setEnableNotifications(true);
  //   setAutoSave(false);
  //   setExportFormat('xlsx');
  // };

  const saveConfiguration = () => {
    // Save both filter settings and pinned items configuration
    const configuration = {
      pinnedItems,
      dateRange,
      selectedRegions,
      selectedStates,
      selectedCities,
      selectedTeams,
      selectedMembers,
      performanceRange,
      selectedProducts,
      selectedInsurers,
      policyTypes,
      businessVerticals,
      selectedLobs,
      selectedPolicyTypes,
      selectedVerticals,
      clientTypes: CLIENT_TYPES,
      revenueRange,
    };

    console.log('Saving configuration...', configuration);
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
        // Load other settings
        if (configuration.dateRange) setDateRange(configuration.dateRange);
        if (configuration.selectedRegions)
          dispatch(setSelectedRegions(configuration.selectedRegions));
        if (configuration.selectedStates)
          dispatch(setSelectedStates(configuration.selectedStates));
        if (configuration.selectedLobs)
          dispatch(setSelectedLobs(configuration.selectedLobs));
        if (configuration.selectedPolicyTypes)
          dispatch(setSelectedPolicyTypes(configuration.selectedPolicyTypes));
        if (configuration.selectedVerticals)
          dispatch(setSelectedVerticals(configuration.selectedVerticals));
        // if (configuration.chartType) setChartType(configuration.chartType);
        // ... load other settings as needed
      } catch (error) {
        console.error('Error loading saved configuration:', error);
      }
    }
  }, [onPinnedItemsChange]);

  // Auto-select all available items when department or report type changes
  useEffect(() => {
    // Handle Business department filters
    if (selectedDepartment === 'Business') {
      // Auto-select all products when Business department is selected and products are available
      if (products.length > 0) {
        dispatch(setSelectedProducts([...products]));
      }

      // Auto-select all LOBs when Business department is selected and LOBs are available
      if (lobs.length > 0) {
        dispatch(setSelectedLobs([...lobs]));
      }

      // Auto-select all policy types when Business department is selected and policy types are available
      if (policyTypeOptions.length > 0) {
        dispatch(setSelectedPolicyTypes([...policyTypeOptions]));
      }

      // Auto-select all verticals when Business department is selected and verticals are available
      if (verticals.length > 0) {
        dispatch(setSelectedVerticals([...verticals]));
      }

      // Auto-select all client types for Business department
      if (CLIENT_TYPES.length > 0) {
        dispatch(setSelectedClientTypes([...CLIENT_TYPES]));
      }
    } else {
      // Clear Business-specific filters when not in Business department
      dispatch(setSelectedProducts([]));
      dispatch(setSelectedLobs([]));
      dispatch(setSelectedPolicyTypes([]));
      dispatch(setSelectedVerticals([]));
    }

    // Handle Retention department filters
    if (selectedDepartment === 'Retention') {
      // Auto-select all client types for Retention department
      if (CLIENT_TYPES.length > 0) {
        dispatch(setSelectedClientTypes([...CLIENT_TYPES]));
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
    if (regions.length > 0) {
      dispatch(setSelectedRegions([...regions]));
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
  }, [selectedDepartment, selectedReportType]);

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
                            return durations;

                          case 'teams':
                            return teams;
                          case 'regions':
                            return regions;
                          case 'products':
                            // Dynamic products based on imported data or default data
                            return getDynamicProducts();
                          case 'insurers':
                            // Dynamic insurers based on imported data or default data
                            return getDynamicInsurers();
                          case 'brokers':
                            // Dynamic brokers for retention data
                            return getDynamicInsurers();
                          case 'lob':
                            // Dynamic LOBs
                            return getDynamicLobs();
                          case 'policyType':
                            // Dynamic policy types
                            return getDynamicPolicyTypes();
                          case 'vertical':
                            // Dynamic verticals
                            return getDynamicVerticals();
                          case 'clientTypes':
                            // Client types for Business and Retention departments
                            return ['Corporate', 'Retail', 'Affinity'];
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
                          case 'lob':
                            return selectedLobs;
                          case 'policyType':
                            return selectedPolicyTypes;
                          case 'vertical':
                            return selectedVerticals;
                          case 'clientTypes':
                            return selectedClientTypes;
                          default:
                            return '';
                        }
                      };

                      const isMultiSelect = (filterId: string) => {
                        return [
                          'teams',
                          'regions',
                          'products',
                          'insurers',
                          'lob',
                          'policyType',
                          'vertical',
                          'clientTypes',
                        ].includes(filterId);
                      };

                      const filterOptions = getFilterOptions(item.id);
                      const currentSelection = getCurrentSelection(item.id);

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
                                              case 'lob':
                                                dispatch(
                                                  setSelectedLobs(
                                                    selectedLobs.includes(
                                                      option
                                                    )
                                                      ? selectedLobs.filter(
                                                          l => l !== option
                                                        )
                                                      : [
                                                          ...selectedLobs,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'policyType':
                                                dispatch(
                                                  setSelectedPolicyTypes(
                                                    selectedPolicyTypes.includes(
                                                      option
                                                    )
                                                      ? selectedPolicyTypes.filter(
                                                          p => p !== option
                                                        )
                                                      : [
                                                          ...selectedPolicyTypes,
                                                          option,
                                                        ]
                                                  )
                                                );
                                                break;
                                              case 'vertical':
                                                dispatch(
                                                  setSelectedVerticals(
                                                    selectedVerticals.includes(
                                                      option
                                                    )
                                                      ? selectedVerticals.filter(
                                                          v => v !== option
                                                        )
                                                      : [
                                                          ...selectedVerticals,
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
                                          case 'lob':
                                            dispatch(
                                              setSelectedLobs([...lobs])
                                            );
                                            break;
                                          case 'policyType':
                                            dispatch(
                                              setSelectedPolicyTypes([
                                                ...policyTypeOptions,
                                              ])
                                            );
                                            break;
                                          case 'vertical':
                                            dispatch(
                                              setSelectedVerticals([
                                                ...verticals,
                                              ])
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
                                          case 'lob':
                                            dispatch(setSelectedLobs([]));
                                            break;
                                          case 'policyType':
                                            dispatch(
                                              setSelectedPolicyTypes([])
                                            );
                                            break;
                                          case 'vertical':
                                            dispatch(setSelectedVerticals([]));
                                            break;
                                          case 'clientTypes':
                                            dispatch(
                                              setSelectedClientTypes([])
                                            );
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
          </Card>
        </div>
      </SheetContent>
    </Sheet>
  );
}
