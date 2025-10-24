// Number of Products Analytics Data
export interface NumberOfProductsAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const numberOfProductsAnalyticsData: NumberOfProductsAnalyticsData[] = [
  {
    name: 'Single Product',
    policies: 32450,
    premiumRevenue: 145600000, // ₹14.56 crores
    revenuePercentage: 42.8,
    color: '#3B82F6',
  },
  {
    name: '2-3 Products',
    policies: 18920,
    premiumRevenue: 98400000, // ₹9.84 crores
    revenuePercentage: 28.9,
    color: '#10B981',
  },
  {
    name: '4-5 Products',
    policies: 12680,
    premiumRevenue: 68200000, // ₹6.82 crores
    revenuePercentage: 20.1,
    color: '#F59E0B',
  },
  {
    name: '6-8 Products',
    policies: 6850,
    premiumRevenue: 38900000, // ₹3.89 crores
    revenuePercentage: 11.4,
    color: '#EF4444',
  },
  {
    name: '9-12 Products',
    policies: 3420,
    premiumRevenue: 24600000, // ₹2.46 crores
    revenuePercentage: 7.2,
    color: '#8B5CF6',
  },
  {
    name: '13-15 Products',
    policies: 1850,
    premiumRevenue: 15800000, // ₹1.58 crores
    revenuePercentage: 4.6,
    color: '#06B6D4',
  },
  {
    name: '16-20 Products',
    policies: 980,
    premiumRevenue: 9500000, // ₹0.95 crores
    revenuePercentage: 2.8,
    color: '#84CC16',
  },
  {
    name: '20+ Products',
    policies: 650,
    premiumRevenue: 6200000, // ₹0.62 crores
    revenuePercentage: 1.8,
    color: '#EC4899',
  },
];
