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
    name: 'Corporate',
    policies: 8520,
    premiumRevenue: 108000000, // ₹10.8 crores
    revenuePercentage: 45.0,
    color: '#4C9AFF',
  },
  {
    name: 'Retail',
    policies: 18650,
    premiumRevenue: 84000000, // ₹8.4 crores
    revenuePercentage: 35.0,
    color: '#00C7B7',
  },
  {
    name: 'Affinity',
    policies: 12420,
    premiumRevenue: 48000000, // ₹4.8 crores
    revenuePercentage: 20.0,
    color: '#FF715B',
  },
];
