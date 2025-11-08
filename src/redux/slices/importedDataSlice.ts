import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonDataItem, ReportType } from '../../utils/dynamicExcelParser';

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

  // Dynamic data support
  isDynamicImport: boolean;
  dynamicReportType: ReportType | null;
  dynamicData: CommonDataItem[];
  rawExcelData: any[]; // Store raw Excel rows for flexible regrouping
  totalPolicies: number;
  totalPremium: number;

  // Data arrays for different report types (legacy support)
  productData: Array<{
    name: string;
    revenue: number;
    growth: number;
    percentage: number;
    color: string;
  }>;

  insurerData: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    color: string;
  }>;

  locationPerformance: Array<{
    location: string;
    revenue: number;
    growth: number;
    target: number;
  }>;

  monthlyTrends: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;

  // Additional data arrays for new report types
  policyTypeData: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;

  lobData: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;

  verticalData: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;

  retentionByInsurerData: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    color: string;
  }>;

  retentionByBrokerData: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    color: string;
  }>;

  numberOfProductData: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;
}

const initialState: ImportedDataState = {
  isDataImported: false,
  importedAt: null,
  fileName: null,

  // Main metrics
  totalRevenue: 0,
  expenses: 0,
  grossProfit: 0,
  netProfit: 0,
  revenueGrowth: 0,
  expenseGrowth: 0,
  profitMargin: 0,

  // Dynamic data support
  isDynamicImport: false,
  dynamicReportType: null,
  dynamicData: [],
  rawExcelData: [],
  totalPolicies: 0,
  totalPremium: 0,

  // Legacy data arrays
  productData: [],
  insurerData: [],
  locationPerformance: [],
  monthlyTrends: [],
  policyTypeData: [],
  lobData: [],
  verticalData: [],
  retentionByInsurerData: [],
  retentionByBrokerData: [],
  numberOfProductData: [],
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

    setDynamicImportedData: (
      state,
      action: PayloadAction<{
        fileName: string;
        data: CommonDataItem[];
        rawData?: any[]; // Optional raw Excel data for regrouping
        totalRevenue: number;
        totalPolicies: number;
        totalPremium: number;
        reportType: ReportType;
      }>
    ) => {
      const {
        fileName,
        data,
        rawData,
        totalRevenue,
        totalPolicies,
        totalPremium,
        reportType,
      } = action.payload;

      // Set common import flags
      state.isDataImported = true;
      state.isDynamicImport = true;
      state.importedAt = new Date().toISOString();
      state.fileName = fileName;

      // Set dynamic data
      state.dynamicData = data;
      state.rawExcelData = rawData || [];
      state.dynamicReportType = reportType;
      state.totalRevenue = totalRevenue;
      state.totalPolicies = totalPolicies;
      state.totalPremium = totalPremium;

      // Calculate derived metrics
      state.grossProfit = totalRevenue * 0.3; // Assuming 30% gross profit margin
      state.expenses = totalRevenue * 0.7; // Assuming 70% expenses
      state.netProfit = state.grossProfit * 0.8; // Assuming 80% of gross profit as net profit
      state.profitMargin = (state.netProfit / totalRevenue) * 100;
      state.revenueGrowth = 12.5; // Default growth rate
      state.expenseGrowth = 8.2; // Default expense growth

      // Clear legacy data arrays to avoid conflicts
      state.productData = [];
      state.insurerData = [];
      state.locationPerformance = [];
      state.monthlyTrends = [];
      state.policyTypeData = [];
      state.lobData = [];
      state.verticalData = [];
      state.retentionByInsurerData = [];
      state.retentionByBrokerData = [];
      state.numberOfProductData = [];
    },

    clearImportedData: state => {
      state.isDataImported = false;
      state.isDynamicImport = false;
      state.importedAt = null;
      state.fileName = null;
      state.dynamicReportType = null;
      state.dynamicData = [];
      state.rawExcelData = [];
      state.totalRevenue = 0;
      state.totalPolicies = 0;
      state.totalPremium = 0;
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
      state.policyTypeData = [];
      state.lobData = [];
      state.verticalData = [];
      state.retentionByInsurerData = [];
      state.retentionByBrokerData = [];
      state.numberOfProductData = [];
    },
  },
});

export const { setImportedData, setDynamicImportedData, clearImportedData } =
  importedDataSlice.actions;

// Selectors for accessing imported data
export const selectIsDataImported = (state: {
  importedData: ImportedDataState;
}) => state.importedData.isDataImported;

export const selectImportedFileName = (state: {
  importedData: ImportedDataState;
}) => state.importedData.fileName;

export const selectImportedAt = (state: { importedData: ImportedDataState }) =>
  state.importedData.importedAt;

// Base metrics selectors
export const selectImportedBaseMetrics = (state: {
  importedData: ImportedDataState;
}) => ({
  totalRevenue: state.importedData.totalRevenue,
  expenses: state.importedData.expenses,
  grossProfit: state.importedData.grossProfit,
  netProfit: state.importedData.netProfit,
  revenueGrowth: state.importedData.revenueGrowth,
  expenseGrowth: state.importedData.expenseGrowth,
  profitMargin: state.importedData.profitMargin,
});

// Data selectors
export const selectImportedProductData = (state: {
  importedData: ImportedDataState;
}) => state.importedData.productData;

export const selectImportedInsurerData = (state: {
  importedData: ImportedDataState;
}) => state.importedData.insurerData;

export const selectImportedLocationPerformance = (state: {
  importedData: ImportedDataState;
}) => state.importedData.locationPerformance;

export const selectImportedMonthlyTrends = (state: {
  importedData: ImportedDataState;
}) => state.importedData.monthlyTrends;

// Dynamic data selectors
export const selectIsDynamicImport = (state: {
  importedData: ImportedDataState;
}) => state.importedData.isDynamicImport;

export const selectDynamicReportType = (state: {
  importedData: ImportedDataState;
}) => state.importedData.dynamicReportType;

export const selectDynamicData = (state: { importedData: ImportedDataState }) =>
  state.importedData.dynamicData;

export const selectTotalPolicies = (state: {
  importedData: ImportedDataState;
}) => state.importedData.totalPolicies;

export const selectTotalPremium = (state: {
  importedData: ImportedDataState;
}) => state.importedData.totalPremium;

// Enhanced selector that returns data based on report type for dynamic imports
export const selectDataForReportType =
  (reportType: ReportType) => (state: { importedData: ImportedDataState }) => {
    const { isDynamicImport, dynamicData, dynamicReportType, rawExcelData } =
      state.importedData;

    // For dynamic imports with raw data, regroup based on requested report type
    if (isDynamicImport && rawExcelData && rawExcelData.length > 0) {
      return regroupRawDataForReportType(rawExcelData, reportType);
    }

    // For dynamic imports without raw data, return existing grouped data
    if (isDynamicImport && dynamicData && dynamicData.length > 0) {
      // If the current request matches the imported report type, return as-is
      if (dynamicReportType === reportType) {
        return dynamicData;
      }

      // Otherwise, return the same data (this is a fallback)
      return dynamicData;
    }

    // Fallback to legacy data arrays
    switch (reportType) {
      case 'Revenue by Products':
        return state.importedData.productData;
      case 'Revenue by Insurers':
        return state.importedData.insurerData;
      case 'Revenue by LOB':
        return state.importedData.lobData;
      case 'Revenue by Policy Type':
        return state.importedData.policyTypeData;
      case 'Revenue by Vertical':
        return state.importedData.verticalData || [];
      default:
        return [];
    }
  };

// Helper function to regroup raw Excel data for any report type
function regroupRawDataForReportType(
  rawData: any[],
  reportType: ReportType
): CommonDataItem[] {
  // Flexible column options for grouping and values
  const normalize = (s: string) => s?.toString().trim().toLowerCase();
  const findValue = (row: any, keys: string[]) => {
    const entries = Object.keys(row);
    for (const k of entries) {
      const nk = normalize(k);
      if (keys.some(target => normalize(target) === nk)) {
        return row[k];
      }
    }
    // Fallback: partial includes
    for (const k of entries) {
      const nk = normalize(k);
      if (keys.some(target => nk.includes(normalize(target)))) {
        return row[k];
      }
    }
    return undefined;
  };

  const groupKeyOptions: Record<ReportType, string[]> = {
    'Revenue by Products': [
      'Product Name',
      'Product name',
      'product',
      'Product',
    ],
    'Revenue by Insurers': [
      'Insurer Name',
      'Insurer name',
      'insurer',
      'Insurer',
    ],
    'Revenue by LOB': ['LOB Name', 'LOB name', 'lob', 'LOB'],
    'Revenue by Policy Type': [
      'Policy Type',
      'policy type',
      'PolicyType',
      'Policy',
    ],
    'Revenue by Vertical': [
      'Business Vertical',
      'Bussiness Vertical',
      'Vertical',
    ],
  };

  const policiesKeys = ['No. of Policies', 'No.of Policies'];
  const policyNoKeys = ['Policy No', 'Policy Number'];
  const netPremiumKeys = ['Net Premium', 'Premium'];
  const grossPremiumKeys = ['Gross Premium', 'Revenue'];
  const colorKeys = ['Color', 'color'];

  const groupKeys = groupKeyOptions[reportType];
  if (!groupKeys || groupKeys.length === 0) return [];

  // First, group rows by the selected key
  const grouped = new Map<
    string,
    {
      policies: number;
      premiumSum?: number;
      revenueSum?: number;
      color?: string;
    }
  >();

  rawData.forEach(row => {
    const nameValue = findValue(row, groupKeys);
    const name = nameValue ? String(nameValue).trim() : '';
    if (!name) return; // Skip empty or header-like rows

    // Count policies: prefer explicit count, else count by policy number presence
    const policiesCountVal = findValue(row, policiesKeys);
    let policiesCount = Number(policiesCountVal) || 0;
    const policyNoVal = findValue(row, policyNoKeys);
    if (!policiesCount && policyNoVal && String(policyNoVal).trim() !== '') {
      policiesCount = 1;
    }

    // Sum premiums
    const netPremVal = findValue(row, netPremiumKeys);
    const grossPremVal = findValue(row, grossPremiumKeys);
    const netPrem =
      netPremVal !== undefined && netPremVal !== ''
        ? Number(netPremVal)
        : undefined;
    const grossPrem =
      grossPremVal !== undefined && grossPremVal !== ''
        ? Number(grossPremVal)
        : undefined;
    const colorVal = findValue(row, colorKeys);

    const existing = grouped.get(name);
    if (existing) {
      existing.policies += policiesCount;
      if (netPrem !== undefined && !isNaN(netPrem)) {
        existing.premiumSum = (existing.premiumSum || 0) + netPrem;
      }
      if (grossPrem !== undefined && !isNaN(grossPrem)) {
        existing.revenueSum = (existing.revenueSum || 0) + grossPrem;
      }
      if (!existing.color && colorVal) {
        existing.color = String(colorVal);
      }
    } else {
      grouped.set(name, {
        policies: policiesCount,
        premiumSum:
          netPrem !== undefined && !isNaN(netPrem)
            ? Number(netPrem)
            : undefined,
        revenueSum:
          grossPrem !== undefined && !isNaN(grossPrem)
            ? Number(grossPrem)
            : undefined,
        color: colorVal ? String(colorVal) : undefined,
      });
    }
  });

  // Compute total revenue across groups for percentage calculation
  let totalRevenue = 0;
  grouped.forEach(g => {
    if (g.revenueSum !== undefined && !isNaN(g.revenueSum)) {
      totalRevenue += g.revenueSum;
    }
  });

  // Convert grouped map to CommonDataItem[]
  const processedData: CommonDataItem[] = Array.from(grouped.entries()).map(
    ([name, g], idx) => {
      const revenue = g.revenueSum !== undefined ? g.revenueSum : 0;
      const premium = g.premiumSum !== undefined ? g.premiumSum : 0;
      const hasRevenue = g.revenueSum !== undefined;
      const percentage =
        hasRevenue && totalRevenue > 0 ? (revenue / totalRevenue) * 100 : 0;
      return {
        name,
        policies: g.policies,
        premium,
        revenue,
        revenuePercentage: Number(percentage.toFixed(2)),
        color: g.color || `hsl(${(idx * 137.5) % 360}, 70%, 50%)`,
        value: revenue,
        percentage: Number(percentage.toFixed(2)),
      };
    }
  );

  // Sort by revenue desc
  processedData.sort((a, b) => b.revenue - a.revenue);
  return processedData;
}

// Convenience selector for all imported data
export const selectAllImportedData = (state: {
  importedData: ImportedDataState;
}) => state.importedData;

export default importedDataSlice.reducer;
