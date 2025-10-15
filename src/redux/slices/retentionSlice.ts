import { createSlice } from '@reduxjs/toolkit';
import type {
  LossReasonData,
  BrokerRetentionData,
  InsurerRetentionRow,
  RetentionMetrics,
} from '@/constants/interfaces/retention';

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

// Broker Retention dummy data (from analytics RetentionByBroker)
export const brokerRetentionData: BrokerRetentionData[] = [
  {
    id: 'marsh-mclennan',
    name: 'Marsh & McLennan',
    retentionRate: 94.2,
    totalPolicies: 15420,
    renewedPolicies: 14526,
    lostPolicies: 894,
    totalPremium: 125600000,
    color: '#3B82F6',
  },
  {
    id: 'aon-plc',
    name: 'Aon plc',
    retentionRate: 91.8,
    totalPolicies: 12850,
    renewedPolicies: 11796,
    lostPolicies: 1054,
    totalPremium: 98750000,
    color: '#10B981',
  },
  {
    id: 'willis-towers',
    name: 'Willis Towers Watson',
    retentionRate: 89.5,
    totalPolicies: 10200,
    renewedPolicies: 9129,
    lostPolicies: 1071,
    totalPremium: 87300000,
    color: '#F59E0B',
  },
  {
    id: 'arthur-gallagher',
    name: 'Arthur J. Gallagher',
    retentionRate: 87.3,
    totalPolicies: 8950,
    renewedPolicies: 7813,
    lostPolicies: 1137,
    totalPremium: 72400000,
    color: '#EF4444',
  },
  {
    id: 'brown-brown',
    name: 'Brown & Brown',
    retentionRate: 85.1,
    totalPolicies: 7600,
    renewedPolicies: 6468,
    lostPolicies: 1132,
    totalPremium: 61200000,
    color: '#8B5CF6',
  },
];

// Insurer Retention dummy data (from analytics RetentionByInsurer)
export const insurerRetentionData: InsurerRetentionRow[] = [
  {
    company: 'ICICI Lombard General Insurance',
    totalPremium: 1200,
    retainedPremium: 912,
    lostPremium: 288,
    retainedPolicies: 456,
    lostPolicies: 144,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.0,
    retentionPercentage: 76.0,
    lostPercentage: 24.0,
  },
  {
    company: 'HDFC ERGO General Insurance',
    totalPremium: 980,
    retainedPremium: 725,
    lostPremium: 255,
    retainedPolicies: 362,
    lostPolicies: 98,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.6,
    retentionPercentage: 74.0,
    lostPercentage: 26.0,
  },
  {
    company: 'Bajaj Allianz General Insurance',
    totalPremium: 750,
    retainedPremium: 540,
    lostPremium: 210,
    retainedPolicies: 270,
    lostPolicies: 105,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.0,
    retentionPercentage: 72.0,
    lostPercentage: 28.0,
  },
  {
    company: 'Tata AIG General Insurance',
    totalPremium: 650,
    retainedPremium: 468,
    lostPremium: 182,
    retainedPolicies: 234,
    lostPolicies: 91,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.0,
    retentionPercentage: 72.0,
    lostPercentage: 28.0,
  },
  {
    company: 'New India Assurance',
    totalPremium: 520,
    retainedPremium: 364,
    lostPremium: 156,
    retainedPolicies: 182,
    lostPolicies: 78,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.0,
    retentionPercentage: 70.0,
    lostPercentage: 30.0,
  },
  {
    company: 'Oriental Insurance Company',
    totalPremium: 480,
    retainedPremium: 326,
    lostPremium: 154,
    retainedPolicies: 163,
    lostPolicies: 77,
    avgTicketSizeRetained: 2.0,
    avgTicketSizeLost: 2.0,
    retentionPercentage: 68.0,
    lostPercentage: 32.0,
  },
];

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
