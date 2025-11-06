import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  RelationState,
  DurationData,
  RelationSummaryMetrics,
  InsightCategory,
} from '@/constants/interfaces/relation';
import { DurationCategory, ColorTheme } from '@/constants/enums/relation';

// Dummy data for duration of relationship
const durationData: DurationData[] = [
  {
    duration: DurationCategory.LESS_THAN_ONE_YEAR,
    customers: 1250,
    percentage: 15.6,
    avgPremium: 45000,
    avgProducts: 1.2,
    productDistribution: {
      oneProduct: 950,
      twoProducts: 250,
      threeOrMore: 50,
    },
    color: ColorTheme.PRIMARY,
  },
  {
    duration: DurationCategory.ONE_TO_THREE_YEARS,
    customers: 2800,
    percentage: 35.0,
    avgPremium: 68000,
    avgProducts: 1.6,
    productDistribution: {
      oneProduct: 1400,
      twoProducts: 980,
      threeOrMore: 420,
    },
    color: ColorTheme.SECONDARY,
  },
  {
    duration: DurationCategory.THREE_TO_FIVE_YEARS,
    customers: 2400,
    percentage: 30.0,
    avgPremium: 95000,
    avgProducts: 2.1,
    productDistribution: {
      oneProduct: 720,
      twoProducts: 1200,
      threeOrMore: 480,
    },
    color: ColorTheme.TERTIARY,
  },
  {
    duration: DurationCategory.FIVE_TO_TEN_YEARS,
    customers: 1200,
    percentage: 15.0,
    avgPremium: 125000,
    avgProducts: 2.8,
    productDistribution: {
      oneProduct: 240,
      twoProducts: 480,
      threeOrMore: 480,
    },
    color: ColorTheme.QUATERNARY,
  },
  {
    duration: DurationCategory.MORE_THAN_TEN_YEARS,
    customers: 350,
    percentage: 4.4,
    avgPremium: 180000,
    avgProducts: 3.5,
    productDistribution: {
      oneProduct: 35,
      twoProducts: 105,
      threeOrMore: 210,
    },
    color: ColorTheme.QUINTERNARY,
  },
];

// Summary metrics
const summaryMetrics: RelationSummaryMetrics = {
  totalCustomers: 8000,
  retentionRate: 68.4,
  avgPremium: 82500,
  crossSellSuccess: 45.2,
  avgRelationshipDuration: 3.2,
  avgProductsPerCustomer: 1.9,
};

// Insights data
const insights: InsightCategory[] = [
  {
    title: '🏆 Loyalty Patterns',
    emoji: '🏆',
    color: 'blue',
    insights: [
      '• 10+ year customers: 3.5 avg products',
      '• 60% of 10+ year customers have 3+ products',
      '• Premium increases 4x with tenure',
    ],
  },
  {
    title: '📈 Growth Opportunities',
    emoji: '📈',
    color: 'green',
    insights: [
      '• 1-3 year segment: 35% of customers',
      '• Only 1.6 avg products in this segment',
      '• High cross-sell potential: 2,380 customers',
    ],
  },
  {
    title: '🎯 Retention Strategy',
    emoji: '🎯',
    color: 'purple',
    insights: [
      '• New customers (<1 year): Focus on satisfaction',
      '• 1-3 years: Cross-sell opportunity window',
      '• 3+ years: Premium service & loyalty rewards',
    ],
  },
];

// Initial state
const initialState: RelationState = {
  durationData,
  summaryMetrics,
  insights,
  loading: false,
  error: null,
};

// Create slice
const relationSlice = createSlice({
  name: 'relation',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateDurationData: (state, action: PayloadAction<DurationData[]>) => {
      state.durationData = action.payload;
    },
    updateSummaryMetrics: (
      state,
      action: PayloadAction<RelationSummaryMetrics>
    ) => {
      state.summaryMetrics = action.payload;
    },
    updateInsights: (state, action: PayloadAction<InsightCategory[]>) => {
      state.insights = action.payload;
    },
    resetRelationState: () => {
      return initialState;
    },
  },
});

// Export actions
export const {
  setLoading,
  setError,
  updateDurationData,
  updateSummaryMetrics,
  updateInsights,
  resetRelationState,
} = relationSlice.actions;

// Export selectors
export const selectDurationData = (state: any): DurationData[] =>
  state.relation?.durationData || durationData;

export const selectSummaryMetrics = (state: any): RelationSummaryMetrics =>
  state.relation?.summaryMetrics || summaryMetrics;

export const selectInsights = (state: any): InsightCategory[] =>
  state.relation?.insights || insights;

export const selectRelationLoading = (state: any): boolean =>
  state.relation?.loading || false;

export const selectRelationError = (state: any): string | null =>
  state.relation?.error || null;

// Export reducer
export default relationSlice.reducer;
