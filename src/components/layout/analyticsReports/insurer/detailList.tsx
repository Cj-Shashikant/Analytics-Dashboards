import React, { useState, useMemo } from 'react';
import { productsListStyles } from './style';
import { Card } from '../../../ui/card';
import { getFormattedValue as utilGetFormattedValue } from '@/utils/valueFormatter';

interface Insurer {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  description?: string;
  policies?: number;
  premium?: number;
  revenuePercentage?: number;
}

interface InsurersListProps {
  data: Insurer[];
  valueUnit: 'K' | 'L' | 'Cr';
  onItemClick?: (insurer: Insurer) => void;
  selectedReportType?: string;
  className?: string;
}

type SortState = 'none' | 'desc' | 'asc';
type SortColumn = 'policies' | 'premium' | 'revenue' | 'revenuePercentage';

export function InsurersList({
  data,
  valueUnit,
  onItemClick,
}: InsurersListProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

  // Generate mock policy numbers for each insurer
  const getPolicyCount = (index: number) => {
    const baseCounts = [
      33300, 27360, 23040, 16740, 12780, 8950, 7200, 6100, 5400, 4800, 4200,
      3600, 3100, 2700, 2300,
    ];
    return (
      baseCounts[index % baseCounts.length] ||
      Math.floor(Math.random() * 10000) + 1000
    );
  };

  // Handle sort click
  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      // Cycle through states: none -> desc -> asc -> none
      if (sortState === 'none') {
        setSortState('desc');
      } else if (sortState === 'desc') {
        setSortState('asc');
      } else {
        setSortState('none');
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortState('desc');
    }
  };

  // Local getFormattedValue function
  const getFormattedValue = (value: number) => {
    return utilGetFormattedValue(value, valueUnit);
  };

  // Sort insurers based on current sort state - moved before early return
  const sortedInsurers = useMemo(() => {
    // Add null check for data prop inside useMemo
    if (!data || !Array.isArray(data)) {
      return [];
    }

    if (!sortColumn || sortState === 'none') {
      return data;
    }

    return [...data].sort((a: Insurer, b: Insurer) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = a.policies || getPolicyCount(data.indexOf(a));
          bValue = b.policies || getPolicyCount(data.indexOf(b));
          break;
        case 'premium':
          aValue = a.premium || a.value;
          bValue = b.premium || b.value;
          break;
        case 'revenue':
          aValue = a.value;
          bValue = b.value;
          break;
        case 'revenuePercentage':
          aValue = a.revenuePercentage || a.percentage;
          bValue = b.revenuePercentage || b.percentage;
          break;
        default:
          return 0;
      }

      if (sortState === 'desc') {
        return bValue - aValue; // High to low
      } else {
        return aValue - bValue; // Low to high
      }
    });
  }, [data, sortColumn, sortState]);

  // Early return moved after all hooks
  if (!data || !Array.isArray(data)) {
    return (
      <Card className={productsListStyles.container}>
        <div className="p-4 text-center text-gray-500">No data available</div>
      </Card>
    );
  }

  // Get SVG color based on sort state
  const getSvgColor = (column: SortColumn) => {
    if (sortColumn !== column) return 'currentColor';
    if (sortState === 'desc') return '#22c55e'; // Green for high to low
    if (sortState === 'asc') return '#ef4444'; // Red for low to high
    return 'currentColor'; // Default
  };

  // Get SVG rotation based on sort state
  const getSvgRotation = (column: SortColumn) => {
    if (sortColumn !== column || sortState === 'none') return '';
    if (sortState === 'asc') return 'rotate-180';
    return '';
  };

  return (
    <Card className={productsListStyles.container}>
      <div className="overflow-auto relative" style={{ height: '31rem' }}>
        {/* Sticky Table Header */}
        <div
          className={`${productsListStyles.table.headerRow} sticky top-0 z-20 bg-white`}
          style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr' }}
        >
          {/* Sticky Insurer Header */}
          <div
            className={`${productsListStyles.table.headerCell} sticky flex items-center justify-center`}
          >
            Insurer
          </div>

          {/* Sortable Headers */}
          <div
            className={`${productsListStyles.table.headerCellCenter} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors flex items-center justify-center`}
            onClick={() => handleSort('policies')}
          >
            <span className="mr-1">No.of Policies</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('policies')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('policies')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>

          <div
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('premium')}
          >
            <span className="mr-1">Premium</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('premium')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('premium')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>

          <div
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('revenue')}
          >
            <span className="mr-1">Revenue</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('revenue')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('revenue')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>

          <div
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('revenuePercentage')}
          >
            <span className="mr-1">Revenue %</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('revenuePercentage')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('revenuePercentage')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className={productsListStyles.table.body}>
          {sortedInsurers.map(insurer => {
            const originalIndex = data.findIndex(p => p.id === insurer.id);
            const policyCount =
              insurer.policies || getPolicyCount(originalIndex);

            return (
              <div
                key={insurer.id}
                onClick={() => onItemClick?.(insurer)}
                className={productsListStyles.productRow.container}
                style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr' }}
              >
                {/* Sticky Product Column */}
                <div
                  className={`${productsListStyles.productRow.productColumn} sticky`}
                >
                  <div
                    className={productsListStyles.productRow.colorIndicator}
                    style={{ backgroundColor: insurer.color }}
                  />
                  <div className={productsListStyles.productRow.productInfo}>
                    <div className={productsListStyles.productRow.productName}>
                      {insurer.name}
                    </div>
                    <div
                      className={
                        productsListStyles.productRow.productDescription
                      }
                    >
                      {insurer.description}
                    </div>
                  </div>
                </div>

                {/* No. of Policies Column */}
                <div className={productsListStyles.productRow.centerColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {policyCount.toLocaleString()}
                  </div>
                </div>

                {/* Premium Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(insurer.premium || insurer.value)}
                  </div>
                </div>

                {/* Revenue Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(insurer.value)}
                  </div>
                </div>

                {/* Revenue Percentage Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {(insurer.revenuePercentage || insurer.percentage).toFixed(
                      2
                    )}
                    %
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
