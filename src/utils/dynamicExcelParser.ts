// Dynamic Excel Parser Types
import { ReportType } from '../constants/enums/reportTypes';

export interface CommonDataItem {
  name: string;
  policies: number;
  premium: number;
  revenue: number;
  revenuePercentage: number;
  color?: string;
  // Aliases for compatibility
  value: number;
  percentage: number;
}

export { ReportType };
