// Broker Retention Analytics Data
export interface BrokerRetentionAnalyticsData {
  id: string;
  name: string;
  value: number;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}

export const brokerRetentionAnalyticsData: BrokerRetentionAnalyticsData[] = [
  {
    id: 'pricing-issues',
    name: 'Pricing Issues',
    value: 2850000,
    premiumRevenue: 2850000,
    policies: 1250,
    color: '#3B82F6',
    revenuePercentage: 23.0,
  },
  {
    id: 'price-competitiveness',
    name: 'Price Competitiveness',
    value: 2850000,
    premiumRevenue: 2850000,
    policies: 1250,
    color: '#6B7280',
    revenuePercentage: 35.2,
  },
  {
    id: 'poor-service',
    name: 'Poor Service',
    value: 2356000,
    premiumRevenue: 2356000,
    policies: 980,
    color: '#10B981',
    revenuePercentage: 19.0,
  },
  {
    id: 'better-offers',
    name: 'Better Offers Elsewhere',
    value: 1982000,
    premiumRevenue: 1982000,
    policies: 820,
    color: '#F59E0B',
    revenuePercentage: 16.0,
  },
  {
    id: 'claims-experience',
    name: 'Claims Experience',
    value: 1368000,
    premiumRevenue: 1368000,
    policies: 650,
    color: '#EF4444',
    revenuePercentage: 11.0,
  },
  {
    id: 'policy-cancelled',
    name: 'Policy Cancelled',
    value: 1116000,
    premiumRevenue: 1116000,
    policies: 520,
    color: '#8B5CF6',
    revenuePercentage: 9.0,
  },
  {
    id: 'coverage-gaps',
    name: 'Coverage Gaps',
    value: 868000,
    premiumRevenue: 868000,
    policies: 410,
    color: '#06B6D4',
    revenuePercentage: 7.0,
  },
  {
    id: 'communication-issues',
    name: 'Communication Issues',
    value: 620000,
    premiumRevenue: 620000,
    policies: 290,
    color: '#84CC16',
    revenuePercentage: 5.0,
  },
  {
    id: 'regulatory-changes',
    name: 'Regulatory Changes',
    value: 620000,
    premiumRevenue: 620000,
    policies: 290,
    color: '#F97316',
    revenuePercentage: 5.0,
  },
  {
    id: 'business-closure',
    name: 'Business Closure',
    value: 372000,
    premiumRevenue: 372000,
    policies: 175,
    color: '#EC4899',
    revenuePercentage: 3.0,
  },
  {
    id: 'other-reasons',
    name: 'Other Reasons',
    value: 248000,
    premiumRevenue: 248000,
    policies: 115,
    color: '#6B7280',
    revenuePercentage: 2.0,
  },
];
