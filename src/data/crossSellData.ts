// Cross-sell Analytics Data
export interface CrossSellAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const crossSellAnalyticsData: CrossSellAnalyticsData[] = [
  {
    name: 'Health + Motor Bundle',
    policies: 8420,
    premiumRevenue: 45600000, // ₹4.56 crores
    revenuePercentage: 19.0,
    color: '#3B82F6',
  },
  {
    name: 'Life + Health Bundle',
    policies: 6850,
    premiumRevenue: 38200000, // ₹3.82 crores
    revenuePercentage: 15.9,
    color: '#10B981',
  },
  {
    name: 'Motor + Travel Bundle',
    policies: 5420,
    premiumRevenue: 28900000, // ₹2.89 crores
    revenuePercentage: 12.0,
    color: '#F59E0B',
  },
  {
    name: 'Property + Cyber Bundle',
    policies: 3250,
    premiumRevenue: 22400000, // ₹2.24 crores
    revenuePercentage: 9.3,
    color: '#8B5CF6',
  },
  {
    name: 'Business + Professional Bundle',
    policies: 2980,
    premiumRevenue: 19800000, // ₹1.98 crores
    revenuePercentage: 8.2,
    color: '#EF4444',
  },
  {
    name: 'Marine + Cargo Bundle',
    policies: 1850,
    premiumRevenue: 15200000, // ₹1.52 crores
    revenuePercentage: 6.3,
    color: '#06B6D4',
  },
  {
    name: 'Pet + Travel Bundle',
    policies: 1420,
    premiumRevenue: 8900000, // ₹0.89 crores
    revenuePercentage: 3.7,
    color: '#84CC16',
  },
  {
    name: 'Home + Auto Bundle',
    policies: 4680,
    premiumRevenue: 32500000, // ₹3.25 crores
    revenuePercentage: 13.5,
    color: '#EC4899',
  },
  {
    name: 'Life + Investment Bundle',
    policies: 3120,
    premiumRevenue: 18600000, // ₹1.86 crores
    revenuePercentage: 7.7,
    color: '#14B8A6',
  },
  {
    name: 'Health + Dental Bundle',
    policies: 2650,
    premiumRevenue: 12800000, // ₹1.28 crores
    revenuePercentage: 5.3,
    color: '#F97316',
  },
];
