// Insurer Retention Analytics Data
export interface InsurerRetentionAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const insurerRetentionAnalyticsData: InsurerRetentionAnalyticsData[] = [
  {
    name: 'ICICI Lombard General Insurance',
    policies: 18420,
    premiumRevenue: 125600000, // ₹12.56 crores
    revenuePercentage: 28.5,
    color: '#3B82F6',
  },
  {
    name: 'HDFC ERGO General Insurance',
    policies: 15850,
    premiumRevenue: 98400000, // ₹9.84 crores
    revenuePercentage: 22.3,
    color: '#10B981',
  },
  {
    name: 'Bajaj Allianz General Insurance',
    policies: 12680,
    premiumRevenue: 76200000, // ₹7.62 crores
    revenuePercentage: 17.3,
    color: '#F59E0B',
  },
  {
    name: 'Tata AIG General Insurance',
    policies: 9250,
    premiumRevenue: 58900000, // ₹5.89 crores
    revenuePercentage: 13.4,
    color: '#EF4444',
  },
  {
    name: 'New India Assurance',
    policies: 8420,
    premiumRevenue: 45600000, // ₹4.56 crores
    revenuePercentage: 10.3,
    color: '#8B5CF6',
  },
  {
    name: 'Oriental Insurance Company',
    policies: 6850,
    premiumRevenue: 38200000, // ₹3.82 crores
    revenuePercentage: 8.7,
    color: '#06B6D4',
  },
  {
    name: 'United India Insurance',
    policies: 5420,
    premiumRevenue: 32800000, // ₹3.28 crores
    revenuePercentage: 7.4,
    color: '#84CC16',
  },
  {
    name: 'National Insurance Company',
    policies: 4680,
    premiumRevenue: 28500000, // ₹2.85 crores
    revenuePercentage: 6.5,
    color: '#EC4899',
  },
  {
    name: 'Reliance General Insurance',
    policies: 3920,
    premiumRevenue: 24200000, // ₹2.42 crores
    revenuePercentage: 5.5,
    color: '#14B8A6',
  },
  {
    name: 'Future Generali India Insurance',
    policies: 2850,
    premiumRevenue: 18900000, // ₹1.89 crores
    revenuePercentage: 4.3,
    color: '#F97316',
  },
];
