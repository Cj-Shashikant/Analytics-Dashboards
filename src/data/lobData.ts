// Line of Business Analytics Data
export interface LobAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const lobAnalyticsData: LobAnalyticsData[] = [
  {
    name: 'Health Insurance',
    policies: 45620,
    premiumRevenue: 185000000, // ₹18.5 crores
    revenuePercentage: 28.5,
    color: '#3B82F6',
  },
  {
    name: 'Motor Insurance',
    policies: 52340,
    premiumRevenue: 156000000, // ₹15.6 crores
    revenuePercentage: 24.1,
    color: '#10B981',
  },
  {
    name: 'Life Insurance',
    policies: 35780,
    premiumRevenue: 142000000, // ₹14.2 crores
    revenuePercentage: 21.9,
    color: '#F59E0B',
  },
  {
    name: 'Property Insurance',
    policies: 18920,
    premiumRevenue: 89000000, // ₹8.9 crores
    revenuePercentage: 13.7,
    color: '#EF4444',
  },
  {
    name: 'Travel Insurance',
    policies: 15680,
    premiumRevenue: 42000000, // ₹4.2 crores
    revenuePercentage: 6.5,
    color: '#8B5CF6',
  },
  {
    name: 'Marine Insurance',
    policies: 8450,
    premiumRevenue: 28000000, // ₹2.8 crores
    revenuePercentage: 4.3,
    color: '#06B6D4',
  },
  {
    name: 'Liability Insurance',
    policies: 6250,
    premiumRevenue: 18500000, // ₹1.85 crores
    revenuePercentage: 2.9,
    color: '#84CC16',
  },
  {
    name: 'Cyber Insurance',
    policies: 3850,
    premiumRevenue: 12800000, // ₹1.28 crores
    revenuePercentage: 2.0,
    color: '#EC4899',
  },
];
