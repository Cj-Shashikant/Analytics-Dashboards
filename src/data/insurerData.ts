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
    name: 'HDFC ERGO',
    policies: 15250,
    premiumRevenue: 54000000, // ₹5.4 crores
    revenuePercentage: 22.5,
    color: '#4C9AFF',
  },
  {
    name: 'ICICI Lombard',
    policies: 13420,
    premiumRevenue: 46800000, // ₹4.68 crores
    revenuePercentage: 19.5,
    color: '#00C7B7',
  },
  {
    name: 'Bajaj Allianz',
    policies: 11850,
    premiumRevenue: 44400000, // ₹4.44 crores
    revenuePercentage: 18.5,
    color: '#FF715B',
  },
  {
    name: 'Tata AIG',
    policies: 9650,
    premiumRevenue: 30000000, // ₹3.0 crores
    revenuePercentage: 12.5,
    color: '#FFCE56',
  },
  {
    name: 'Reliance General',
    policies: 8200,
    premiumRevenue: 25200000, // ₹2.52 crores
    revenuePercentage: 10.5,
    color: '#8B5CF6',
  },
  {
    name: 'New India Assurance',
    policies: 6850,
    premiumRevenue: 19200000, // ₹1.92 crores
    revenuePercentage: 8.0,
    color: '#10B981',
  },
  {
    name: 'Oriental Insurance',
    policies: 5420,
    premiumRevenue: 14400000, // ₹1.44 crores
    revenuePercentage: 6.0,
    color: '#F59E0B',
  },
  {
    name: 'United India Insurance',
    policies: 3850,
    premiumRevenue: 7200000, // ₹0.72 crores
    revenuePercentage: 3.0,
    color: '#EF4444',
  },
];
