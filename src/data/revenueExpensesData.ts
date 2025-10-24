// Revenue & Expenses Analytics Data
export interface RevenueExpensesAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

// Revenue Data Table
export const revenueAnalyticsData: RevenueExpensesAnalyticsData[] = [
  {
    name: 'Motor Insurance',
    policies: 33300,
    premiumRevenue: 125000000, // ₹12.5 crores
    revenuePercentage: 28.5,
    color: '#3B82F6',
  },
  {
    name: 'Health Insurance',
    policies: 27360,
    premiumRevenue: 98000000, // ₹9.8 crores
    revenuePercentage: 22.3,
    color: '#10B981',
  },
  {
    name: 'Life Insurance',
    policies: 23040,
    premiumRevenue: 85000000, // ₹8.5 crores
    revenuePercentage: 19.4,
    color: '#F59E0B',
  },
  {
    name: 'Property Insurance',
    policies: 16740,
    premiumRevenue: 62000000, // ₹6.2 crores
    revenuePercentage: 14.1,
    color: '#EF4444',
  },
  {
    name: 'Travel Insurance',
    policies: 12780,
    premiumRevenue: 38000000, // ₹3.8 crores
    revenuePercentage: 8.7,
    color: '#8B5CF6',
  },
  {
    name: 'Marine Insurance',
    policies: 8950,
    premiumRevenue: 18500000, // ₹1.85 crores
    revenuePercentage: 4.2,
    color: '#06B6D4',
  },
  {
    name: 'Cyber Insurance',
    policies: 7200,
    premiumRevenue: 12000000, // ₹1.2 crores
    revenuePercentage: 2.8,
    color: '#84CC16',
  },
];

// Expenses Data Table
export const expensesAnalyticsData: RevenueExpensesAnalyticsData[] = [
  {
    name: 'Operational Costs',
    policies: 1234, // Not applicable for expenses
    premiumRevenue: 78000000, // ₹7.8 crores
    revenuePercentage: 18.0,
    color: '#EF4444',
  },
  {
    name: 'Claims Processing',
    policies: 3998,
    premiumRevenue: 65000000, // ₹6.5 crores
    revenuePercentage: 15.0,
    color: '#F97316',
  },
  {
    name: 'Employee Salaries',
    policies: 7656,
    premiumRevenue: 52000000, // ₹5.2 crores
    revenuePercentage: 12.0,
    color: '#3B82F6',
  },
  {
    name: 'Marketing & Sales',
    policies: 3266,
    premiumRevenue: 34700000, // ₹3.47 crores
    revenuePercentage: 8.0,
    color: '#EAB308',
  },
  {
    name: 'Technology',
    policies: 1910,
    premiumRevenue: 30300000, // ₹3.03 crores
    revenuePercentage: 7.0,
    color: '#8B5CF6',
  },
  {
    name: 'Office Rent',
    policies: 3010,
    premiumRevenue: 26000000, // ₹2.6 crores
    revenuePercentage: 6.0,
    color: '#10B981',
  },
  {
    name: 'Compliance',
    policies: 8817,
    premiumRevenue: 21700000, // ₹2.17 crores
    revenuePercentage: 5.0,
    color: '#06B6D4',
  },
  {
    name: 'Insurance Premiums',
    policies: 9192,
    premiumRevenue: 17300000, // ₹1.73 crores
    revenuePercentage: 4.0,
    color: '#84CC16',
  },
  {
    name: 'Utilities',
    policies: 7343,
    premiumRevenue: 13000000, // ₹1.3 crores
    revenuePercentage: 3.0,
    color: '#F59E0B',
  },
  {
    name: 'Training & Development',
    policies: 7001,
    premiumRevenue: 10800000, // ₹1.08 crores
    revenuePercentage: 2.5,
    color: '#EC4899',
  },
  {
    name: 'Legal Services',
    policies: 5236,
    premiumRevenue: 10800000, // ₹1.08 crores
    revenuePercentage: 2.5,
    color: '#6366F1',
  },
  {
    name: 'Accounting & Finance',
    policies: 8665,
    premiumRevenue: 8700000, // ₹0.87 crores
    revenuePercentage: 2.0,
    color: '#8B5CF6',
  },
  {
    name: 'Equipment Maintenance',
    policies: 1811,
    premiumRevenue: 8700000, // ₹0.87 crores
    revenuePercentage: 2.0,
    color: '#F97316',
  },
  {
    name: 'Business Travel',
    policies: 9722,
    premiumRevenue: 7800000, // ₹0.78 crores
    revenuePercentage: 1.8,
    color: '#06B6D4',
  },
  {
    name: 'Communication',
    policies: 756,
    premiumRevenue: 6500000, // ₹0.65 crores
    revenuePercentage: 1.5,
    color: '#10B981',
  },
  {
    name: 'Office Supplies',
    policies: 1234,
    premiumRevenue: 6500000, // ₹0.65 crores
    revenuePercentage: 1.5,
    color: '#84CC16',
  },
  {
    name: 'Research & Development',
    policies: 6671,
    premiumRevenue: 5200000, // ₹0.52 crores
    revenuePercentage: 1.2,
    color: '#EF4444',
  },
  {
    name: 'Security Services',
    policies: 5629,
    premiumRevenue: 5200000, // ₹0.52 crores
    revenuePercentage: 1.2,
    color: '#F59E0B',
  },
  {
    name: 'External Consulting',
    policies: 8335,
    premiumRevenue: 4300000, // ₹0.43 crores
    revenuePercentage: 1.0,
    color: '#EC4899',
  },
  {
    name: 'Software Licenses',
    policies: 4573,
    premiumRevenue: 4300000, // ₹0.43 crores
    revenuePercentage: 1.0,
    color: '#6366F1',
  },
];

// Legacy export for backward compatibility
export const revenueExpensesAnalyticsData: RevenueExpensesAnalyticsData[] = [
  ...revenueAnalyticsData,
  ...expensesAnalyticsData,
];
