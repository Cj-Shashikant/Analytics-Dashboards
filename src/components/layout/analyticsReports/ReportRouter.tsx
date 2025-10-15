'use client';

import React from 'react';
import { useAppSelector } from '@/hooks/hooks';

// Import all the analytics report components
import ProductPage from './product/page';
import InsurerPage from './insurer/page';
import LOBPage from './lob/page';
import VerticalPage from './vertical/page';
import PolicyTypePage from './policyType/page';
import CrossCellPage from './cross-cell/page';
import RevenueVsExpenses from './revenueVsexpenses/page';
import RetentionInsurerPage from './retentionByInsurer/page';
import RetentionBrokerPage from './retentionByBroker/page';
import { DurationOfRelationship } from './relation/page';
import NumberOfProduct from './numberOfProduct/page';
import { PremiumContribution } from './premiumCustomer/page';
import { CustomerSatisfaction } from './customerNPS/page';
import { CrossSellUpsell } from './upsellPotential/page';

export default function ReportRouter() {
  const { selectedReportType } = useAppSelector(state => state.filter);

  // Map report types to their corresponding components
  const getReportComponent = () => {
    switch (selectedReportType) {
      case 'Revenue by Products':
        return <ProductPage />;
      case 'Revenue by Insurers':
        return <InsurerPage />;
      case 'Revenue by LOB':
        return <LOBPage />;
      case 'Revenue by Vertical':
        return <VerticalPage />;
      case 'Revenue by Policy Type':
        return <PolicyTypePage />;
      case 'Cross-Sell Penetration':
        return <CrossCellPage />;
      case 'Revenue vs Expenses':
        return <RevenueVsExpenses />;
      case 'Retention - By Insurer':
        return <RetentionInsurerPage />;
      case 'Retention - Broker':
        return <RetentionBrokerPage />;
      case 'Duration of Relationship':
        return <DurationOfRelationship />;
      case 'Number of Products Purchased':
        return <NumberOfProduct />;
      case 'Premium Contribution by Customer':
        return <PremiumContribution />;
      case 'Customer Satisfaction / NPS':
        return <CustomerSatisfaction />;
      case 'Cross-Sell / Upsell Potential':
        return <CrossSellUpsell />;

      default:
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <div className="text-gray-400 text-lg mb-2">📈</div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Select a Report Type
              </h3>
              <p className="text-sm text-gray-500">
                Choose a report type from the filter above to view analytics
              </p>
            </div>
          </div>
        );
    }
  };

  return <div className="w-full">{getReportComponent()}</div>;
}
