import { DepartmentType } from './departments';

// Report types by department
export const REPORT_TYPES_BY_DEPARTMENT = {
  Business: [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB',
    // 'Cross-Sell Penetration', // COMMENTED OUT - Cross-sell functionality disabled
  ],
  Operations: [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB',
    // 'Cross-Sell Penetration', // COMMENTED OUT - Cross-sell functionality disabled
  ],
  Finance: [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB',
    // 'Cross-Sell Penetration', // COMMENTED OUT - Cross-sell functionality disabled
  ],
  Marketing: [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB',
    // 'Cross-Sell Penetration', // COMMENTED OUT - Cross-sell functionality disabled
  ],
  Sales: [
    'Revenue vs Expenses',
    'Revenue by Products',
    'Revenue by Insurers',
    'Revenue by Policy Type',
    'Revenue by Vertical',
    'Revenue by LOB',
    // 'Cross-Sell Penetration', // COMMENTED OUT - Cross-sell functionality disabled
  ],
  Retention: ['Retention - By Insurer', 'Retention - Broker'],
  'Customer Analysis': [
    'Duration of Relationship',
    'Number of Products Purchased',
    'Premium Contribution by Customer',
    'Customer Satisfaction / NPS',
    // 'Cross-Sell / Upsell Potential', // COMMENTED OUT - Cross-sell functionality disabled
  ],
} as const;

export type ReportType =
  (typeof REPORT_TYPES_BY_DEPARTMENT)[keyof typeof REPORT_TYPES_BY_DEPARTMENT][number];

export const getReportTypesForDepartment = (
  department: DepartmentType
): readonly string[] => {
  return (
    REPORT_TYPES_BY_DEPARTMENT[department] ||
    REPORT_TYPES_BY_DEPARTMENT['Business']
  );
};

export const DEFAULT_REPORT_TYPE: ReportType = 'Revenue vs Expenses';
