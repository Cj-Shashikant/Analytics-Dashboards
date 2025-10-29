import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  // Import all data from the data folder
  productAnalyticsData,
  insurerAnalyticsData,
  verticalAnalyticsData,
  lobAnalyticsData,
  revenueExpensesAnalyticsData,
  crossSellAnalyticsData,
  policyTypeAnalyticsData,
  brokerRetentionAnalyticsData,
  insurerRetentionAnalyticsData,
  numberOfProductsAnalyticsData,
} from '../../data';

// Import interfaces
import {
  ProductAnalyticsData,
  InsurerAnalyticsData,
  VerticalAnalyticsData,
  LobAnalyticsData,
  RevenueExpensesAnalyticsData,
  CrossSellAnalyticsData,
  PolicyTypeAnalyticsData,
  BrokerRetentionAnalyticsData,
  InsurerRetentionAnalyticsData,
  NumberOfProductsAnalyticsData,
} from '../../data';

// Professional color palette
const professionalColors = {
  revenueColors: [
    '#3B82F6', // Professional blue
    '#10B981', // Emerald green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#F1948A',
    '#85929E',
    '#D5A6BD',
  ],
  CommonColors: [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#84CC16',
    '#EC4899',
    '#14B8A6',
    '#F97316',
  ],
};

// Base metrics data
const baseMetricsData = {
  totalPremium: 125000000,
  totalPolicies: 52000,
  averagePremium: 2403.85,
  growthRate: 12.5,
  retentionRate: 87.3,
  newBusinessRate: 15.2,
  // Add the missing properties that are expected by the components
  totalRevenue: 125000000, // Same as totalPremium for insurance context
  expenses: 87500000, // Approximately 70% of revenue
  grossProfit: 37500000, // Revenue - Expenses
};

// Loss reason data for retention analysis
const lossReasonData = [
  {
    id: 'pricing-issues',
    name: 'Pricing Issues',
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: '#3B82F6',
    percentage: 23.0,
  },
  {
    id: 'price-competitiveness',
    name: 'Price Competitiveness',
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: '#6B7280',
    percentage: 35.2,
  },
  {
    id: 'poor-service',
    name: 'Poor Service',
    value: 2356000,
    premium: 2356000,
    policies: 980,
    color: '#10B981',
    percentage: 19.0,
  },
  {
    id: 'better-offers',
    name: 'Better Offers Elsewhere',
    value: 1982000,
    premium: 1982000,
    policies: 820,
    color: '#F59E0B',
    percentage: 16.0,
  },
  {
    id: 'policy-changes',
    name: 'Policy Changes',
    value: 845000,
    premium: 845000,
    policies: 350,
    color: '#8B5CF6',
    percentage: 6.8,
  },
];

// Retention metrics
const retentionMetrics = {
  totalRetained: 87.3,
  totalLost: 12.7,
  retainedPremium: 109125000,
  lostPremium: 15875000,
  retainedPolicies: 45396,
  lostPolicies: 6604,
  averageRetainedPremium: 2403.85,
  averageLostPremium: 2403.85,
};

// Define the state interface
interface AnalyticsDataState {
  // Product data
  products: ProductAnalyticsData[];

  // Insurer data
  insurers: InsurerAnalyticsData[];

  // Vertical data
  verticals: VerticalAnalyticsData[];

  // LOB data
  lobs: LobAnalyticsData[];

  // Revenue expenses data
  revenueExpenses: RevenueExpensesAnalyticsData[];

  // Cross sell data
  crossSell: CrossSellAnalyticsData[];

  // Policy type data
  policyTypes: PolicyTypeAnalyticsData[];

  // Retention data
  brokerRetention: BrokerRetentionAnalyticsData[];
  insurerRetention: InsurerRetentionAnalyticsData[];

  // Number of products data
  numberOfProducts: NumberOfProductsAnalyticsData[];

  // Additional analytics data
  baseMetrics: typeof baseMetricsData;
  lossReasons: typeof lossReasonData;
  retentionMetrics: typeof retentionMetrics;
  colorPalette: typeof professionalColors;

  // Loading states
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: AnalyticsDataState = {
  products: productAnalyticsData,
  insurers: insurerAnalyticsData,
  verticals: verticalAnalyticsData,
  lobs: lobAnalyticsData,
  revenueExpenses: revenueExpensesAnalyticsData,
  crossSell: crossSellAnalyticsData,
  policyTypes: policyTypeAnalyticsData,
  brokerRetention: brokerRetentionAnalyticsData,
  insurerRetention: insurerRetentionAnalyticsData,
  numberOfProducts: numberOfProductsAnalyticsData,
  baseMetrics: baseMetricsData,
  lossReasons: lossReasonData,
  retentionMetrics: retentionMetrics,
  colorPalette: professionalColors,
  loading: false,
  error: null,
};

// Create the slice
const analyticsDataSlice = createSlice({
  name: 'analyticsData',
  initialState,
  reducers: {
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Update product data
    updateProducts: (state, action: PayloadAction<ProductAnalyticsData[]>) => {
      state.products = action.payload;
    },

    // Update insurer data
    updateInsurers: (state, action: PayloadAction<InsurerAnalyticsData[]>) => {
      state.insurers = action.payload;
    },

    // Update vertical data
    updateVerticals: (
      state,
      action: PayloadAction<VerticalAnalyticsData[]>
    ) => {
      state.verticals = action.payload;
    },

    // Update LOB data
    updateLobs: (state, action: PayloadAction<LobAnalyticsData[]>) => {
      state.lobs = action.payload;
    },

    // Update revenue expenses data
    updateRevenueExpenses: (
      state,
      action: PayloadAction<RevenueExpensesAnalyticsData[]>
    ) => {
      state.revenueExpenses = action.payload;
    },

    // Update cross sell data
    updateCrossSell: (
      state,
      action: PayloadAction<CrossSellAnalyticsData[]>
    ) => {
      state.crossSell = action.payload;
    },

    // Update policy type data
    updatePolicyTypes: (
      state,
      action: PayloadAction<PolicyTypeAnalyticsData[]>
    ) => {
      state.policyTypes = action.payload;
    },

    // Update broker retention data
    updateBrokerRetention: (
      state,
      action: PayloadAction<BrokerRetentionAnalyticsData[]>
    ) => {
      state.brokerRetention = action.payload;
    },

    // Update insurer retention data
    updateInsurerRetention: (
      state,
      action: PayloadAction<InsurerRetentionAnalyticsData[]>
    ) => {
      state.insurerRetention = action.payload;
    },

    // Update number of products data
    updateNumberOfProducts: (
      state,
      action: PayloadAction<NumberOfProductsAnalyticsData[]>
    ) => {
      state.numberOfProducts = action.payload;
    },

    // Update base metrics
    updateBaseMetrics: (
      state,
      action: PayloadAction<typeof baseMetricsData>
    ) => {
      state.baseMetrics = action.payload;
    },

    // Reset all data to initial state
    resetData: state => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  updateProducts,
  updateInsurers,
  updateVerticals,
  updateLobs,
  updateRevenueExpenses,
  updateCrossSell,
  updatePolicyTypes,
  updateBrokerRetention,
  updateInsurerRetention,
  updateNumberOfProducts,
  updateBaseMetrics,
  resetData,
} = analyticsDataSlice.actions;

// Selectors
export const selectProducts = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.products;
export const selectInsurers = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.insurers;
export const selectVerticals = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.verticals;
export const selectLobs = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.lobs;
export const selectRevenueExpenses = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.revenueExpenses;
export const selectCrossSell = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.crossSell;
export const selectPolicyTypes = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.policyTypes;
export const selectBrokerRetention = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.brokerRetention;
export const selectInsurerRetention = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.insurerRetention;
export const selectNumberOfProducts = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.numberOfProducts;
export const selectBaseMetrics = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.baseMetrics;
export const selectLossReasons = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.lossReasons;
export const selectRetentionMetrics = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.retentionMetrics;
export const selectColorPalette = (state: {
  analyticsData: AnalyticsDataState;
}) => state.analyticsData.colorPalette;
export const selectLoading = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.loading;
export const selectError = (state: { analyticsData: AnalyticsDataState }) =>
  state.analyticsData.error;

// Export the reducer
export default analyticsDataSlice.reducer;
