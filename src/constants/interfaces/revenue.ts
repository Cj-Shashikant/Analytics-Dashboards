// Revenue Data Interfaces

export interface RevenueDataItem {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  description?: string;
  clientTypes?: {
    Corporate: number;
    Retail: number;
    Affinity: number;
  };
  rank?: number;
}

export interface ExpenseDataItem {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  description?: string;
}

export interface CrossSellDataItem {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface TableDataItem {
  id: string;
  name: string;
  policies: number;
  amount: number;
  revenue: number;
}

export interface BaseMetricsData {
  totalRevenue: number;
  expenses: number;
  grossProfit: number;
}

export interface RevenueState {
  revenueByInsurers: RevenueDataItem[];
  revenueByPolicyType: RevenueDataItem[];
  revenueByVertical: RevenueDataItem[];
  revenueByLOB: RevenueDataItem[];
  revenueByProducts: RevenueDataItem[];
  crossSellPenetration: CrossSellDataItem[];
  expenseData: ExpenseDataItem[];
  tableData: TableDataItem[];
  baseMetrics: BaseMetricsData;
  loading: boolean;
  error: string | null;
  selectedReportType: string;
  totalRevenue: number;
}

// Component Props Interfaces
export interface ProductsListProps {
  data: RevenueDataItem[] | null;
  valueUnit: string;
  onItemClick: (item: RevenueDataItem) => void;
  selectedReportType: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
    payload: ChartDataPoint;
  }>;
  label?: string;
}

// Color Palette Interface
export interface ColorPalette {
  revenueColors: string[];
  expenseColors: string[];
  extendedColors: string[];
}

// Filter and Selection Interfaces
export interface FilterOptions {
  dateRange?: {
    start: Date;
    end: Date;
  };
  reportType?: string;
  category?: string;
  insurer?: string;
}

export interface SelectionState {
  selectedItem: RevenueDataItem | null;
  selectedIndex: number;
  hoveredItem: RevenueDataItem | null;
}

// API Response Interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export type RevenueApiResponse = ApiResponse<RevenueState>;

// Chart Configuration Interfaces
export interface ChartConfig {
  width?: number;
  height?: number;
  margin?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  animationDuration?: number;
}

export interface PieChartConfig extends ChartConfig {
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
  startAngle?: number;
  endAngle?: number;
}

export interface BarChartConfig extends ChartConfig {
  barSize?: number;
  layout?: 'horizontal' | 'vertical';
}

// Data Processing Interfaces
export interface DataProcessor {
  processRevenueData: (rawData: any[]) => RevenueDataItem[];
  processExpenseData: (rawData: any[]) => ExpenseDataItem[];
  processCrossSellData: (rawData: any[]) => CrossSellDataItem[];
  calculateMetrics: (data: RevenueDataItem[]) => BaseMetricsData;
}
