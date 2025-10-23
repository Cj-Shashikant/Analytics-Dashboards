import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  EntityType,
  DepartmentType,
  ReportType,
  LocationType,
  DurationType,
  ValueUnitType,
  DEFAULT_ENTITY,
  DEFAULT_DEPARTMENT,
  DEFAULT_REPORT_TYPE,
  DEFAULT_LOCATION,
  DEFAULT_DURATION,
  DEFAULT_VALUE_UNIT,
  getReportTypesForDepartment,
  getLocationOptions,
} from '../../constants/enums';
import {
  productAnalyticsData,
  insurerAnalyticsData,
  verticalAnalyticsData,
  lobAnalyticsData,
  revenueExpensesAnalyticsData,
} from '../../data';

export interface FilterState {
  // Filter selections
  selectedEntity: EntityType;
  selectedDepartment: DepartmentType;
  selectedReportType: ReportType;
  selectedLocation: LocationType;
  selectedDuration: DurationType;
  valueUnit: ValueUnitType;

  // Custom period handling
  customStartDate: Date | null;
  customEndDate: Date | null;
  isCustomPeriodModalOpen: boolean;

  // Modal states
  isAdvancedFiltersOpen: boolean;
  isComparisonModalOpen: boolean;
  isComparisonChartOpen: boolean;
  isRevenueFullScreen: boolean;
  isLeaderboardOpen: boolean;
  isTodaysReportOpen: boolean;

  // Comparison functionality
  comparisonPeriod1: string;
  comparisonPeriod2: string;
  comparisonCustomDates: {
    period1?: { start: Date; end: Date };
    period2?: { start: Date; end: Date };
  };

  // Advanced filter settings
  pinnedItems: string[];
  topExpenseCategories: number;

  // Full screen settings
  fullScreenChartType: string;

  // Auto-zoom and presentation settings
  isAutoZoomActive: boolean;
  isInitialDelayActive: boolean;
  autoZoomInterval: number;
  initialDelayDuration: number;
  totalElements: number;
  currentElementIndex: number;

  // Dummy data for charts and metrics
  dummyData: {
    totalRevenue: number;
    expenses: number;
    grossProfit: number;
    netProfit: number;
    revenueGrowth: number;
    expenseGrowth: number;
    profitMargin: number;

    // Product data
    productData: Array<{
      name: string;
      revenue: number;
      growth: number;
      percentage: number;
      color: string;
    }>;

    // Insurer data
    insurerData: Array<{
      name: string;
      revenue: number;
      policies: number;
      retention: number;
      color: string;
    }>;

    // Location performance
    locationPerformance: Array<{
      location: string;
      revenue: number;
      growth: number;
      target: number;
    }>;

    // Monthly trends
    monthlyTrends: Array<{
      month: string;
      revenue: number;
      expenses: number;
      profit: number;
    }>;
  };
}

const initialState: FilterState = {
  // Filter selections
  selectedEntity: DEFAULT_ENTITY,
  selectedDepartment: DEFAULT_DEPARTMENT,
  selectedReportType: DEFAULT_REPORT_TYPE,
  selectedLocation: DEFAULT_LOCATION,
  selectedDuration: DEFAULT_DURATION,
  valueUnit: DEFAULT_VALUE_UNIT,

  // Custom period handling
  customStartDate: null,
  customEndDate: null,
  isCustomPeriodModalOpen: false,

  // Modal states
  isAdvancedFiltersOpen: false,
  isComparisonModalOpen: false,
  isComparisonChartOpen: false,
  isRevenueFullScreen: false,
  isLeaderboardOpen: false,
  isTodaysReportOpen: false,

  // Comparison functionality
  comparisonPeriod1: '',
  comparisonPeriod2: '',
  comparisonCustomDates: {},

  // Advanced filter settings
  pinnedItems: [
    'organisation',
    'department',
    'reportType',
    'location',
    'duration',
  ],
  topExpenseCategories: 5,

  // Full screen settings
  fullScreenChartType: 'revenue',

  // Auto-zoom and presentation settings
  isAutoZoomActive: false,
  isInitialDelayActive: false,
  autoZoomInterval: 3000,
  initialDelayDuration: 5000,
  totalElements: 0,
  currentElementIndex: 0,

  // Dummy data
  dummyData: {
    totalRevenue: 240000000, // ₹24 crores
    expenses: 153467000, // ₹15.35 crores
    grossProfit: 86533000, // ₹8.65 crores
    netProfit: 72000000, // ₹7.2 crores
    revenueGrowth: 12.5,
    expenseGrowth: 8.3,
    profitMargin: 30.0,

    productData: productAnalyticsData.map(product => ({
      name: product.name,
      revenue: product.premiumRevenue,
      growth: Math.random() * 20 - 5, // Random growth between -5% and 15%
      percentage: product.revenuePercentage,
      color: product.color,
    })),

    insurerData: insurerAnalyticsData.map(insurer => ({
      name: insurer.name,
      revenue: insurer.premiumRevenue,
      growth: Math.random() * 20 - 5, // Random growth between -5% and 15%
      percentage: insurer.revenuePercentage,
      color: insurer.color,
    })),

    locationPerformance: [
      { location: 'Mumbai', revenue: 85000000, growth: 18.5, target: 80000000 },
      { location: 'Delhi', revenue: 62000000, growth: 12.3, target: 65000000 },
      {
        location: 'Bangalore',
        revenue: 48000000,
        growth: 25.7,
        target: 45000000,
      },
      { location: 'Chennai', revenue: 32000000, growth: 8.9, target: 35000000 },
      {
        location: 'Hyderabad',
        revenue: 13000000,
        growth: 15.2,
        target: 12000000,
      },
    ],

    monthlyTrends: [
      {
        month: 'Apr 2023',
        revenue: 18500000,
        expenses: 12200000,
        profit: 6300000,
      },
      {
        month: 'May 2023',
        revenue: 19200000,
        expenses: 12800000,
        profit: 6400000,
      },
      {
        month: 'Jun 2023',
        revenue: 20800000,
        expenses: 13500000,
        profit: 7300000,
      },
      {
        month: 'Jul 2023',
        revenue: 21500000,
        expenses: 13900000,
        profit: 7600000,
      },
      {
        month: 'Aug 2023',
        revenue: 22100000,
        expenses: 14200000,
        profit: 7900000,
      },
      {
        month: 'Sep 2023',
        revenue: 23200000,
        expenses: 14800000,
        profit: 8400000,
      },
      {
        month: 'Oct 2023',
        revenue: 24000000,
        expenses: 15200000,
        profit: 8800000,
      },
      {
        month: 'Nov 2023',
        revenue: 24800000,
        expenses: 15600000,
        profit: 9200000,
      },
      {
        month: 'Dec 2023',
        revenue: 25500000,
        expenses: 16000000,
        profit: 9500000,
      },
      {
        month: 'Jan 2024',
        revenue: 26200000,
        expenses: 16400000,
        profit: 9800000,
      },
      {
        month: 'Feb 2024',
        revenue: 26800000,
        expenses: 16800000,
        profit: 10000000,
      },
      {
        month: 'Mar 2024',
        revenue: 27500000,
        expenses: 17200000,
        profit: 10300000,
      },
    ],
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    // Filter selection actions
    setSelectedEntity: (state, action: PayloadAction<EntityType>) => {
      state.selectedEntity = action.payload;
    },

    setSelectedDepartment: (state, action: PayloadAction<DepartmentType>) => {
      state.selectedDepartment = action.payload;

      // Reset location to "All Location" when department changes
      const newLocationOptions = getLocationOptions(action.payload);
      if (newLocationOptions.length > 0) {
        state.selectedLocation = 'All Location' as LocationType;
      }

      // Reset report type to first available for new department
      const newReportTypes = getReportTypesForDepartment(action.payload);
      if (newReportTypes.length > 0) {
        state.selectedReportType = newReportTypes[0] as ReportType;
      }
    },

    setSelectedReportType: (state, action: PayloadAction<ReportType>) => {
      state.selectedReportType = action.payload;
      // Stop auto-zoom when report type changes
      state.isAutoZoomActive = false;
      state.isInitialDelayActive = false;
    },

    setSelectedLocation: (state, action: PayloadAction<LocationType>) => {
      state.selectedLocation = action.payload;
    },

    setSelectedDuration: (state, action: PayloadAction<DurationType>) => {
      state.selectedDuration = action.payload;
      if (action.payload === 'Custom Period') {
        state.isCustomPeriodModalOpen = true;
      }
    },

    setValueUnit: (state, action: PayloadAction<ValueUnitType>) => {
      state.valueUnit = action.payload;
    },

    cycleValueUnit: state => {
      const units: ValueUnitType[] = ['K', 'L', 'Cr'];
      const currentIndex = units.indexOf(state.valueUnit);
      const nextIndex = (currentIndex + 1) % units.length;
      state.valueUnit = units[nextIndex] as ValueUnitType;
    },

    // Custom period actions
    setCustomDates: (
      state,
      action: PayloadAction<{ startDate: Date | null; endDate: Date | null }>
    ) => {
      state.customStartDate = action.payload.startDate;
      state.customEndDate = action.payload.endDate;
      if (action.payload.startDate && action.payload.endDate) {
        state.selectedDuration = 'Custom Period';
      }
    },

    setIsCustomPeriodModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCustomPeriodModalOpen = action.payload;
    },

    // Modal state actions
    setIsAdvancedFiltersOpen: (state, action: PayloadAction<boolean>) => {
      state.isAdvancedFiltersOpen = action.payload;
    },

    setIsComparisonModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isComparisonModalOpen = action.payload;
    },

    setIsComparisonChartOpen: (state, action: PayloadAction<boolean>) => {
      state.isComparisonChartOpen = action.payload;
    },

    setIsRevenueFullScreen: (state, action: PayloadAction<boolean>) => {
      state.isRevenueFullScreen = action.payload;
    },

    setIsLeaderboardOpen: (state, action: PayloadAction<boolean>) => {
      state.isLeaderboardOpen = action.payload;
    },

    setIsTodaysReportOpen: (state, action: PayloadAction<boolean>) => {
      state.isTodaysReportOpen = action.payload;
    },

    // Comparison actions
    setComparisonPeriods: (
      state,
      action: PayloadAction<{ period1: string; period2: string }>
    ) => {
      state.comparisonPeriod1 = action.payload.period1;
      state.comparisonPeriod2 = action.payload.period2;
    },

    setComparisonCustomDates: (
      state,
      action: PayloadAction<FilterState['comparisonCustomDates']>
    ) => {
      state.comparisonCustomDates = action.payload;
    },

    // Advanced filter actions
    setPinnedItems: (state, action: PayloadAction<string[]>) => {
      state.pinnedItems = action.payload;
    },

    setTopExpenseCategories: (state, action: PayloadAction<number>) => {
      state.topExpenseCategories = action.payload;
    },

    // Full screen actions
    setFullScreenChartType: (state, action: PayloadAction<string>) => {
      state.fullScreenChartType = action.payload;
    },

    // Auto-zoom and presentation actions
    setIsAutoZoomActive: (state, action: PayloadAction<boolean>) => {
      state.isAutoZoomActive = action.payload;
    },

    setIsInitialDelayActive: (state, action: PayloadAction<boolean>) => {
      state.isInitialDelayActive = action.payload;
    },

    setAutoZoomInterval: (state, action: PayloadAction<number>) => {
      state.autoZoomInterval = action.payload;
    },

    setInitialDelayDuration: (state, action: PayloadAction<number>) => {
      state.initialDelayDuration = action.payload;
    },

    setTotalElements: (state, action: PayloadAction<number>) => {
      state.totalElements = action.payload;
    },

    setCurrentElementIndex: (state, action: PayloadAction<number>) => {
      state.currentElementIndex = action.payload;
    },

    // Reset actions
    resetFilters: state => {
      state.selectedEntity = DEFAULT_ENTITY;
      state.selectedDepartment = DEFAULT_DEPARTMENT;
      state.selectedReportType = DEFAULT_REPORT_TYPE;
      state.selectedLocation = DEFAULT_LOCATION;
      state.selectedDuration = DEFAULT_DURATION;
      state.valueUnit = DEFAULT_VALUE_UNIT;
      state.customStartDate = null;
      state.customEndDate = null;
    },

    resetModalStates: state => {
      state.isAdvancedFiltersOpen = false;
      state.isComparisonModalOpen = false;
      state.isComparisonChartOpen = false;
      state.isRevenueFullScreen = false;
      state.isLeaderboardOpen = false;
      state.isTodaysReportOpen = false;
      state.isCustomPeriodModalOpen = false;
    },
  },
});

export const {
  // Filter selection actions
  setSelectedEntity,
  setSelectedDepartment,
  setSelectedReportType,
  setSelectedLocation,
  setSelectedDuration,
  setValueUnit,
  cycleValueUnit,

  // Custom period actions
  setCustomDates,
  setIsCustomPeriodModalOpen,

  // Modal state actions
  setIsAdvancedFiltersOpen,
  setIsComparisonModalOpen,
  setIsComparisonChartOpen,
  setIsRevenueFullScreen,
  setIsLeaderboardOpen,
  setIsTodaysReportOpen,

  // Comparison actions
  setComparisonPeriods,
  setComparisonCustomDates,

  // Advanced filter actions
  setPinnedItems,
  setTopExpenseCategories,

  // Full screen actions
  setFullScreenChartType,

  // Auto-zoom and presentation actions
  setIsAutoZoomActive,
  setIsInitialDelayActive,
  setAutoZoomInterval,
  setInitialDelayDuration,
  setTotalElements,
  setCurrentElementIndex,

  // Reset actions
  resetFilters,
  resetModalStates,
} = filterSlice.actions;

export default filterSlice.reducer;

// Selectors that use imported data when available, otherwise fallback to dummy data
export const selectAnalyticsData = (state: any) => {
  const importedData = state.importedData;
  const filterData = state.filter.dummyData;

  if (importedData.isDataImported) {
    return {
      totalRevenue: importedData.totalRevenue,
      expenses: importedData.expenses,
      grossProfit: importedData.grossProfit,
      netProfit: importedData.netProfit,
      revenueGrowth: importedData.revenueGrowth,
      expenseGrowth: importedData.expenseGrowth,
      profitMargin: importedData.profitMargin,
      productData: importedData.productData,
      insurerData: importedData.insurerData,
      locationPerformance: importedData.locationPerformance,
      monthlyTrends: importedData.monthlyTrends,
    };
  }

  return filterData;
};

export const selectProductData = (state: any) => {
  const data = selectAnalyticsData(state);
  return data.productData;
};

export const selectInsurerData = (state: any) => {
  const data = selectAnalyticsData(state);
  return data.insurerData;
};

export const selectLocationData = (state: any) => {
  const data = selectAnalyticsData(state);
  return data.locationPerformance;
};

export const selectMonthlyTrends = (state: any) => {
  const data = selectAnalyticsData(state);
  return data.monthlyTrends;
};

export const selectMainMetrics = (state: any) => {
  const data = selectAnalyticsData(state);
  return {
    totalRevenue: data.totalRevenue,
    expenses: data.expenses,
    grossProfit: data.grossProfit,
    netProfit: data.netProfit,
    revenueGrowth: data.revenueGrowth,
    expenseGrowth: data.expenseGrowth,
    profitMargin: data.profitMargin,
  };
};
