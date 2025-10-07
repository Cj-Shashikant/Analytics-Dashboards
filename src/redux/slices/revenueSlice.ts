import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  RevenueDataItem,
  ExpenseDataItem,
  CrossSellDataItem,
  TableDataItem,
  BaseMetricsData,
  RevenueState,
  ColorPalette,
} from '../../constants/interfaces';
import { RevenueReportType, DEFAULT_REPORT_TYPE } from '../../constants/enums';

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

// Base metrics
const baseMetrics: BaseMetricsData = {
  totalRevenue: 240000000, // ₹24 crores
  expenses: 153467000, // ₹15.35 crores
  grossProfit: 86533000, // ₹8.65 crores
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
    { name: 'Operational Costs', percentage: 18, color: '#EF4444', description: 'Day-to-day operational expenses' },
    { name: 'Claims Processing', percentage: 15, color: '#F97316', description: 'Claims handling and processing costs' },
    { name: 'Employee Salaries', percentage: 12, color: '#3B82F6', description: 'Employee compensation and benefits' },
    { name: 'Marketing & Sales', percentage: 8, color: '#EAB308', description: 'Marketing and sales expenses' },
    { name: 'Technology', percentage: 7, color: '#8B5CF6', description: 'IT infrastructure and software costs' },
    { name: 'Office Rent', percentage: 6, color: '#10B981', description: 'Office space rental costs' },
    { name: 'Compliance', percentage: 5, color: '#06B6D4', description: 'Regulatory compliance costs' },
    { name: 'Insurance Premiums', percentage: 4, color: '#84CC16', description: 'Company insurance costs' },
    { name: 'Utilities', percentage: 3, color: '#F59E0B', description: 'Electricity, water, and other utilities' },
    { name: 'Training & Development', percentage: 2.5, color: '#EC4899', description: 'Employee training and development programs' },
    { name: 'Legal Services', percentage: 2.5, color: '#6366F1', description: 'Legal consultation and services' },
    { name: 'Accounting & Finance', percentage: 2, color: '#8B5CF6', description: 'Financial management and accounting services' },
    { name: 'Equipment Maintenance', percentage: 2, color: '#F97316', description: 'Equipment repair and maintenance costs' },
    { name: 'Business Travel', percentage: 1.8, color: '#06B6D4', description: 'Employee business travel expenses' },
    { name: 'Communication', percentage: 1.5, color: '#10B981', description: 'Phone, internet, and communication costs' },
    { name: 'Office Supplies', percentage: 1.5, color: '#84CC16', description: 'Stationery and office supply costs' },
    { name: 'Research & Development', percentage: 1.2, color: '#EF4444', description: 'Product research and development costs' },
    { name: 'Security Services', percentage: 1.2, color: '#F59E0B', description: 'Physical and cyber security expenses' },
    { name: 'External Consulting', percentage: 1, color: '#EC4899', description: 'Third-party consulting services' },
    { name: 'Software Licenses', percentage: 1, color: '#6366F1', description: 'Software licensing and subscription costs' },
    { name: 'Recruitment', percentage: 0.8, color: '#3B82F6', description: 'Hiring and recruitment expenses' },
    { name: 'Events & Conferences', percentage: 0.8, color: '#8B5CF6', description: 'Corporate events and conference costs' },
    { name: 'Printing & Publishing', percentage: 0.7, color: '#10B981', description: 'Printing and publishing expenses' },
    { name: 'Subscriptions', percentage: 0.7, color: '#F97316', description: 'Professional subscriptions and memberships' },
    { name: 'Depreciation', percentage: 0.6, color: '#06B6D4', description: 'Asset depreciation costs' },
    { name: 'Banking & Finance', percentage: 0.5, color: '#84CC16', description: 'Banking fees and financial charges' },
    { name: 'Corporate Social Responsibility', percentage: 0.5, color: '#EF4444', description: 'Charitable donations and CSR activities' },
  ];

  return {
    revenueByInsurers: [
      {
        id: 'hdfc-ergo',
        name: 'HDFC ERGO',
        value: Math.round(productsRevenue * 0.225),
        color: professionalColors.revenueColors[0],
        percentage: 22.5,
      },
      {
        id: 'icici-lombard',
        name: 'ICICI Lombard',
        value: Math.round(productsRevenue * 0.195),
        color: professionalColors.revenueColors[1],
        percentage: 19.5,
      },
      {
        id: 'bajaj-allianz',
        name: 'Bajaj Allianz',
        value: Math.round(productsRevenue * 0.165),
        color: professionalColors.revenueColors[2],
        percentage: 16.5,
      },
      {
        id: 'tata-aig',
        name: 'Tata AIG',
        value: Math.round(productsRevenue * 0.135),
        color: professionalColors.revenueColors[3],
        percentage: 13.5,
      },
      {
        id: 'reliance-general',
        name: 'Reliance General',
        value: Math.round(productsRevenue * 0.115),
        color: professionalColors.revenueColors[4],
        percentage: 11.5,
      },
      {
        id: 'new-india-assurance',
        name: 'New India Assurance',
        value: Math.round(productsRevenue * 0.085),
        color: professionalColors.revenueColors[5],
        percentage: 8.5,
      },
      {
        id: 'oriental-insurance',
        name: 'Oriental Insurance',
        value: Math.round(productsRevenue * 0.055),
        color: professionalColors.revenueColors[6],
        percentage: 5.5,
      },
      {
        id: 'united-india',
        name: 'United India',
        value: Math.round(productsRevenue * 0.025),
        color: professionalColors.revenueColors[7],
        percentage: 2.5,
      },
      {
        id: 'national-insurance',
        name: 'National Insurance',
        value: Math.round(productsRevenue * 0.022),
        color: professionalColors.extendedColors[10],
        percentage: 2.2,
      },
      {
        id: 'future-generali',
        name: 'Future Generali',
        value: Math.round(productsRevenue * 0.018),
        color: professionalColors.extendedColors[11],
        percentage: 1.8,
      },
      {
        id: 'liberty-general',
        name: 'Liberty General',
        value: Math.round(productsRevenue * 0.015),
        color: professionalColors.extendedColors[12],
        percentage: 1.5,
      },
      {
        id: 'iffco-tokio',
        name: 'IFFCO Tokio',
        value: Math.round(productsRevenue * 0.012),
        color: professionalColors.extendedColors[13],
        percentage: 1.2,
      },
      {
        id: 'cholamandalam',
        name: 'Cholamandalam MS',
        value: Math.round(productsRevenue * 0.01),
        color: professionalColors.extendedColors[14],
        percentage: 1.0,
      },
      {
        id: 'shriram-general',
        name: 'Shriram General',
        value: Math.round(productsRevenue * 0.008),
        color: professionalColors.extendedColors[15],
        percentage: 0.8,
      },
      {
        id: 'go-digit',
        name: 'Go Digit',
        value: Math.round(productsRevenue * 0.007),
        color: professionalColors.extendedColors[16],
        percentage: 0.7,
      },
      {
        id: 'acko-general',
        name: 'Acko General',
        value: Math.round(productsRevenue * 0.006),
        color: professionalColors.extendedColors[17],
        percentage: 0.6,
      },
      {
        id: 'kotak-mahindra',
        name: 'Kotak Mahindra',
        value: Math.round(productsRevenue * 0.005),
        color: professionalColors.extendedColors[18],
        percentage: 0.5,
      },
      {
        id: 'magma-hdi',
        name: 'Magma HDI',
        value: Math.round(productsRevenue * 0.004),
        color: professionalColors.extendedColors[19],
        percentage: 0.4,
      },
      {
        id: 'raheja-qbe',
        name: 'Raheja QBE',
        value: Math.round(productsRevenue * 0.003),
        color: professionalColors.extendedColors[20],
        percentage: 0.3,
      },
      {
        id: 'universal-sompo',
        name: 'Universal Sompo',
        value: Math.round(productsRevenue * 0.002),
        color: professionalColors.extendedColors[21],
        percentage: 0.2,
      },
      {
        id: 'sbi-general',
        name: 'SBI General',
        value: Math.round(productsRevenue * 0.002),
        color: professionalColors.extendedColors[22],
        percentage: 0.2,
      },
      {
        id: 'bharti-axa',
        name: 'Bharti AXA',
        value: Math.round(productsRevenue * 0.001),
        color: professionalColors.extendedColors[23],
        percentage: 0.1,
      },
      {
        id: 'royal-sundaram',
        name: 'Royal Sundaram',
        value: Math.round(productsRevenue * 0.001),
        color: professionalColors.extendedColors[24],
        percentage: 0.1,
      },
    ],
    revenueByPolicyType: policyTypeData.map((policy, index) => ({
      id: policy.name
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, ''),
      name: policy.name,
      value: Math.round(productsRevenue * (policy.percentage / 100)),
      color:
        professionalColors.extendedColors[
          index % professionalColors.extendedColors.length
        ],
      percentage: policy.percentage,
      description: `${policy.name} policies and coverage`,
    })),
    revenueByVertical: [
      {
        id: 'life-health',
        name: 'Life & Health',
        value: Math.round(productsRevenue * 0.385),
        color: professionalColors.revenueColors[0],
        percentage: 38.5,
      },
      {
        id: 'property-casualty',
        name: 'Property & Casualty',
        value: Math.round(productsRevenue * 0.295),
        color: professionalColors.revenueColors[1],
        percentage: 29.5,
      },
      {
        id: 'commercial-lines',
        name: 'Commercial Lines',
        value: Math.round(productsRevenue * 0.185),
        color: professionalColors.revenueColors[2],
        percentage: 18.5,
      },
      {
        id: 'specialty-lines',
        name: 'Specialty Lines',
        value: Math.round(productsRevenue * 0.135),
        color: professionalColors.revenueColors[3],
        percentage: 13.5,
      },
      {
        id: 'reinsurance',
        name: 'Reinsurance',
        value: Math.round(productsRevenue * 0.085),
        color: professionalColors.revenueColors[4],
        percentage: 8.5,
      },
      {
        id: 'international',
        name: 'International',
        value: Math.round(productsRevenue * 0.065),
        color: professionalColors.revenueColors[5],
        percentage: 6.5,
      },
      {
        id: 'digital-insurance',
        name: 'Digital Insurance',
        value: Math.round(productsRevenue * 0.045),
        color: professionalColors.revenueColors[6],
        percentage: 4.5,
      },
      {
        id: 'bancassurance',
        name: 'Bancassurance',
        value: Math.round(productsRevenue * 0.035),
        color: professionalColors.revenueColors[7],
        percentage: 3.5,
      },
      {
        id: 'microinsurance',
        name: 'Microinsurance',
        value: Math.round(productsRevenue * 0.025),
        color: professionalColors.extendedColors[10],
        percentage: 2.5,
      },
      {
        id: 'crop-insurance',
        name: 'Crop Insurance',
        value: Math.round(productsRevenue * 0.018),
        color: professionalColors.extendedColors[11],
        percentage: 1.8,
      },
      {
        id: 'cyber-insurance',
        name: 'Cyber Insurance',
        value: Math.round(productsRevenue * 0.015),
        color: professionalColors.extendedColors[12],
        percentage: 1.5,
      },
      {
        id: 'parametric-insurance',
        name: 'Parametric Insurance',
        value: Math.round(productsRevenue * 0.012),
        color: professionalColors.extendedColors[13],
        percentage: 1.2,
      },
      {
        id: 'climate-insurance',
        name: 'Climate Insurance',
        value: Math.round(productsRevenue * 0.008),
        color: professionalColors.extendedColors[14],
        percentage: 0.8,
      },
      {
        id: 'insurtech',
        name: 'InsurTech',
        value: Math.round(productsRevenue * 0.005),
        color: professionalColors.extendedColors[15],
        percentage: 0.5,
      },
      {
        id: 'peer-to-peer',
        name: 'Peer-to-Peer',
        value: Math.round(productsRevenue * 0.003),
        color: professionalColors.extendedColors[16],
        percentage: 0.3,
      },
    ],
    revenueByLOB: [
      {
        id: 'employee-benefit',
        name: 'Employee Benefit',
        value: Math.round(productsRevenue * 0.325),
        color: professionalColors.revenueColors[0],
        percentage: 32.5,
      },
      {
        id: 'property-engineering',
        name: 'Property & Engineering',
        value: Math.round(productsRevenue * 0.265),
        color: professionalColors.revenueColors[1],
        percentage: 26.5,
      },
      {
        id: 'marine',
        name: 'Marine',
        value: Math.round(productsRevenue * 0.185),
        color: professionalColors.revenueColors[2],
        percentage: 18.5,
      },
      {
        id: 'specie',
        name: 'Specie',
        value: Math.round(productsRevenue * 0.125),
        color: professionalColors.revenueColors[3],
        percentage: 12.5,
      },
      {
        id: 'specialities',
        name: 'Specialities',
        value: Math.round(productsRevenue * 0.105),
        color: professionalColors.revenueColors[4],
        percentage: 10.5,
      },
    ],
    revenueByProducts: [
      {
        id: 'health-insurance',
        name: 'Health Insurance',
        value: Math.round(productsRevenue * 0.285),
        color: professionalColors.revenueColors[0],
        percentage: 28.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.285 * 0.45),
          Retail: Math.round(productsRevenue * 0.285 * 0.35),
          Affinity: Math.round(productsRevenue * 0.285 * 0.2),
        },
      },
      {
        id: 'motor-insurance',
        name: 'Motor Insurance',
        value: Math.round(productsRevenue * 0.245),
        color: professionalColors.revenueColors[1],
        percentage: 24.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.245 * 0.3),
          Retail: Math.round(productsRevenue * 0.245 * 0.55),
          Affinity: Math.round(productsRevenue * 0.245 * 0.15),
        },
      },
      {
        id: 'life-insurance',
        name: 'Life Insurance',
        value: Math.round(productsRevenue * 0.185),
        color: professionalColors.revenueColors[2],
        percentage: 18.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.185 * 0.4),
          Retail: Math.round(productsRevenue * 0.185 * 0.45),
          Affinity: Math.round(productsRevenue * 0.185 * 0.15),
        },
      },
      {
        id: 'property-insurance',
        name: 'Property Insurance',
        value: Math.round(productsRevenue * 0.125),
        color: professionalColors.revenueColors[3],
        percentage: 12.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.125 * 0.6),
          Retail: Math.round(productsRevenue * 0.125 * 0.25),
          Affinity: Math.round(productsRevenue * 0.125 * 0.15),
        },
      },
      {
        id: 'travel-insurance',
        name: 'Travel Insurance',
        value: Math.round(productsRevenue * 0.095),
        color: professionalColors.revenueColors[4],
        percentage: 9.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.095 * 0.35),
          Retail: Math.round(productsRevenue * 0.095 * 0.5),
          Affinity: Math.round(productsRevenue * 0.095 * 0.15),
        },
      },
      {
        id: 'marine-insurance',
        name: 'Marine Insurance',
        value: Math.round(productsRevenue * 0.065),
        color: professionalColors.revenueColors[5],
        percentage: 6.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.065 * 0.8),
          Retail: Math.round(productsRevenue * 0.065 * 0.1),
          Affinity: Math.round(productsRevenue * 0.065 * 0.1),
        },
      },

      {
        id: 'cyber-insurance',
        name: 'Cyber Insurance',
        value: Math.round(productsRevenue * 0.05),
        color: professionalColors.revenueColors[6],
        percentage: 5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.05 * 0.7),
          Retail: Math.round(productsRevenue * 0.05 * 0.2),
          Affinity: Math.round(productsRevenue * 0.05 * 0.1),
        },
      },
      {
        id: 'crop-insurance',
        name: 'Crop Insurance',
        value: Math.round(productsRevenue * 0.04),
        color: professionalColors.revenueColors[3],
        percentage: 4,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.04 * 0.25),
          Retail: Math.round(productsRevenue * 0.04 * 0.6),
          Affinity: Math.round(productsRevenue * 0.04 * 0.15),
        },
      },
      {
        id: 'pet-insurance',
        name: 'Pet Insurance',
        value: Math.round(productsRevenue * 0.03),
        color: professionalColors.revenueColors[8],
        percentage: 3,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.03 * 0.15),
          Retail: Math.round(productsRevenue * 0.03 * 0.75),
          Affinity: Math.round(productsRevenue * 0.03 * 0.1),
        },
      },
      {
        id: 'education-insurance',
        name: 'Education Insurance',
        value: Math.round(productsRevenue * 0.025),
        color: professionalColors.revenueColors[9],
        percentage: 2.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.025 * 0.2),
          Retail: Math.round(productsRevenue * 0.025 * 0.65),
          Affinity: Math.round(productsRevenue * 0.025 * 0.15),
        },
      },
      {
        id: 'burglary-insurance',
        name: 'Burglary Insurance',
        value: Math.round(productsRevenue * 0.035),
        color: professionalColors.revenueColors[10],
        percentage: 3.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.035 * 0.4),
          Retail: Math.round(productsRevenue * 0.035 * 0.45),
          Affinity: Math.round(productsRevenue * 0.035 * 0.15),
        },
      },
      {
        id: 'liability-insurance',
        name: 'Liability Insurance',
        value: Math.round(productsRevenue * 0.055),
        color: professionalColors.revenueColors[11],
        percentage: 5.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.055 * 0.65),
          Retail: Math.round(productsRevenue * 0.055 * 0.25),
          Affinity: Math.round(productsRevenue * 0.055 * 0.1),
        },
      },
      {
        id: 'credit-insurance',
        name: 'Credit Insurance',
        value: Math.round(productsRevenue * 0.045),
        color: professionalColors.revenueColors[12],
        percentage: 4.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.045 * 0.6),
          Retail: Math.round(productsRevenue * 0.045 * 0.3),
          Affinity: Math.round(productsRevenue * 0.045 * 0.1),
        },
      },
      {
        id: 'event-insurance',
        name: 'Event Insurance',
        value: Math.round(productsRevenue * 0.02),
        color: professionalColors.revenueColors[13],
        percentage: 2,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.02 * 0.3),
          Retail: Math.round(productsRevenue * 0.02 * 0.6),
          Affinity: Math.round(productsRevenue * 0.02 * 0.1),
        },
      },
      {
        id: 'fire-insurance',
        name: 'Fire Insurance',
        value: Math.round(productsRevenue * 0.06),
        color: professionalColors.revenueColors[14],
        percentage: 6,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.06 * 0.55),
          Retail: Math.round(productsRevenue * 0.06 * 0.35),
          Affinity: Math.round(productsRevenue * 0.06 * 0.1),
        },
      },
      {
        id: 'disability-insurance',
        name: 'Disability Insurance',
        value: Math.round(productsRevenue * 0.025),
        color: professionalColors.revenueColors[15],
        percentage: 2.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.025 * 0.25),
          Retail: Math.round(productsRevenue * 0.025 * 0.6),
          Affinity: Math.round(productsRevenue * 0.025 * 0.15),
        },
      },
      {
        id: 'dental-insurance',
        name: 'Dental Insurance',
        value: Math.round(productsRevenue * 0.02),
        color: professionalColors.revenueColors[16],
        percentage: 2,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.02 * 0.2),
          Retail: Math.round(productsRevenue * 0.02 * 0.7),
          Affinity: Math.round(productsRevenue * 0.02 * 0.1),
        },
      },
      {
        id: 'vision-insurance',
        name: 'Vision Insurance',
        value: Math.round(productsRevenue * 0.015),
        color: professionalColors.revenueColors[17],
        percentage: 1.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.015 * 0.15),
          Retail: Math.round(productsRevenue * 0.015 * 0.75),
          Affinity: Math.round(productsRevenue * 0.015 * 0.1),
        },
      },
      {
        id: 'aviation-insurance',
        name: 'Aviation Insurance',
        value: Math.round(productsRevenue * 0.035),
        color: professionalColors.revenueColors[18],
        percentage: 3.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.035 * 0.75),
          Retail: Math.round(productsRevenue * 0.035 * 0.15),
          Affinity: Math.round(productsRevenue * 0.035 * 0.1),
        },
      },
      {
        id: 'home-insurance',
        name: 'Home Insurance',
        value: Math.round(productsRevenue * 0.05),
        color: professionalColors.revenueColors[19],
        percentage: 5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.05 * 0.25),
          Retail: Math.round(productsRevenue * 0.05 * 0.6),
          Affinity: Math.round(productsRevenue * 0.05 * 0.15),
        },
      },
      {
        id: 'gadget-insurance',
        name: 'Gadget Insurance',
        value: Math.round(productsRevenue * 0.025),
        color: professionalColors.revenueColors[20],
        percentage: 2.5,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.025 * 0.1),
          Retail: Math.round(productsRevenue * 0.025 * 0.8),
          Affinity: Math.round(productsRevenue * 0.025 * 0.1),
        },
      },
      {
        id: 'mutualfund-protection',
        name: 'Mutual Fund Protection',
        value: Math.round(productsRevenue * 0.03),
        color: professionalColors.revenueColors[21],
        percentage: 3,
        clientTypes: {
          Corporate: Math.round(productsRevenue * 0.03 * 0.4),
          Retail: Math.round(productsRevenue * 0.03 * 0.5),
          Affinity: Math.round(productsRevenue * 0.03 * 0.1),
        },
      },
    ],
    crossSellPenetration: [
      {
        id: 'health-motor',
        name: 'Health + Motor',
        value: Math.round(totalCustomers * 0.285),
        color: professionalColors.revenueColors[0],
        percentage: 28.5,
      },
      {
        id: 'life-health',
        name: 'Life + Health',
        value: Math.round(totalCustomers * 0.245),
        color: professionalColors.revenueColors[1],
        percentage: 24.5,
      },
      {
        id: 'motor-travel',
        name: 'Motor + Travel',
        value: Math.round(totalCustomers * 0.185),
        color: professionalColors.revenueColors[2],
        percentage: 18.5,
      },
      {
        id: 'health-travel',
        name: 'Health + Travel',
        value: Math.round(totalCustomers * 0.125),
        color: professionalColors.revenueColors[3],
        percentage: 12.5,
      },
      {
        id: 'life-motor',
        name: 'Life + Motor',
        value: Math.round(totalCustomers * 0.095),
        color: professionalColors.revenueColors[4],
        percentage: 9.5,
      },
      {
        id: 'property-motor',
        name: 'Property + Motor',
        value: Math.round(totalCustomers * 0.065),
        color: professionalColors.revenueColors[5],
        percentage: 6.5,
      },
    ],
    expenseData: expenseCategories.map((category, index) => ({
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
  expenseData: revenueData.expenseData,
  tableData: revenueData.tableData,
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

export default revenueSlice.reducer;
