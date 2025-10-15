export interface LossReasonData {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  premium: number;
  policies: number;
}

export interface BrokerRetentionData {
  id: string;
  name: string;
  retentionRate: number;
  totalPolicies: number;
  renewedPolicies: number;
  lostPolicies: number;
  totalPremium: number;
  color: string;
}

export interface InsurerRetentionRow {
  company: string;
  totalPremium: number;
  retainedPremium: number;
  lostPremium: number;
  retainedPolicies: number;
  lostPolicies: number;
  avgTicketSizeRetained: number;
  avgTicketSizeLost: number;
  retentionPercentage: number;
  lostPercentage: number;
}

export interface RetentionMetrics {
  retentionRate: number;
  lostBusinessRate: number;
  premiumRetained: number;
  premiumLost: number;
  revenueEarned: number;
  potentialLoss: number;
}
