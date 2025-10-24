// Insurer Analytics Data
export interface InsurerAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const insurerAnalyticsData: InsurerAnalyticsData[] = [
  {
    name: 'Life Insurance Corporation',
    policies: 125000,
    premiumRevenue: 485000000, // ₹48.5 crores
    revenuePercentage: 32.5,
    color: '#3B82F6',
  },
  {
    name: 'HDFC Life Insurance',
    policies: 85000,
    premiumRevenue: 425000000, // ₹42.5 crores
    revenuePercentage: 18.5,
    color: '#10B981',
  },
  {
    name: 'ICICI Prudential',
    policies: 72000,
    premiumRevenue: 380000000, // ₹38.0 crores
    revenuePercentage: 16.2,
    color: '#F59E0B',
  },
  {
    name: 'SBI Life Insurance',
    policies: 68000,
    premiumRevenue: 320000000, // ₹32.0 crores
    revenuePercentage: 14.8,
    color: '#EF4444',
  },
  {
    name: 'Max Life Insurance',
    policies: 45000,
    premiumRevenue: 245000000, // ₹24.5 crores
    revenuePercentage: 8.5,
    color: '#8B5CF6',
  },
  {
    name: 'Bajaj Allianz Life',
    policies: 38000,
    premiumRevenue: 195000000, // ₹19.5 crores
    revenuePercentage: 6.8,
    color: '#06B6D4',
  },
  {
    name: 'Tata AIA Life',
    policies: 32000,
    premiumRevenue: 168000000, // ₹16.8 crores
    revenuePercentage: 5.2,
    color: '#84CC16',
  },
  {
    name: 'Aditya Birla Sun Life',
    policies: 28000,
    premiumRevenue: 142000000, // ₹14.2 crores
    revenuePercentage: 4.1,
    color: '#EC4899',
  },
  {
    name: 'Kotak Mahindra Life',
    policies: 22000,
    premiumRevenue: 115000000, // ₹11.5 crores
    revenuePercentage: 3.2,
    color: '#14B8A6',
  },
  {
    name: 'Reliance Nippon Life',
    policies: 18000,
    premiumRevenue: 89000000, // ₹8.9 crores
    revenuePercentage: 2.5,
    color: '#F97316',
  },
];
