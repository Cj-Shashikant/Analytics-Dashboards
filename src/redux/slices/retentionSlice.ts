import { createSlice } from '@reduxjs/toolkit';
import type {
  LossReasonData,
  BrokerRetentionData,
  InsurerRetentionRow,
  RetentionMetrics,
} from '@/constants/interfaces/retention';
import {
  brokerRetentionAnalyticsData,
  insurerRetentionAnalyticsData,
} from '../../data';

// Loss Reason Analysis dummy data (from analytics RetentionByBroker)
export const lossReasonData: LossReasonData[] = [
  {
    id: 'pricing-issues',
    name: 'Pricing Issues',
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: '#3B82F6',
    percentage: 23.0,
  },
  {
    id: 'price-competitiveness',
    name: 'Price Competitiveness',
    value: 2850000,
    premium: 2850000,
    policies: 1250,
    color: '#6B7280',
    percentage: 35.2,
  },
  {
    id: 'poor-service',
    name: 'Poor Service',
    value: 2356000,
    premium: 2356000,
    policies: 980,
    color: '#10B981',
    percentage: 19.0,
  },
  {
    id: 'better-offers',
    name: 'Better Offers Elsewhere',
    value: 1982000,
    premium: 1982000,
    policies: 820,
    color: '#F59E0B',
    percentage: 16.0,
  },
  {
    id: 'claims-experience',
    name: 'Claims Experience',
    value: 1368000,
    premium: 1368000,
    policies: 650,
    color: '#EF4444',
    percentage: 11.0,
  },
  {
    id: 'policy-cancelled',
    name: 'Policy Cancelled',
    value: 1116000,
    premium: 1116000,
    policies: 520,
    color: '#8B5CF6',
    percentage: 9.0,
  },
  {
    id: 'coverage-gaps',
    name: 'Coverage Gaps',
    value: 868000,
    premium: 868000,
    policies: 410,
    color: '#06B6D4',
    percentage: 7.0,
  },
  {
    id: 'communication-issues',
    name: 'Communication Issues',
    value: 620000,
    premium: 620000,
    policies: 290,
    color: '#84CC16',
    percentage: 5.0,
  },
  {
    id: 'regulatory-changes',
    name: 'Regulatory Changes',
    value: 620000,
    premium: 620000,
    policies: 290,
    color: '#F97316',
    percentage: 5.0,
  },
  {
    id: 'business-closure',
    name: 'Business Closure',
    value: 372000,
    premium: 372000,
    policies: 175,
    color: '#EC4899',
    percentage: 3.0,
  },
  {
    id: 'other-reasons',
    name: 'Other Reasons',
    value: 248000,
    premium: 248000,
    policies: 115,
    color: '#6B7280',
    percentage: 2.0,
  },
];

// Broker Retention data (using structured data from data files)
export const brokerRetentionData: BrokerRetentionData[] =
  brokerRetentionAnalyticsData.map((item, index) => {
    const retentionRate = Math.random() * 30 + 70; // Generate random retention rate (70-100%)
    const totalPolicies = item.policies;
    const renewedPolicies = Math.floor(totalPolicies * (retentionRate / 100));

    return {
      id: `broker-${index}`, // Generate ID since not available in data
      name: item.name, // Use name property
      retentionRate: retentionRate,
      totalPolicies: totalPolicies,
      renewedPolicies: renewedPolicies,
      lostPolicies: totalPolicies - renewedPolicies,
      totalPremium: item.premiumRevenue, // Use premiumRevenue as totalPremium
      color: item.color,
    };
  });

// Insurer Retention data (using structured data from data files)
export const insurerRetentionData: InsurerRetentionRow[] =
  insurerRetentionAnalyticsData.map(item => {
    const retentionRate = Math.random() * 30 + 70; // Generate random retention rate (70-100%)
    const totalPremium = item.premiumRevenue;
    const retainedPremium = (totalPremium * retentionRate) / 100;
    const lostPremium = totalPremium - retainedPremium;
    const totalPolicies = item.policies;
    const retainedPolicies = Math.floor(totalPolicies * (retentionRate / 100));

    return {
      company: item.name, // Use name property
      totalPremium: totalPremium / 1000000, // Convert to millions for display
      retainedPremium: retainedPremium / 1000000,
      lostPremium: lostPremium / 1000000,
      retainedPolicies: retainedPolicies,
      lostPolicies: totalPolicies - retainedPolicies,
      avgTicketSizeRetained: 2.0,
      avgTicketSizeLost: 2.0,
      retentionPercentage: retentionRate,
      lostPercentage: 100 - retentionRate,
    };
  });

export const retentionMetrics: RetentionMetrics = {
  retentionRate: 73.2,
  lostBusinessRate: 26.8,
  premiumRetained: 3850,
  premiumLost: 1416,
  revenueEarned: 577.5,
  potentialLoss: 212.4,
};

// Minimal slice to host retention data (static for now)
const initialState = {
  lossReasonData,
  brokerRetentionData,
  insurerRetentionData,
  retentionMetrics,
};

const retentionSlice = createSlice({
  name: 'retention',
  initialState,
  reducers: {},
});

export default retentionSlice.reducer;

// Simple selectors (can be used without wiring to store if imported directly)
export const selectLossReasons = (state: any): LossReasonData[] =>
  state.retention?.lossReasonData || lossReasonData;
export const selectBrokerRetention = (state: any): BrokerRetentionData[] =>
  state.retention?.brokerRetentionData || brokerRetentionData;
export const selectInsurerRetention = (state: any): InsurerRetentionRow[] =>
  state.retention?.insurerRetentionData || insurerRetentionData;
export const selectRetentionMetrics = (state: any): RetentionMetrics =>
  state.retention?.retentionMetrics || retentionMetrics;
