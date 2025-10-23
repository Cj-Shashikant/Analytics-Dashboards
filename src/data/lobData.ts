// LOB (Line of Business) Analytics Data
export interface LOBAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const lobAnalyticsData: LOBAnalyticsData[] = [
  {
    name: 'General Insurance',
    policies: 22850,
    premiumRevenue: 144000000, // ₹14.4 crores
    revenuePercentage: 60.0,
    color: '#4C9AFF',
  },
  {
    name: 'Life Insurance',
    policies: 12420,
    premiumRevenue: 72000000, // ₹7.2 crores
    revenuePercentage: 30.0,
    color: '#00C7B7',
  },
  {
    name: 'Health Insurance',
    policies: 6850,
    premiumRevenue: 24000000, // ₹2.4 crores
    revenuePercentage: 10.0,
    color: '#FF715B',
  },
];
