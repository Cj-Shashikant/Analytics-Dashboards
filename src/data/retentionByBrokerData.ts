// Broker Retention Analytics Data
export interface BrokerRetentionAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const brokerRetentionAnalyticsData: BrokerRetentionAnalyticsData[] = [
  {
    name: 'Marsh & McLennan',
    policies: 15420,
    premiumRevenue: 89500000, // ₹8.95 crores
    revenuePercentage: 24.8,
    color: '#3B82F6',
  },
  {
    name: 'Aon Corporation',
    policies: 12850,
    premiumRevenue: 76200000, // ₹7.62 crores
    revenuePercentage: 21.1,
    color: '#10B981',
  },
  {
    name: 'Willis Towers Watson',
    policies: 9680,
    premiumRevenue: 58400000, // ₹5.84 crores
    revenuePercentage: 16.2,
    color: '#F59E0B',
  },
  {
    name: 'Arthur J. Gallagher',
    policies: 8250,
    premiumRevenue: 45600000, // ₹4.56 crores
    revenuePercentage: 12.6,
    color: '#EF4444',
  },
  {
    name: 'Brown & Brown',
    policies: 6420,
    premiumRevenue: 38200000, // ₹3.82 crores
    revenuePercentage: 10.6,
    color: '#8B5CF6',
  },
  {
    name: 'Hub International',
    policies: 5850,
    premiumRevenue: 32800000, // ₹3.28 crores
    revenuePercentage: 9.1,
    color: '#06B6D4',
  },
  {
    name: 'Lockton Companies',
    policies: 4680,
    premiumRevenue: 28500000, // ₹2.85 crores
    revenuePercentage: 7.9,
    color: '#84CC16',
  },
  {
    name: 'USI Insurance Services',
    policies: 3920,
    premiumRevenue: 24200000, // ₹2.42 crores
    revenuePercentage: 6.7,
    color: '#EC4899',
  },
  {
    name: 'Alliant Insurance',
    policies: 3250,
    premiumRevenue: 19800000, // ₹1.98 crores
    revenuePercentage: 5.5,
    color: '#14B8A6',
  },
  {
    name: 'AssuredPartners',
    policies: 2850,
    premiumRevenue: 16400000, // ₹1.64 crores
    revenuePercentage: 4.5,
    color: '#F97316',
  },
];
