// Policy Type Analytics Data
export interface PolicyTypeAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const policyTypeAnalyticsData: PolicyTypeAnalyticsData[] = [
  {
    name: 'Individual Policies',
    policies: 28450,
    premiumRevenue: 125600000, // ₹12.56 crores
    revenuePercentage: 52.3,
    color: '#3B82F6',
  },
  {
    name: 'Group Policies',
    policies: 8920,
    premiumRevenue: 68400000, // ₹6.84 crores
    revenuePercentage: 28.5,
    color: '#10B981',
  },
  {
    name: 'Corporate Policies',
    policies: 3250,
    premiumRevenue: 32800000, // ₹3.28 crores
    revenuePercentage: 13.7,
    color: '#F59E0B',
  },
  {
    name: 'Family Floater',
    policies: 6850,
    premiumRevenue: 24600000, // ₹2.46 crores
    revenuePercentage: 10.2,
    color: '#8B5CF6',
  },
  {
    name: 'Senior Citizen',
    policies: 4120,
    premiumRevenue: 18900000, // ₹1.89 crores
    revenuePercentage: 7.9,
    color: '#EF4444',
  },
  {
    name: 'Critical Illness',
    policies: 2980,
    premiumRevenue: 15200000, // ₹1.52 crores
    revenuePercentage: 6.3,
    color: '#06B6D4',
  },
  {
    name: 'Term Life',
    policies: 5420,
    premiumRevenue: 12800000, // ₹1.28 crores
    revenuePercentage: 5.3,
    color: '#84CC16',
  },
  {
    name: 'Unit Linked',
    policies: 1850,
    premiumRevenue: 9500000, // ₹0.95 crores
    revenuePercentage: 4.0,
    color: '#EC4899',
  },
  {
    name: 'Endowment',
    policies: 2650,
    premiumRevenue: 8200000, // ₹0.82 crores
    revenuePercentage: 3.4,
    color: '#14B8A6',
  },
  {
    name: 'Money Back',
    policies: 1420,
    premiumRevenue: 6400000, // ₹0.64 crores
    revenuePercentage: 2.7,
    color: '#F97316',
  },
];
