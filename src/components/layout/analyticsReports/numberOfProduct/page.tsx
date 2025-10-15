import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { selectNumberOfProducts } from '@/redux/slices/revenueSlice';
import { NumberOfProductsData } from '@/constants/interfaces/revenue';
import { Card } from '@/components/ui/card';
import {
  chartDimensions,
  topFilterOptions,
  getChartSubtitle,
  commonStyles,
} from './style';
import { getFormattedValue } from '@/utils/valueFormatter';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ShoppingBag } from 'lucide-react';
import { RevenueBreakdownCards } from '../../RevenueBreakdownCards';
import { ThreeDotsMenu } from '../../ThreeDotsMenu';
import { ChartType } from '../../ChartTypeSwitcher';
import { ProductsList } from './detailList';
import { ProductDetailsPanel } from '../../ProductDetailsPanel';

// Import existing chart components
import { DonutChart } from '../../chartSection/charts/dount/page';
import { BarChartComponent } from '../../chartSection/charts/bar/page';
import { LineChartComponent } from '../../chartSection/charts/line/page';
import { SimpleStackedBarChart } from '../../chartSection/charts/stacked/page';

interface ChartsSectionProps {
  valueUnit: string;
  selectedReportType?: string;
  chartType?: 'revenue' | 'expenses';
  baseMetricsData?: {
    totalRevenue: number;
    expenses: number;
    grossProfit: number;
  };
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  autoZoomActive?: boolean;
  currentFocusedElement?: number;
  onTotalElementsChange?: (count: number) => void;
}

export function ChartsSection({
  valueUnit: propValueUnit,
  selectedReportType = 'Number of Products',
  chartType,
  baseMetricsData,
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
}: ChartsSectionProps) {
  // Redux hooks
  const revenueState = useSelector((state: RootState) => state.revenue);
  const filterState = useSelector((state: RootState) => state.filter);
  const numberOfProductsData = useSelector(selectNumberOfProducts);

  // Use valueUnit from Redux state, fallback to prop if needed
  const valueUnit = filterState.valueUnit || propValueUnit || 'K';

  // Chart type switching capability
  const [chartTypeState, setChartTypeState] = useState<ChartType>('donut');

  // Top filter for all report types
  const [topFilter, setTopFilter] = useState<string>('Top 10');

  // Automatic chart switching: Convert donut to bar when Top > 15 is selected
  useEffect(() => {
    const topCount = parseInt(topFilter.replace('Top ', ''));
    if (topCount > 15 && chartTypeState === 'donut') {
      setChartTypeState('bar');
    }
  }, [topFilter, chartTypeState]);

  // Client types filter for Revenue by Products
  const [selectedClientTypes] = useState<string[]>([
    'Corporate',
    'Retail',
    'Affinity',
  ]);

  // Item details panel state
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);

  // Handle close panel
  const handleClosePanel = () => {
    setIsItemDetailsOpen(false);
    setSelectedItem(null);
  };

  // Local value formatting functions using the utility
  const getFormattedValueLocal = (value: number) => {
    // For Number of Products, show customer counts instead of revenue
    return value.toLocaleString('en-IN');
  };

  // Get metrics data from Redux or fallback
  const getMetricsData = () => {
    if (baseMetricsData) {
      return baseMetricsData;
    }

    // Use Redux base metrics
    const baseMetrics = revenueState.baseMetrics;

    // Adjust values slightly based on report type
    const adjustmentFactor =
      selectedReportType === 'Revenue by Products'
        ? 1.0
        : selectedReportType === 'Revenue by Insurers'
          ? 0.95
          : selectedReportType === 'Revenue by Policy Type'
            ? 1.08
            : selectedReportType === 'Revenue by Vertical'
              ? 0.96
              : selectedReportType === 'Revenue by LOB'
                ? 1.02
                : 0.92;

    return {
      totalRevenue: baseMetrics.totalRevenue * adjustmentFactor,
      expenses: baseMetrics.expenses * adjustmentFactor,
      grossProfit: baseMetrics.grossProfit * adjustmentFactor,
    };
  };

  const metricsData = getMetricsData();

  // Get data - NumberOfProduct folder specifically uses numberOfProducts data
  const getReportData = (): NumberOfProductsData[] => {
    return numberOfProductsData || [];
  };

  // Filter data based on selected client types (only for Revenue by Products)
  const getFilteredData = () => {
    const data = getReportData();

    // For Number of Products, return data as is since it doesn't have client types
    return data;
  };

  const reportData = getFilteredData();

  // Apply top filter
  const getTopFilteredData = () => {
    const topCount = parseInt(topFilter.replace('Top ', ''));
    return [...reportData] // Create a copy to avoid mutating Redux state
      .sort((a, b) => b.value - a.value)
      .slice(0, topCount)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  };

  const filteredData = getTopFilteredData();

  // Auto-zoom effect
  useEffect(() => {
    if (onTotalElementsChange) {
      onTotalElementsChange(filteredData.length);
    }
  }, [filteredData.length, onTotalElementsChange]);

  // Get focused data for auto-zoom
  const getFocusedData = () => {
    if (!autoZoomActive || currentFocusedElement >= filteredData.length) {
      return filteredData;
    }

    const focusedItem = filteredData[currentFocusedElement];
    return [focusedItem];
  };

  const displayData = autoZoomActive ? getFocusedData() : filteredData;

  // Handle item click for details panel
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };

  // Render chart based on selected chart type
  const renderChart = () => {
    const chartData = displayData
      .filter(item => item != null)
      .map(item => ({
        id: item.id || '',
        name: item.name || '',
        value: item.value || 0,
        percentage: item.percentage || 0,
        color: item.color || '#3B82F6',
      }));

    switch (chartTypeState) {
      case 'donut':
        return (
          <DonutChart
            data={chartData}
            onSegmentClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            size={{ width: 621, height: chartDimensions.height }}
            valueUnit={valueUnit}
          />
        );

      case 'bar':
        return (
          <BarChartComponent
            data={chartData}
            onBarClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            dataKey="value"
            nameKey="name"
            color="#3B82F6"
          />
        );

      case 'line':
        return (
          <LineChartComponent
            data={chartData}
            onPointClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            dataKey="value"
            nameKey="name"
            color="#3B82F6"
          />
        );

      case 'stackedBar':
        return (
          <SimpleStackedBarChart
            data={chartData}
            onBarClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
          />
        );

      default:
        return (
          <DonutChart
            data={chartData}
            onSegmentClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            size={{ width: 400, height: chartDimensions.height }}
            valueUnit={valueUnit}
          />
        );
    }
  };

  // Main component return
  return (
    <div className={commonStyles.container}>
      {/* Revenue vs Expenses Cards */}
      {chartType && <RevenueBreakdownCards />}

      {/* Main Layout - Left and Right Sections */}
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Number of Products Analysis
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getChartSubtitle(selectedReportType, topFilter)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Top filter */}
                <div className="flex items-center gap-2">
                  <Select value={topFilter} onValueChange={setTopFilter}>
                    <SelectTrigger className={commonStyles.selectTrigger}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {topFilterOptions.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <ThreeDotsMenu
                  currentChartType={chartTypeState}
                  onChartTypeChange={setChartTypeState}
                  onDownload={format => console.log('Download:', format)}
                  topFilter={topFilter}
                />
              </div>
            </div>

            {/* Chart */}
            <div style={{ height: '21.9rem' }}>
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>{renderChart()}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Data List */}
        <div className="lg:col-span-1">
          <ProductsList
            data={reportData}
            valueUnit={valueUnit}
            onItemClick={handleItemClick}
            selectedReportType={selectedReportType}
          />
        </div>
      </div>

      {/* Item Details Panel */}
      <ProductDetailsPanel
        isOpen={isItemDetailsOpen}
        onClose={handleClosePanel}
        product={selectedItem}
        valueUnit={propValueUnit}
      />
    </div>
  );
}

// Default export for ReportRouter
export default function NumberOfProduct() {
  return <ChartsSection valueUnit="₹" />;
}
