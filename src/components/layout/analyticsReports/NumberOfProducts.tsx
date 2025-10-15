import React, { useState, useEffect } from 'react';
import { Package } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ThreeDotsMenu } from '../ThreeDotsMenu';
import { commonStyles, topFilterOptions } from '../commonStyle';

type ChartType = 'donut' | 'bar' | 'line' | 'stackedBar' | 'table';

interface NumberOfProductsProps {
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
  // Auto-zoom props
  autoZoomActive?: boolean;
  currentFocusedElement?: number;
  onTotalElementsChange?: (count: number) => void;
  selectedXAxis?: string;
  selectedYAxis?: string;
}

export function NumberOfProducts({
  valueUnit,
  currentFilters,
  onPlayFullView,
  // Auto-zoom props
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
  selectedXAxis,
  selectedYAxis,
}: NumberOfProductsProps) {
  const [topFilter, setTopFilter] = useState<string>('Top 10');
  const [chartType, setChartType] = useState<ChartType>('donut');

  // Professional color palette matching other chart components
  const professionalColors = [
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
  ];

  // Enhanced product data with more entries for better table display
  const allProductData = [
    {
      id: 'single-product',
      name: 'Single Product',
      value: 4800,
      percentage: 60.0,
      avgPremium: 45000,
      color: professionalColors[0],
    },
    {
      id: 'two-products',
      name: 'Two Products',
      value: 2000,
      percentage: 25.0,
      avgPremium: 85000,
      color: professionalColors[1],
    },
    {
      id: 'three-products',
      name: 'Three Products',
      value: 800,
      percentage: 10.0,
      avgPremium: 125000,
      color: professionalColors[2],
    },
    {
      id: 'four-products',
      name: 'Four Products',
      value: 320,
      percentage: 4.0,
      avgPremium: 165000,
      color: professionalColors[3],
    },
    {
      id: 'five-products',
      name: 'Five Products',
      value: 64,
      percentage: 0.8,
      avgPremium: 205000,
      color: professionalColors[4],
    },
    {
      id: 'six-plus-products',
      name: 'Six+ Products',
      value: 16,
      percentage: 0.2,
      avgPremium: 245000,
      color: professionalColors[5],
    },
  ];

  // Get filtered data based on the top filter dropdown
  const getFilteredProductsData = () => {
    const totalCategories = allProductData.length;

    // Determine how many categories to show based on selection
    let categoriesToShow = 10; // default
    if (topFilter === 'Top 5') {
      categoriesToShow = 5;
    } else if (topFilter === 'Top 10') {
      categoriesToShow = 10;
    } else if (topFilter === 'Top 15') {
      categoriesToShow = 15;
    } else if (topFilter === 'Top 20') {
      categoriesToShow = 20;
    } else if (topFilter === 'Top 30') {
      categoriesToShow = 30;
    } else if (topFilter === 'Top 50') {
      categoriesToShow = 50;
    } else if (topFilter === 'All') {
      categoriesToShow = totalCategories;
    }

    // If we're showing all or the selection is more than available categories
    if (categoriesToShow >= totalCategories) {
      return {
        chartData: allProductData,
        remainingData: [],
        shouldShowTopText: false,
        chartTitle: `All Product Categories`,
      };
    } else {
      // Show only the selected number of top categories
      return {
        chartData: allProductData.slice(0, categoriesToShow),
        remainingData: allProductData.slice(categoriesToShow),
        shouldShowTopText: true,
        chartTitle: `${topFilter} Product Categories`,
      };
    }
  };

  const filteredData = getFilteredProductsData();
  const chartData = filteredData.chartData;
  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0);

  // Auto-zoom functionality
  useEffect(() => {
    if (onTotalElementsChange) {
      // Report total number of elements for auto-zoom
      onTotalElementsChange(chartData.length);
    }
  }, [chartData.length, onTotalElementsChange]);

  // Get focused element data for highlighting
  const getFocusedElement = () => {
    if (autoZoomActive && currentFocusedElement < chartData.length) {
      return chartData[currentFocusedElement];
    }
    return null;
  };

  const focusedElement = getFocusedElement();

  const getFormattedValue = (value: number) => {
    // For customer counts, just return the number
    return value.toLocaleString('en-IN');
  };

  const getFormattedTotal = (value: number) => {
    const number = (value / 1000).toFixed(0);
    const unit = 'customers';
    return (
      <div className="text-center">
        <div>{number}K</div>
        <div className="text-xs">{unit}</div>
      </div>
    );
  };

  // Handle chart interactions
  const handleSegmentClick = (segment: any) => {
    console.log('Segment clicked:', segment);
  };

  // Enhanced custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-50 pointer-events-none">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {getFormattedValue(data.value)} customers ({data.percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  // Enhanced donut chart with auto-zoom magnification
  const renderEnhancedDonut = (
    data: any[],
    size: { width: number; height: number },
    total: number,
    isPresentation = false
  ) => {
    const presentationMultiplier = isPresentation ? 1.4 : 1.0;
    const outerRadiusMultiplier = isPresentation ? 0.38 : 0.32;
    const innerRadiusMultiplier = isPresentation ? 0.2 : 0.18;
    const labelDistance = isPresentation ? 45 : 30;

    // Auto-zoom magnification - increase outer radius for focused element
    const focusedOuterRadiusMultiplier =
      autoZoomActive && focusedElement
        ? outerRadiusMultiplier + 0.08
        : outerRadiusMultiplier;

    // Calculate background circle size based on inner radius
    const backgroundRadius =
      Math.min(size.width, size.height) * innerRadiusMultiplier * 0.85;

    return (
      <div
        className="relative"
        style={{ width: size.width, height: size.height }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {/* SVG Filters for Auto-Zoom Effects */}
            <defs>
              <filter
                id="magnifyGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({
                cx,
                cy,
                midAngle,
                innerRadius,
                outerRadius,
                percent,
                index,
                payload,
              }: {
                cx: number;
                cy: number;
                midAngle: number;
                innerRadius: number;
                outerRadius: number;
                percent: number;
                index: number;
                payload: any;
              }) => {
                const RADIAN = Math.PI / 180;
                const radius = outerRadius + labelDistance;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                const isFocused =
                  focusedElement && payload.id === focusedElement.id;
                const isAutoZooming = autoZoomActive && focusedElement;

                return (
                  <text
                    x={x}
                    y={y}
                    fill={
                      isFocused
                        ? '#3B82F6'
                        : isAutoZooming
                          ? '#9CA3AF'
                          : '#374151'
                    }
                    textAnchor={x > cx ? 'start' : 'end'}
                    dominantBaseline="central"
                    className={
                      isFocused
                        ? 'text-sm transition-all duration-500 font-bold'
                        : 'text-sm transition-all duration-500 font-medium'
                    }
                    fontSize={isFocused ? '16' : '14'}
                  >
                    {isFocused
                      ? `● ${(percent * 100).toFixed(0)}% ●`
                      : `${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              outerRadius={
                Math.min(size.width, size.height) * focusedOuterRadiusMultiplier
              }
              innerRadius={
                Math.min(size.width, size.height) * innerRadiusMultiplier
              }
              paddingAngle={2}
              cornerRadius={8}
              dataKey="value"
              onClick={handleSegmentClick}
              stroke="#ffffff"
              strokeWidth={2}
            >
              {data.map((entry, index) => {
                const isFocused =
                  focusedElement && entry.id === focusedElement.id;
                const isAutoZooming = autoZoomActive && focusedElement;

                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    className={
                      isFocused
                        ? 'cursor-pointer transition-all duration-500 drop-shadow-lg'
                        : 'cursor-pointer transition-all duration-500 hover:opacity-90'
                    }
                    fillOpacity={isAutoZooming ? (isFocused ? 1.0 : 0.2) : 1.0}
                    stroke={isFocused ? '#3B82F6' : '#ffffff'}
                    strokeWidth={isFocused ? 8 : 2}
                    filter={isFocused ? 'url(#magnifyGlow)' : undefined}
                  />
                );
              })}
            </Pie>
            <Tooltip
              content={CustomTooltip}
              position={{
                x: size.width / 2,
                y:
                  Math.min(size.height, size.width) * innerRadiusMultiplier -
                  50,
              }}
              offset={0}
              allowEscapeViewBox={{ x: false, y: false }}
              wrapperStyle={{
                zIndex: 1000,
                transform: 'translateX(-50%)',
                pointerEvents: 'none',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Round background for center label */}
        <div
          className="absolute bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center pointer-events-none"
          style={{
            width: backgroundRadius * 2,
            height: backgroundRadius * 2,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="text-center">
            {focusedElement ? (
              <div className="animate-pulse">
                <div className="text-sm font-semibold text-blue-600 mb-1 text-center">
                  {focusedElement.name}
                </div>
                <div className="text-2xl font-bold text-gray-900 text-center mb-1">
                  {getFormattedValue(focusedElement.value)}
                </div>
                <div className="text-base font-semibold text-blue-500 text-center mb-2">
                  {focusedElement.percentage}%
                </div>
                <div className="text-xs text-blue-400 text-center mt-2 font-medium">
                  ● FOCUSED ●
                </div>
              </div>
            ) : (
              <div className="text-2xl font-semibold text-gray-900">
                {getFormattedTotal(total)}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              const data = payload[0].payload;
              return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                  <p className="font-medium text-gray-900">{label}</p>
                  <p className="text-sm text-gray-600">
                    Customers: {data.value.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    Percentage: {data.percentage}%
                  </p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderChart = () => {
    const size = { width: 400, height: 300 };
    switch (chartType) {
      case 'donut':
        return renderEnhancedDonut(chartData, size, totalValue);
      case 'bar':
        return renderBarChart();
      default:
        return renderEnhancedDonut(chartData, size, totalValue);
    }
  };

  const renderDataTable = () => (
    <div className={commonStyles.dataTableScrollable}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-3 border-b text-sm font-medium text-gray-900">
              Product Category
            </th>
            <th className="text-right p-3 border-b text-sm font-medium text-gray-900">
              No. of Customers
            </th>
            <th className="text-right p-3 border-b text-sm font-medium text-gray-900">
              Percentage
            </th>
            <th className="text-right p-3 border-b text-sm font-medium text-gray-900">
              Avg Premium
            </th>
          </tr>
        </thead>
        <tbody>
          {chartData.map((item, index) => {
            const isFocused = focusedElement && item.id === focusedElement.id;
            const isAutoZooming = autoZoomActive && focusedElement;

            return (
              <tr
                key={item.id}
                className={
                  isFocused
                    ? 'cursor-pointer transition-all duration-500 bg-blue-50 border-l-4 border-blue-500'
                    : isAutoZooming
                      ? 'cursor-pointer transition-all duration-500 opacity-30 hover:bg-gray-50'
                      : 'cursor-pointer transition-all duration-500 hover:bg-gray-50'
                }
                onClick={() => handleSegmentClick(item)}
              >
                <td className="p-3 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-900 text-sm">
                      {item.name}
                    </span>
                  </div>
                </td>
                <td className="text-right p-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900 text-sm">
                    {item.value.toLocaleString()}
                  </span>
                </td>
                <td className="text-right p-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900 text-sm">
                    {item.percentage}%
                  </span>
                </td>
                <td className="text-right p-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900 text-sm">
                    ₹{item.avgPremium.toLocaleString()}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  const handleDownload = (format: string) => {
    console.log(`Downloading ${format} format`);
  };

  const handlePresentationMode = () => {
    console.log('Entering presentation mode');
  };

  return (
    <div className={commonStyles.container}>
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Chart Container */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            {/* Chart Header */}
            <div className={commonStyles.chartHeader}>
              <div className={commonStyles.chartTitleContainer}>
                <h3 className={commonStyles.chartTitle}>
                  Number of Products per Customer
                </h3>
                <p className={commonStyles.chartSubtitle}>
                  Distribution of customers by product holdings
                </p>
              </div>
              <div className={commonStyles.chartControls}>
                <Select value={topFilter} onValueChange={setTopFilter}>
                  <SelectTrigger className={commonStyles.selectTrigger}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {topFilterOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ThreeDotsMenu
                  currentChartType={chartType}
                  onChartTypeChange={setChartType}
                  onDownload={handleDownload}
                  onPresentationMode={handlePresentationMode}
                />
              </div>
            </div>

            {/* Chart Container */}
            <div className={commonStyles.chartContainer}>
              <div className={commonStyles.chartWrapper}>{renderChart()}</div>
            </div>
          </Card>
        </div>

        {/* Right Section - Data Table */}
        <div className={commonStyles.rightSection}>
          <Card className={commonStyles.dataTableCard}>
            {/* Data Table Header */}
            <div className={commonStyles.dataTableHeader}>
              <div className={commonStyles.dataTableTitleContainer}>
                <h3 className={commonStyles.dataTableTitle}>
                  Product Holdings Data
                </h3>
                <p className={commonStyles.dataTableSubtitle}>
                  Detailed breakdown of customer product distribution
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">
                  Avg: 1.6 products
                </span>
              </div>
            </div>

            {/* Data Table Container */}
            <div className={commonStyles.dataTableContainer}>
              {renderDataTable()}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
