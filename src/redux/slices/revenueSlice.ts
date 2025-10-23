import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BaseMetricsData,
  RevenueState,
  ColorPalette,
  LossReasonData,
  BrokerRetentionData,
  InsurerRetentionRow,
  RetentionMetrics,
} from '../../constants/interfaces';
import { DEFAULT_REPORT_TYPE } from '../../constants/enums';
import {
  productAnalyticsData,
  insurerAnalyticsData,
  verticalAnalyticsData,
  lobAnalyticsData,
  revenueExpensesAnalyticsData,
} from '../../data';

// Professional color palette
const professionalColors: ColorPalette = {
  revenueColors: [
    '#3B82F6', // Professional blue
    '#10B981', // Emerald green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#F1948A',
    '#85929E',
    '#D5A6BD',
  ],
  expenseColors: [
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#84CC16', // Lime
    '#8B5CF6', // Violet
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#F43F5E', // Rose
    '#8B5A2B', // Brown
    '#6B7280', // Gray
    '#7C3AED', // Purple
    '#059669', // Green
    '#DC2626', // Red-600
    '#2563EB', // Blue-600
    '#7C2D12', // Orange-800
    '#BE123C', // Rose-700
  ],
  extendedColors: [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#84CC16',
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#F1948A',
    '#85929E',
    '#D5A6BD',
  ],
};

// Helper function to safely get color with fallback
const getColorSafely = (
  colorArray: string[],
  index: number,
  fallback: string = '#3B82F6'
): string => {
  return colorArray[index] || fallback;
};

// Base metrics
const baseMetrics: BaseMetricsData = {
  totalRevenue: 240000000, // ₹24 crores
  expenses: 153467000, // ₹15.35 crores
  grossProfit: 86533000, // ₹8.65 crores
};
// Loss Reason Analysis dummy data (from analytics RetentionByBroker)
const lossReasonData: LossReasonData[] = [
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
const brokerRetentionData: BrokerRetentionData[] = [
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

// Insurer Retention dummy data (from analytics RetentionByInsurer)
const insurerRetentionData: InsurerRetentionRow[] = [
  {
    id: 'icici-lombard',
    name: 'ICICI Lombard General Insurance',
    value: 1200,
    color: getColorSafely(professionalColors.revenueColors, 0),
    percentage: 24.0,
  },
  {
    id: 'hdfc-ergo',
    name: 'HDFC ERGO General Insurance',
    value: 980,
    color: getColorSafely(professionalColors.revenueColors, 1),
    percentage: 19.6,
  },
  {
    id: 'bajaj-allianz',
    name: 'Bajaj Allianz General Insurance',
    value: 750,
    color: getColorSafely(professionalColors.revenueColors, 2),
    percentage: 15.0,
  },
  {
    id: 'tata-aig',
    name: 'Tata AIG General Insurance',
    value: 650,
    color: getColorSafely(professionalColors.revenueColors, 3),
    percentage: 13.0,
  },
  {
    id: 'new-india-assurance',
    name: 'New India Assurance',
    value: 520,
    color: getColorSafely(professionalColors.revenueColors, 4),
    percentage: 10.4,
  },
  {
    id: 'oriental-insurance',
    name: 'Oriental Insurance Company',
    value: 480,
    color: getColorSafely(professionalColors.revenueColors, 5),
    percentage: 9.6,
  },
  {
    id: 'reliance-general',
    name: 'Reliance General Insurance',
    value: 420,
    color: getColorSafely(professionalColors.revenueColors, 6),
    percentage: 8.4,
  },
  {
    id: 'united-india',
    name: 'United India Insurance',
    value: 385,
    color: getColorSafely(professionalColors.revenueColors, 7),
    percentage: 7.7,
  },
  {
    id: 'national-insurance',
    name: 'National Insurance Company',
    value: 340,
    color: getColorSafely(professionalColors.extendedColors, 8),
    percentage: 6.8,
  },
  {
    id: 'sbi-general',
    name: 'SBI General Insurance',
    value: 310,
    color: getColorSafely(professionalColors.extendedColors, 9),
    percentage: 6.2,
  },
  {
    id: 'future-generali',
    name: 'Future Generali India Insurance',
    value: 280,
    color: getColorSafely(professionalColors.extendedColors, 10),
    percentage: 5.6,
  },
  {
    id: 'liberty-general',
    name: 'Liberty General Insurance',
    value: 245,
    color: getColorSafely(professionalColors.extendedColors, 11),
    percentage: 4.9,
  },
  {
    id: 'iffco-tokio',
    name: 'IFFCO Tokio General Insurance',
    value: 220,
    color: getColorSafely(professionalColors.extendedColors, 12),
    percentage: 4.4,
  },
  {
    id: 'cholamandalam',
    name: 'Cholamandalam MS General Insurance',
    value: 195,
    color: getColorSafely(professionalColors.extendedColors, 13),
    percentage: 3.9,
  },
  {
    id: 'royal-sundaram',
    name: 'Royal Sundaram General Insurance',
    value: 175,
    color: getColorSafely(professionalColors.extendedColors, 14),
    percentage: 3.5,
  },
];

const retentionMetrics: RetentionMetrics = {
  retentionRate: 73.2,
  lostBusinessRate: 26.8,
  premiumRetained: 3850,
  premiumLost: 1416,
  revenueEarned: 577.5,
  potentialLoss: 212.4,
};

const getRevenueData = () => {
  const totalRevenue = baseMetrics.totalRevenue;
  const productsRevenue = totalRevenue * 0.75; // 75% of total revenue for products
  const totalExpenses = baseMetrics.expenses;
  const totalCustomers = 125000; // Total customer base for cross-sell

  // Policy type names and percentages
  const policyTypeData = [
    { name: 'Health Insurance', percentage: 22.5 },
    { name: 'Motor Insurance', percentage: 18.3 },
    { name: 'Life Insurance', percentage: 15.7 },
    { name: 'Property Insurance', percentage: 12.1 },
    { name: 'Travel Insurance', percentage: 8.9 },
    { name: 'Marine Insurance', percentage: 6.4 },
    { name: 'Fire Insurance', percentage: 4.8 },
    { name: 'Personal Accident Insurance', percentage: 3.2 },
    { name: 'Professional Indemnity Insurance', percentage: 2.1 },
    { name: 'Public Liability Insurance', percentage: 1.8 },
    { name: 'Product Liability Insurance', percentage: 1.4 },
    { name: 'Directors & Officers Insurance', percentage: 1.1 },
    { name: 'Employment Practices Liability', percentage: 0.9 },
    { name: 'Cyber Liability Insurance', percentage: 0.7 },
    { name: 'Key Person Insurance', percentage: 0.6 },
    { name: 'Business Interruption Insurance', percentage: 0.5 },
    { name: 'Equipment Insurance', percentage: 0.4 },
    { name: 'Cargo Insurance', percentage: 0.3 },
    { name: 'Credit Insurance', percentage: 0.3 },
    { name: 'Fidelity Guarantee Insurance', percentage: 0.2 },
    { name: 'Workmen Compensation Insurance', percentage: 0.2 },
    { name: 'Group Personal Accident', percentage: 0.1 },
    { name: 'Group Health Insurance', percentage: 0.1 },
    { name: 'Term Life Insurance', percentage: 0.1 },
    { name: 'Whole Life Insurance', percentage: 0.1 },
  ];

  // Expense categories with realistic distribution (from RevenueVsExpences.tsx)
  const expenseCategories = [
    {
      name: 'Operational Costs',
      percentage: 18,
      color: '#EF4444',
      description: 'Day-to-day operational expenses',
    },
    {
      name: 'Claims Processing',
      percentage: 15,
      color: '#F97316',
      description: 'Claims handling and processing costs',
    },
    {
      name: 'Employee Salaries',
      percentage: 12,
      color: '#3B82F6',
      description: 'Employee compensation and benefits',
    },
    {
      name: 'Marketing & Sales',
      percentage: 8,
      color: '#EAB308',
      description: 'Marketing and sales expenses',
    },
    {
      name: 'Technology',
      percentage: 7,
      color: '#8B5CF6',
      description: 'IT infrastructure and software costs',
    },
    {
      name: 'Office Rent',
      percentage: 6,
      color: '#10B981',
      description: 'Office space rental costs',
    },
    {
      name: 'Compliance',
      percentage: 5,
      color: '#06B6D4',
      description: 'Regulatory compliance costs',
    },
    {
      name: 'Insurance Premiums',
      percentage: 4,
      color: '#84CC16',
      description: 'Company insurance costs',
    },
    {
      name: 'Utilities',
      percentage: 3,
      color: '#F59E0B',
      description: 'Electricity, water, and other utilities',
    },
    {
      name: 'Training & Development',
      percentage: 2.5,
      color: '#EC4899',
      description: 'Employee training and development programs',
    },
    {
      name: 'Legal Services',
      percentage: 2.5,
      color: '#6366F1',
      description: 'Legal consultation and services',
    },
    {
      name: 'Accounting & Finance',
      percentage: 2,
      color: '#8B5CF6',
      description: 'Financial management and accounting services',
    },
    {
      name: 'Equipment Maintenance',
      percentage: 2,
      color: '#F97316',
      description: 'Equipment repair and maintenance costs',
    },
    {
      name: 'Business Travel',
      percentage: 1.8,
      color: '#06B6D4',
      description: 'Employee business travel expenses',
    },
    {
      name: 'Communication',
      percentage: 1.5,
      color: '#10B981',
      description: 'Phone, internet, and communication costs',
    },
    {
      name: 'Office Supplies',
      percentage: 1.5,
      color: '#84CC16',
      description: 'Stationery and office supply costs',
    },
    {
      name: 'Research & Development',
      percentage: 1.2,
      color: '#EF4444',
      description: 'Product research and development costs',
    },
    {
      name: 'Security Services',
      percentage: 1.2,
      color: '#F59E0B',
      description: 'Physical and cyber security expenses',
    },
    {
      name: 'External Consulting',
      percentage: 1,
      color: '#EC4899',
      description: 'Third-party consulting services',
    },
    {
      name: 'Software Licenses',
      percentage: 1,
      color: '#6366F1',
      description: 'Software licensing and subscription costs',
    },
    {
      name: 'Recruitment',
      percentage: 0.8,
      color: '#3B82F6',
      description: 'Hiring and recruitment expenses',
    },
    {
      name: 'Events & Conferences',
      percentage: 0.8,
      color: '#8B5CF6',
      description: 'Corporate events and conference costs',
    },
    {
      name: 'Printing & Publishing',
      percentage: 0.7,
      color: '#10B981',
      description: 'Printing and publishing expenses',
    },
    {
      name: 'Subscriptions',
      percentage: 0.7,
      color: '#F97316',
      description: 'Professional subscriptions and memberships',
    },
    {
      name: 'Depreciation',
      percentage: 0.6,
      color: '#06B6D4',
      description: 'Asset depreciation costs',
    },
    {
      name: 'Banking & Finance',
      percentage: 0.5,
      color: '#84CC16',
      description: 'Banking fees and financial charges',
    },
    {
      name: 'Corporate Social Responsibility',
      percentage: 0.5,
      color: '#EF4444',
      description: 'Charitable donations and CSR activities',
    },
  ];

  return {
    revenueByInsurers: insurerAnalyticsData.map((insurer, index) => ({
      id: insurer.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: insurer.name,
      value: insurer.premiumRevenue,
      color: insurer.color,
      percentage: insurer.revenuePercentage,
    })),
    revenueByPolicyType: policyTypeData.map((policy, index) => ({
      id: policy.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: policy.name,
      value: Math.round(productsRevenue * (policy.percentage / 100)),
      color: getColorSafely(
        professionalColors.extendedColors,
        index % professionalColors.extendedColors.length
      ),
      percentage: policy.percentage,
      description: `${policy.name} policies and coverage`,
    })),
    revenueByVertical: verticalAnalyticsData.map((vertical, index) => ({
      id: vertical.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: vertical.name,
      value: vertical.premiumRevenue,
      color: vertical.color,
      percentage: vertical.revenuePercentage,
    })),
    revenueByLOB: lobAnalyticsData.map((lob, index) => ({
      id: lob.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: lob.name,
      value: lob.premiumRevenue,
      color: lob.color,
      percentage: lob.revenuePercentage,
    })),
    revenueByProducts: productAnalyticsData.map((product, index) => ({
      id: product.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: product.name,
      value: product.premiumRevenue,
      color: product.color,
      percentage: product.revenuePercentage,
      policies: product.policies,
      clientTypes: {
        Corporate: Math.round(product.premiumRevenue * 0.4),
        Retail: Math.round(product.premiumRevenue * 0.35),
        Affinity: Math.round(product.premiumRevenue * 0.25),
      },
    })),
    crossSellPenetration: [
      {
        id: 'health-motor',
        name: 'Health + Motor',
        value: Math.round(totalCustomers * 0.285),
        color: getColorSafely(professionalColors.revenueColors, 0),
        percentage: 28.5,
      },
      {
        id: 'life-health',
        name: 'Life + Health',
        value: Math.round(totalCustomers * 0.245),
        color: getColorSafely(professionalColors.revenueColors, 1),
        percentage: 24.5,
      },
      {
        id: 'motor-travel',
        name: 'Motor + Travel',
        value: Math.round(totalCustomers * 0.185),
        color: getColorSafely(professionalColors.revenueColors, 2),
        percentage: 18.5,
      },
      {
        id: 'health-travel',
        name: 'Health + Travel',
        value: Math.round(totalCustomers * 0.125),
        color: getColorSafely(professionalColors.revenueColors, 3),
        percentage: 12.5,
      },
      {
        id: 'life-motor',
        name: 'Life + Motor',
        value: Math.round(totalCustomers * 0.095),
        color: getColorSafely(professionalColors.revenueColors, 4),
        percentage: 9.5,
      },
      {
        id: 'property-motor',
        name: 'Property + Motor',
        value: Math.round(totalCustomers * 0.065),
        color: getColorSafely(professionalColors.revenueColors, 5),
        percentage: 6.5,
      },
    ],
    numberOfProducts: [
      {
        id: 'single-product',
        name: 'Single Product',
        value: 4800,
        percentage: 60.0,
        avgPremium: 45000,
        color: getColorSafely(professionalColors.revenueColors, 0),
      },
      {
        id: 'two-products',
        name: 'Two Products',
        value: 2000,
        percentage: 25.0,
        avgPremium: 85000,
        color: getColorSafely(professionalColors.revenueColors, 1),
      },
      {
        id: 'three-products',
        name: 'Three Products',
        value: 800,
        percentage: 10.0,
        avgPremium: 125000,
        color: getColorSafely(professionalColors.revenueColors, 2),
      },
      {
        id: 'four-products',
        name: 'Four Products',
        value: 620,
        percentage: 4.0,
        avgPremium: 165000,
        color: getColorSafely(professionalColors.revenueColors, 3),
      },
      {
        id: 'five-products',
        name: 'Five Products',
        value: 464,
        percentage: 0.8,
        avgPremium: 205000,
        color: getColorSafely(professionalColors.revenueColors, 4),
      },
      {
        id: 'six-plus-products',
        name: 'Six+ Products',
        value: 16,
        percentage: 0.2,
        avgPremium: 245000,
        color: getColorSafely(professionalColors.revenueColors, 5),
      },
    ],
    expenseData: expenseCategories.map(category => ({
      id: category.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: category.name,
      value: Math.round(totalExpenses * (category.percentage / 100)),
      color: category.color,
      percentage: category.percentage,
      description: category.description,
    })),
    tableData: [
      {
        id: '1',
        name: 'HDFC ERGO',
        policies: 15420,
        amount: Math.round(productsRevenue * 0.225),
        revenue: Math.round(productsRevenue * 0.225 * 1.15),
      },
      {
        id: '2',
        name: 'ICICI Lombard',
        policies: 13250,
        amount: Math.round(productsRevenue * 0.195),
        revenue: Math.round(productsRevenue * 0.195 * 1.12),
      },
      {
        id: '3',
        name: 'Bajaj Allianz',
        policies: 11800,
        amount: Math.round(productsRevenue * 0.165),
        revenue: Math.round(productsRevenue * 0.165 * 1.18),
      },
      {
        id: '4',
        name: 'Tata AIG',
        policies: 9650,
        amount: Math.round(productsRevenue * 0.135),
        revenue: Math.round(productsRevenue * 0.135 * 1.22),
      },
      {
        id: '5',
        name: 'Reliance General',
        policies: 8200,
        amount: Math.round(productsRevenue * 0.115),
        revenue: Math.round(productsRevenue * 0.115 * 1.08),
      },
    ],
  };
};

const revenueData = getRevenueData();

const initialState: RevenueState = {
  revenueByInsurers: revenueData.revenueByInsurers,
  revenueByPolicyType: revenueData.revenueByPolicyType,
  revenueByVertical: revenueData.revenueByVertical,
  revenueByLOB: revenueData.revenueByLOB,
  revenueByProducts: revenueData.revenueByProducts,
  crossSellPenetration: revenueData.crossSellPenetration,
  numberOfProducts: revenueData.numberOfProducts,
  expenseData: revenueData.expenseData,
  tableData: revenueData.tableData,
  lossReasonData,
  brokerRetentionData,
  insurerRetentionData,
  retentionMetrics,
  baseMetrics,
  loading: false,
  error: null,
  selectedReportType: DEFAULT_REPORT_TYPE,
  totalRevenue: baseMetrics.totalRevenue,
};

const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    setSelectedReportType: (state, action: PayloadAction<string>) => {
      state.selectedReportType = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    updateRevenueData: (
      state,
      action: PayloadAction<Partial<RevenueState>>
    ) => {
      Object.assign(state, action.payload);
    },
    updateBaseMetrics: (state, action: PayloadAction<BaseMetricsData>) => {
      state.baseMetrics = action.payload;
      state.totalRevenue = action.payload.totalRevenue;
    },
  },
});

export const {
  setSelectedReportType,
  setLoading,
  setError,
  updateRevenueData,
  updateBaseMetrics,
} = revenueSlice.actions;

// Selectors
export const selectNumberOfProducts = (state: any) =>
  state.revenue?.numberOfProducts || [];

// Enhanced selectors that use imported data when available
export const selectRevenueByProducts = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported && importedData.productData?.length > 0) {
    // Transform imported product data to match the expected format
    return importedData.productData.map((product: any, index: number) => ({
      id: `product-${index}`,
      name: product.name,
      value: product.revenue,
      percentage: product.percentage,
      color: product.color,
      growth: product.growth,
      policies: product.policies, // Include policies from Excel
      premium: product.premium, // Include premium from Excel
      revenuePercentage: product.revenuePercentage, // Include revenue percentage from Excel
      // Add additional fields that components might expect
      clientTypes: {
        Corporate: product.revenue * 0.4,
        Retail: product.revenue * 0.35,
        Affinity: product.revenue * 0.25,
      },
    }));
  }

  return state.revenue?.revenueByProducts || [];
};

export const selectRevenueByInsurers = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported && importedData.insurerData?.length > 0) {
    // Transform imported insurer data to match the expected format
    return importedData.insurerData.map((insurer: any, index: number) => ({
      id: `insurer-${index}`,
      name: insurer.name,
      value: insurer.revenue,
      policies: insurer.policies,
      premium: insurer.premium, // Include premium from Excel
      revenuePercentage: insurer.revenuePercentage, // Include revenue percentage from Excel
      retention: insurer.retention,
      color: insurer.color,
      percentage: (insurer.revenue / importedData.totalRevenue) * 100,
      // Add additional fields that components might expect
      clientTypes: {
        Corporate: insurer.revenue * 0.45,
        Retail: insurer.revenue * 0.35,
        Affinity: insurer.revenue * 0.2,
      },
    }));
  }

  return state.revenue?.revenueByInsurers || [];
};

export const selectBaseMetrics = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported) {
    return {
      totalRevenue: importedData.totalRevenue,
      expenses: importedData.expenses,
      grossProfit: importedData.grossProfit,
    };
  }

  return state.revenue?.baseMetrics || {};
};

export const selectRevenueByPolicyType = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported && importedData.policyTypeData?.length > 0) {
    // Transform imported policy type data to match the expected format
    return importedData.policyTypeData.map(
      (policyType: any, index: number) => ({
        id: `policy-type-${index}`,
        name: policyType.name,
        value: policyType.revenue,
        policies: policyType.policies,
        premium: policyType.premium,
        revenuePercentage: policyType.revenuePercentage,
        color: policyType.color,
        percentage: (policyType.revenue / importedData.totalRevenue) * 100,
        // Add additional fields that components might expect
        clientTypes: {
          Corporate: policyType.revenue * 0.45,
          Retail: policyType.revenue * 0.35,
          Affinity: policyType.revenue * 0.2,
        },
      })
    );
  }

  return state.revenue?.revenueByPolicyType || [];
};

export const selectRevenueByLOB = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported && importedData.lobData?.length > 0) {
    // Transform imported LOB data to match the expected format
    return importedData.lobData.map((lob: any, index: number) => ({
      id: `lob-${index}`,
      name: lob.name,
      value: lob.revenue,
      policies: lob.policies,
      premium: lob.premium,
      revenuePercentage: lob.revenuePercentage,
      color: lob.color,
      percentage: (lob.revenue / importedData.totalRevenue) * 100,
      // Add additional fields that components might expect
      clientTypes: {
        Corporate: lob.revenue * 0.45,
        Retail: lob.revenue * 0.35,
        Affinity: lob.revenue * 0.2,
      },
    }));
  }

  return state.revenue?.revenueByLOB || [];
};

export const selectRevenueByVertical = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported && importedData.verticalData?.length > 0) {
    // Transform imported vertical data to match the expected format
    return importedData.verticalData.map((vertical: any, index: number) => ({
      id: `vertical-${index}`,
      name: vertical.name,
      value: vertical.revenue,
      policies: vertical.policies,
      premium: vertical.premium,
      revenuePercentage: vertical.revenuePercentage,
      color: vertical.color,
      percentage: (vertical.revenue / importedData.totalRevenue) * 100,
      // Add additional fields that components might expect
      clientTypes: {
        Corporate: vertical.revenue * 0.45,
        Retail: vertical.revenue * 0.35,
        Affinity: vertical.revenue * 0.2,
      },
    }));
  }

  return state.revenue?.revenueByVertical || [];
};

export const selectRetentionByInsurer = (state: any) => {
  const importedData = state.importedData;

  if (
    importedData?.isDataImported &&
    importedData.retentionByInsurerData?.length > 0
  ) {
    // Transform imported retention by insurer data to match the expected format
    return importedData.retentionByInsurerData.map(
      (insurer: any, index: number) => ({
        id: `retention-insurer-${index}`,
        name: insurer.name,
        value: insurer.revenue,
        policies: insurer.policies,
        retention: insurer.retention,
        premium: insurer.premium,
        revenuePercentage: insurer.revenuePercentage,
        color: insurer.color,
        percentage: (insurer.revenue / importedData.totalRevenue) * 100,
        // Add additional fields that components might expect
        clientTypes: {
          Corporate: insurer.revenue * 0.45,
          Retail: insurer.revenue * 0.35,
          Affinity: insurer.revenue * 0.2,
        },
      })
    );
  }

  return state.revenue?.revenueByInsurers || [];
};

export const selectRetentionByBroker = (state: any) => {
  const importedData = state.importedData;

  if (
    importedData?.isDataImported &&
    importedData.retentionByBrokerData?.length > 0
  ) {
    // Transform imported retention by broker data to match the expected format
    return importedData.retentionByBrokerData.map(
      (broker: any, index: number) => ({
        id: `retention-broker-${index}`,
        name: broker.name,
        value: broker.revenue,
        policies: broker.policies,
        retention: broker.retention,
        premium: broker.premium,
        revenuePercentage: broker.revenuePercentage,
        color: broker.color,
        percentage: (broker.revenue / importedData.totalRevenue) * 100,
        // Add additional fields that components might expect
        clientTypes: {
          Corporate: broker.revenue * 0.45,
          Retail: broker.revenue * 0.35,
          Affinity: broker.revenue * 0.2,
        },
      })
    );
  }

  return state.revenue?.brokerRetentionData || [];
};

export const selectNumberOfProductsData = (state: any) => {
  const importedData = state.importedData;

  if (
    importedData?.isDataImported &&
    importedData.numberOfProductData?.length > 0
  ) {
    // Transform imported number of product data to match the expected format
    return importedData.numberOfProductData.map(
      (product: any, index: number) => ({
        id: `number-product-${index}`,
        name: product.name,
        value: product.revenue,
        policies: product.policies,
        premium: product.premium,
        revenuePercentage: product.revenuePercentage,
        color: product.color,
        percentage: (product.revenue / importedData.totalRevenue) * 100,
        // Add additional fields that components might expect
        clientTypes: {
          Corporate: product.revenue * 0.45,
          Retail: product.revenue * 0.35,
          Affinity: product.revenue * 0.2,
        },
      })
    );
  }

  return state.revenue?.numberOfProducts || [];
};

export const selectRevenueVsExpenses = (state: any) => {
  const importedData = state.importedData;

  if (importedData?.isDataImported) {
    return {
      revenueByProducts: importedData.revenueByProducts || [],
      expenseData: importedData.expenseData || [],
    };
  }

  return {
    revenueByProducts: state.revenue?.revenueByProducts || [],
    expenseData: state.revenue?.expenseData || [],
  };
};

export const selectCrossSellData = (state: any) => {
  return state.revenue?.crossSellPenetration || [];
};

export default revenueSlice.reducer;
