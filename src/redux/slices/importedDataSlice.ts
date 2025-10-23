import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ImportedDataState {
  isDataImported: boolean;
  importedAt: string | null;
  fileName: string | null;

  // Main metrics
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
}

const initialState: ImportedDataState = {
  isDataImported: false,
  importedAt: null,
  fileName: null,

  // Default values (will be overridden when data is imported)
  totalRevenue: 0,
  expenses: 0,
  grossProfit: 0,
  netProfit: 0,
  revenueGrowth: 0,
  expenseGrowth: 0,
  profitMargin: 0,
  productData: [],
  insurerData: [],
  locationPerformance: [],
  monthlyTrends: [],
};

const importedDataSlice = createSlice({
  name: 'importedData',
  initialState,
  reducers: {
    setImportedData: (
      state,
      action: PayloadAction<{
        fileName: string;
        data: Omit<
          ImportedDataState,
          'isDataImported' | 'importedAt' | 'fileName'
        >;
      }>
    ) => {
      const { fileName, data } = action.payload;

      state.isDataImported = true;
      state.importedAt = new Date().toISOString();
      state.fileName = fileName;

      // Update all data fields
      state.totalRevenue = data.totalRevenue;
      state.expenses = data.expenses;
      state.grossProfit = data.grossProfit;
      state.netProfit = data.netProfit;
      state.revenueGrowth = data.revenueGrowth;
      state.expenseGrowth = data.expenseGrowth;
      state.profitMargin = data.profitMargin;
      state.productData = data.productData;
      state.insurerData = data.insurerData;
      state.locationPerformance = data.locationPerformance;
      state.monthlyTrends = data.monthlyTrends;
    },

    clearImportedData: state => {
      state.isDataImported = false;
      state.importedAt = null;
      state.fileName = null;
      state.totalRevenue = 0;
      state.expenses = 0;
      state.grossProfit = 0;
      state.netProfit = 0;
      state.revenueGrowth = 0;
      state.expenseGrowth = 0;
      state.profitMargin = 0;
      state.productData = [];
      state.insurerData = [];
      state.locationPerformance = [];
      state.monthlyTrends = [];
    },
  },
});

export const { setImportedData, clearImportedData } = importedDataSlice.actions;
export default importedDataSlice.reducer;
