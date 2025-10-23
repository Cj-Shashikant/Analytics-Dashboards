// Revenue vs Expenses Analytics Data
export interface RevenueExpensesAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const revenueExpensesAnalyticsData: RevenueExpensesAnalyticsData[] = [
  {
    name: 'Motor Insurance',
    policies: 14250,
    premiumRevenue: 95000000, // ₹9.5 crores
    revenuePercentage: 39.6,
    color: '#4C9AFF',
  },
  {
    name: 'Health Insurance',
    policies: 11850,
    premiumRevenue: 72000000, // ₹7.2 crores
    revenuePercentage: 30.0,
    color: '#00C7B7',
  },
  {
    name: 'Life Insurance',
    policies: 8420,
    premiumRevenue: 48000000, // ₹4.8 crores
    revenuePercentage: 20.0,
    color: '#FF715B',
  },
  {
    name: 'Property Insurance',
    policies: 4650,
    premiumRevenue: 25000000, // ₹2.5 crores
    revenuePercentage: 10.4,
    color: '#FFCE56',
  },
];
