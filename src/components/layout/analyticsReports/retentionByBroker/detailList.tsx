import React, { useState, useMemo } from 'react';
import { productsListStyles } from './style';
import { Card } from '../../../ui/card';
import { getFormattedValue as utilGetFormattedValue } from '@/utils/valueFormatter';

interface Product {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  premium?: number;
  policies?: number;
  description?: string;
}

interface ProductsListProps {
  data: Product[];
  valueUnit: 'K' | 'L' | 'Cr';
  onItemClick?: (product: Product) => void;
  selectedReportType?: string;
}

type SortState = 'none' | 'desc' | 'asc';
type SortColumn = 'policies' | 'amount' | 'revenue' | 'percentage';

export function ProductsList({
  data,
  valueUnit,
  onItemClick,
}: ProductsListProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

  // Generate mock policy numbers for each product
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

  // Add formatPremium function
  const formatPremium = (premium: number) => {
    return utilGetFormattedValue(premium, valueUnit);
  };

  // Add null check for data prop
  if (!data || !Array.isArray(data)) {
    return (
      <Card className={productsListStyles.container}>
        <div className="p-4 text-center text-gray-500">No data available</div>
      </Card>
    );
  }

  // Local getFormattedValue function
  const getFormattedValue = (value: number) => {
    return utilGetFormattedValue(value, valueUnit);
  };

  // Sort products based on current sort state
  const sortedProducts = useMemo(() => {
    if (!sortColumn || sortState === 'none') {
      return data;
    }

    return [...data].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = getPolicyCount(data.indexOf(a));
          bValue = getPolicyCount(data.indexOf(b));
          break;
        case 'amount':
        case 'revenue':
          aValue = a.value;
          bValue = b.value;
          break;
        default:
          return 0;
      }

      if (sortState === 'desc') {
        return bValue - aValue;
      } else {
        return aValue - bValue;
      }
    });
  }, [data, sortColumn, sortState]);

  // Get SVG color based on sort state
  const getSvgColor = (column: SortColumn) => {
    if (sortColumn !== column) return 'currentColor';
    if (sortState === 'desc') return '#22c55e';
    if (sortState === 'asc') return '#ef4444';
    return 'currentColor';
  };

  // Get SVG rotation based on sort state
  const getSvgRotation = (column: SortColumn) => {
    if (sortColumn !== column || sortState === 'none') return '';
    if (sortState === 'asc') return 'rotate-180';
    return '';
  };

  return (
    <Card className={productsListStyles.container}>
      <div className="overflow-auto relative" style={{ height: '26rem' }}>
        {/* Table Header */}
        <div
          className={`${productsListStyles.table.headerRow} sticky top-0 z-20 bg-white`}
          style={{ gridTemplateColumns: '2fr 1fr' }}
        >
          <div
            className={`${productsListStyles.table.headerCell} sticky flex items-center justify-center`}
          >
            Category
          </div>

          <div
            className={`${productsListStyles.table.headerCellRight} cursor-pointer hover:bg-gray-100 px-2 py-2 rounded transition-colors justify-center`}
            onClick={() => handleSort('percentage')}
          >
            <span className="mr-1">Percentage</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('percentage')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('percentage')}`}
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Table Body */}
        <div className={productsListStyles.table.body}>
          {sortedProducts.map(product => {
            return (
              <div
                key={product.id}
                className="grid grid-cols-2 gap-4 p-3 hover:bg-gray-50 transition-colors border-b border-gray-100"
              >
                <div className="flex items-start space-x-3">
                  <div
                    className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                    style={{ backgroundColor: product.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {product.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {product.policies} policies
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">
                    {product.percentage}%
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatPremium(product.premium || product.value)}
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
