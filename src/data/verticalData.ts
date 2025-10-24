// Vertical Analytics Data
export interface VerticalAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const verticalAnalyticsData: VerticalAnalyticsData[] = [
  {
    name: 'Healthcare',
    policies: 28450,
    premiumRevenue: 145600000, // ₹14.56 crores
    revenuePercentage: 32.5,
    color: '#3B82F6',
  },
  {
    name: 'Manufacturing',
    policies: 18920,
    premiumRevenue: 98400000, // ₹9.84 crores
    revenuePercentage: 22.0,
    color: '#10B981',
  },
  {
    name: 'Technology',
    policies: 15680,
    premiumRevenue: 76200000, // ₹7.62 crores
    revenuePercentage: 17.0,
    color: '#F59E0B',
  },
  {
    name: 'Financial Services',
    policies: 12850,
    premiumRevenue: 58900000, // ₹5.89 crores
    revenuePercentage: 13.2,
    color: '#EF4444',
  },
  {
    name: 'Retail',
    policies: 9650,
    premiumRevenue: 42800000, // ₹4.28 crores
    revenuePercentage: 9.6,
    color: '#8B5CF6',
  },
  {
    name: 'Education',
    policies: 6850,
    premiumRevenue: 32500000, // ₹3.25 crores
    revenuePercentage: 7.3,
    color: '#06B6D4',
  },
  {
    name: 'Transportation',
    policies: 5420,
    premiumRevenue: 24600000, // ₹2.46 crores
    revenuePercentage: 5.5,
    color: '#84CC16',
  },
  {
    name: 'Hospitality',
    policies: 3850,
    premiumRevenue: 18900000, // ₹1.89 crores
    revenuePercentage: 4.2,
    color: '#EC4899',
  },
  {
    name: 'Agriculture',
    policies: 2980,
    premiumRevenue: 15200000, // ₹1.52 crores
    revenuePercentage: 3.4,
    color: '#14B8A6',
  },
  {
    name: 'Energy',
    policies: 2420,
    premiumRevenue: 12800000, // ₹1.28 crores
    revenuePercentage: 2.9,
    color: '#F97316',
  },
];
