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
  policies: number;
  description?: string;
}

interface ProductsListProps {
  data: Product[];
  valueUnit: 'K' | 'L' | 'Cr';
  onItemClick?: (product: Product) => void;
  selectedReportType?: string;
  containerType?: 'revenue' | 'expense';
}

type SortState = 'none' | 'desc' | 'asc';
type SortColumn = 'policies' | 'amount' | 'revenue';

export function ProductsList({
  data,
  valueUnit,
  onItemClick,
}: ProductsListProps) {
  const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
  const [sortState, setSortState] = useState<SortState>('none');

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

  // Local getFormattedValue function
  const getFormattedValue = (value: number) => {
    return utilGetFormattedValue(value, valueUnit);
  };

  // Sort products based on current sort state - moved before early return
  const sortedProducts = useMemo(() => {
    if (!data || !Array.isArray(data) || !sortColumn || sortState === 'none') {
      return data || [];
    }

    return [...data].sort((a, b) => {
      let aValue: number;
      let bValue: number;

      switch (sortColumn) {
        case 'policies':
          aValue = a.policies;
          bValue = b.policies;
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

  // Add null check for data prop - moved after hooks
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
      <div className="overflow-auto relative" style={{ height: '31rem' }}>
        {/* Table Header */}
        <div
          className={`${productsListStyles.table.headerRow} sticky top-0 z-20 bg-white`}
          style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr' }}
        >
          <div
            className={`${productsListStyles.table.headerCell} sticky flex items-center justify-center`}
          >
            Product
          </div>

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
            onClick={() => handleSort('amount')}
          >
            <span className="mr-1">Amount</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke={getSvgColor('amount')}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-all duration-200 ${getSvgRotation('amount')}`}
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
            className={`${productsListStyles.table.headerCellRight} flex items-center justify-center`}
          >
            Revenue%
          </div>
        </div>

        {/* Table Body */}
        <div className={productsListStyles.table.body}>
          {sortedProducts.map(product => {
            return (
              <div
                key={product.id}
                onClick={() => onItemClick?.(product)}
                className={productsListStyles.productRow.container}
                style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr' }}
              >
                {/* Product Column */}
                <div
                  className={`${productsListStyles.productRow.productColumn} sticky`}
                >
                  <div
                    className={productsListStyles.productRow.colorIndicator}
                    style={{ backgroundColor: product.color }}
                  />
                  <div className={productsListStyles.productRow.productInfo}>
                    <div className={productsListStyles.productRow.productName}>
                      {product.name}
                    </div>
                    <div
                      className={
                        productsListStyles.productRow.productDescription
                      }
                    >
                      {product.description ||
                        `${product.percentage.toFixed(1)}% of total revenue`}
                    </div>
                  </div>
                </div>

                {/* No. of Policies Column */}
                <div className={productsListStyles.productRow.centerColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {product.policies.toLocaleString()}
                  </div>
                </div>

                {/* Amount Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(product.value)}
                  </div>
                </div>

                {/* Revenue Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {getFormattedValue(product.value)}
                  </div>
                </div>

                {/* Revenue% Column */}
                <div className={productsListStyles.productRow.rightColumn}>
                  <div className={productsListStyles.productRow.cellValue}>
                    {product.percentage.toFixed(1)}%
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
