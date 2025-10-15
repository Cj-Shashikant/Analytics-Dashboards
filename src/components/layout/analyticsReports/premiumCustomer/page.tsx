import React from 'react';
import { Users, DollarSign, Award, TrendingUp } from 'lucide-react';
import { DonutChart } from '../../chartSection/charts/dount/page';
import { BarChartComponent } from '../../chartSection/charts/bar/page';

interface PremiumContributionProps {
  valueUnit: string;
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  onPlayFullView?: (filters: any, chartData: any, chartType?: string) => void;
}

export function PremiumContribution({ valueUnit }: PremiumContributionProps) {
  const getFormattedValue = (value: number) => {
    if (valueUnit === 'Crore') {
      return `₹${(value / 10000000).toFixed(2)}`;
    } else if (valueUnit === 'Lakh') {
      return `₹${(value / 100000).toFixed(2)}`;
    } else if (valueUnit === 'Thousands') {
      return `₹${(value / 1000).toFixed(2)}`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Professional color palette for customer analytics
  const colors = {
    primary: '#3B82F6',
    secondary: '#10B981',
    tertiary: '#F59E0B',
    quaternary: '#8B5CF6',
    quinternary: '#EF4444',
    gradient: [
      '#3B82F6',
      '#10B981',
      '#F59E0B',
      '#8B5CF6',
      '#EF4444',
      '#06B6D4',
      '#F97316',
      '#84CC16',
    ],
  };

  const getPremiumContributionData = () => ({
    totalCustomers: 8000,
    totalPremium: 66000000000, // 660 Crores
    concentrationRisk: 72.5,
    customerTiers: [
      {
        tier: 'High Value',
        customers: 400,
        percentage: 5.0,
        avgPremium: 2500000,
        totalPremium: 10000000000,
        contributionPercentage: 15.2,
        growthRate: 8.5,
        retentionRate: 95.2,
        color: colors.quinternary,
      },
      {
        tier: 'Mid Value',
        customers: 1200,
        percentage: 15.0,
        avgPremium: 1250000,
        totalPremium: 15000000000,
        contributionPercentage: 22.7,
        growthRate: 12.3,
        retentionRate: 89.4,
        color: colors.quaternary,
      },
      {
        tier: 'Standard',
        customers: 2400,
        percentage: 30.0,
        avgPremium: 750000,
        totalPremium: 18000000000,
        contributionPercentage: 27.3,
        growthRate: 15.7,
        retentionRate: 82.1,
        color: colors.tertiary,
      },
      {
        tier: 'Basic',
        customers: 4000,
        percentage: 50.0,
        avgPremium: 575000,
        totalPremium: 23000000000,
        contributionPercentage: 34.8,
        growthRate: 18.9,
        retentionRate: 76.8,
        color: colors.primary,
      },
    ],
    topContributors: [
      {
        name: 'Reliance Industries Ltd.',
        premium: 45000000,
        segment: 'Corporate',
        products: 8,
        tenure: '12 years',
      },
      {
        name: 'Tata Steel Limited',
        premium: 38000000,
        segment: 'Corporate',
        products: 6,
        tenure: '15 years',
      },
      {
        name: 'HDFC Bank Ltd.',
        premium: 32000000,
        segment: 'Corporate',
        products: 7,
        tenure: '10 years',
      },
      {
        name: 'Infosys Limited',
        premium: 28000000,
        segment: 'Corporate',
        products: 5,
        tenure: '8 years',
      },
      {
        name: 'Wipro Limited',
        premium: 25000000,
        segment: 'Corporate',
        products: 4,
        tenure: '11 years',
      },
      {
        name: 'Bajaj Auto Ltd.',
        premium: 22000000,
        segment: 'Corporate',
        products: 6,
        tenure: '9 years',
      },
      {
        name: 'Mahindra Group',
        premium: 20000000,
        segment: 'Corporate',
        products: 5,
        tenure: '7 years',
      },
      {
        name: 'Asian Paints Ltd.',
        premium: 18000000,
        segment: 'Corporate',
        products: 4,
        tenure: '6 years',
      },
      {
        name: "Dr. Reddy's Labs",
        premium: 16000000,
        segment: 'Corporate',
        products: 3,
        tenure: '5 years',
      },
      {
        name: 'Godrej Industries',
        premium: 15000000,
        segment: 'Corporate',
        products: 4,
        tenure: '8 years',
      },
    ],
    insights: {
      paretoAnalysis: {
        premiumContribution: 68.2,
        customerPercentage: 20,
      },
    },
  });

  const premiumData = getPremiumContributionData();

  return (
    <div className="space-y-8">
      {/* Customer Tier Summary Cards */}
      <div className="grid grid-cols-4 lg:grid-cols-4 gap-4">
        {premiumData.customerTiers.map((tier, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: tier.color }}
              />
              <span className="font-medium text-gray-900">{tier.tier}</span>
            </div>
            <div className="space-y-2">
              <div
                className="text-2xl font-semibold"
                style={{ color: tier.color }}
              >
                {tier.customers.toLocaleString()}
              </div>
              <div className="text-xs text-gray-600">
                {tier.percentage}% of customers
              </div>
              <div className="text-sm font-medium text-gray-700">
                {getFormattedValue(tier.avgPremium)} avg premium
              </div>
              {tier.contributionPercentage > 0 && (
                <div className="text-xs text-green-600 font-medium">
                  {tier.contributionPercentage}% of total premium
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Premium Contribution by Customer Analysis
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Customer value segmentation with premium contribution insights and
              growth opportunities
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">
                {premiumData.totalCustomers.toLocaleString()} Total Customers
              </span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-700">
                {getFormattedValue(premiumData.totalPremium)} Total Premium
              </span>
            </div>
          </div>
        </div>

        {/* Main Charts */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Customer Distribution by Value Tier */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Award className="h-5 w-5 text-red-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900">
                Customer Distribution by Value Tier
              </h4>
            </div>
            <div style={{ height: '300px' }}>
              <DonutChart
                data={premiumData.customerTiers.map(tier => ({
                  id: tier.tier.toLowerCase().replace(' ', '-'),
                  name: tier.tier,
                  value: tier.customers,
                  color: tier.color,
                  percentage: tier.percentage,
                  description: `Avg Premium: ${getFormattedValue(tier.avgPremium)}, Growth: ${tier.growthRate}%, Retention: ${tier.retentionRate}%`,
                }))}
                valueFormatter={value => `${value.toLocaleString()} customers`}
                valueUnit={
                  valueUnit === 'Crore'
                    ? 'Cr'
                    : valueUnit === 'Lakh'
                      ? 'L'
                      : 'K'
                }
                onSegmentClick={data => console.log('Clicked segment:', data)}
              />
            </div>
          </div>

          {/* Premium Contribution Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Premium Contribution vs Customer Count
              </h4>
            </div>
            <div style={{ height: '300px' }}>
              <BarChartComponent
                data={premiumData.customerTiers.map(tier => ({
                  name: tier.tier,
                  value: tier.contributionPercentage,
                  fullName: `${tier.tier} (${tier.customers.toLocaleString()} customers)`,
                  totalPremium: tier.totalPremium,
                  percentage: tier.percentage,
                  customers: tier.customers,
                }))}
                dataKey="value"
                nameKey="name"
                color={colors.primary}
                valueFormatter={value => `${value.toFixed(1)}%`}
                onBarClick={(data, index) =>
                  console.log('Clicked bar:', data, index)
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Top Contributors Table */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Top 10 Premium Contributors
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Rank
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Customer Name
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Annual Premium
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Segment
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Products
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Tenure
                </th>
                <th className="text-left py-2 text-sm font-medium text-gray-600">
                  Contribution
                </th>
              </tr>
            </thead>
            <tbody>
              {premiumData.topContributors.map((customer, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {index + 1}
                  </td>
                  <td className="py-3 text-sm text-gray-900">
                    {customer.name}
                  </td>
                  <td className="py-3 text-sm font-medium text-green-600">
                    {getFormattedValue(customer.premium)}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {customer.segment}
                  </td>
                  <td className="py-3 text-sm text-red-600">
                    {customer.products}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {customer.tenure}
                  </td>
                  <td className="py-3 text-sm font-medium text-blue-600">
                    {(
                      (customer.premium / premiumData.totalPremium) *
                      100
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Executive Insights */}
      {/* <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-medium text-gray-900 mb-4">
          Strategic Insights & Recommendations
        </h4>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h5 className="font-medium text-blue-800">🎯 Concentration Risk</h5>
            <ul className="text-sm space-y-1">
              <li className="text-gray-600">
                • Top 20% customers:{' '}
                {premiumData.insights.paretoAnalysis.premiumContribution}% of
                premium
              </li>
              <li className="text-gray-600">
                • High concentration risk at {premiumData.concentrationRisk}%
              </li>
              <li className="text-gray-600">
                • Diversification strategy needed
              </li>
              <li className="text-gray-600">
                • Monitor top 10 customer retention closely
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-medium text-green-800">
              💰 Growth Opportunities
            </h5>
            <ul className="text-sm space-y-1">
              <li className="text-gray-600">
                • Standard → Mid Value: ₹4.56Cr potential
              </li>
              <li className="text-gray-600">
                • Basic → Standard: ₹2.75Cr potential
              </li>
              <li className="text-gray-600">
                • Total upgrade opportunity: ₹7.31Cr
              </li>
              <li className="text-gray-600">
                • Focus on customer value progression
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-medium text-purple-800">🔄 Action Plan</h5>
            <ul className="text-sm space-y-1">
              <li className="text-gray-600">
                • VIP treatment for High Value tier
              </li>
              <li className="text-gray-600">
                • Upgrade campaigns for Mid Value
              </li>
              <li className="text-gray-600">
                • Cross-sell to Standard customers
              </li>
              <li className="text-gray-600">
                • Retention programs for all tiers
              </li>
            </ul>
          </div>
        </div>
      </div> */}
    </div>
  );
}
