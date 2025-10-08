import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
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
import { TrendingUp, DollarSign } from 'lucide-react';
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
  selectedReportType = 'Revenue by Products',
  chartType,
  baseMetricsData,
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
}: ChartsSectionProps) {
  // Redux hooks
  const revenueState = useSelector((state: RootState) => state.revenue);
  const filterState = useSelector((state: RootState) => state.filter);

  // Use valueUnit from Redux state, fallback to prop if needed
  const valueUnit = filterState.valueUnit || propValueUnit || 'K';

  // Separate state for Revenue container (left)
  const [revenueChartType, setRevenueChartType] = useState<ChartType>('donut');
  const [revenueTopFilter, setRevenueTopFilter] = useState<string>('Top 10');

  // Separate state for Expenses container (right)
  const [expenseChartType, setExpenseChartType] = useState<ChartType>('donut');
  const [expenseTopFilter, setExpenseTopFilter] = useState<string>('Top 10');

  // Automatic chart switching for Revenue container
  useEffect(() => {
    const topCount = parseInt(revenueTopFilter.replace('Top ', ''));
    if (topCount > 15 && revenueChartType === 'donut') {
      setRevenueChartType('bar');
    }
  }, [revenueTopFilter, revenueChartType]);

  // Automatic chart switching for Expense container
  useEffect(() => {
    const topCount = parseInt(expenseTopFilter.replace('Top ', ''));
    if (topCount > 15 && expenseChartType === 'donut') {
      setExpenseChartType('bar');
    }
  }, [expenseTopFilter, expenseChartType]);

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
    // For Cross-Sell Penetration, show customer counts instead of revenue
    if (selectedReportType === 'Cross-Sell Penetration') {
      return value.toLocaleString('en-IN');
    }
    return getFormattedValue(value, valueUnit);
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

  // Get data - Revenue data for left container
  const getRevenueData = () => {
    return revenueState.revenueByProducts || [];
  };

  // Get data - Expense data for right container
  const getExpenseData = () => {
    return revenueState.expenseData || [];
  };

  // Filter revenue data based on selected client types and top filter
  const getFilteredRevenueData = () => {
    const data = getRevenueData();
    const topCount = parseInt(revenueTopFilter.replace('Top ', ''));

    if (selectedReportType === 'Revenue by Products') {
      const filteredData = data.map(item => {
        if (!item.clientTypes) return { ...item };

        const filteredValue = selectedClientTypes.reduce((sum, clientType) => {
          const clientTypeValue =
            item.clientTypes?.[clientType as keyof typeof item.clientTypes] ||
            0;
          return sum + clientTypeValue;
        }, 0);

        return {
          ...item,
          value: filteredValue,
          percentage: (filteredValue / metricsData.totalRevenue) * 100,
        };
      });

      return [...filteredData]
        .sort((a, b) => b.value - a.value)
        .slice(0, topCount)
        .map((item, index) => ({
          ...item,
          rank: index + 1,
        }));
    }

    return [...data]
      .sort((a, b) => b.value - a.value)
      .slice(0, topCount)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  };

  // Filter expense data based on top filter
  const getFilteredExpenseData = () => {
    const data = getExpenseData();
    const topCount = parseInt(expenseTopFilter.replace('Top ', ''));

    return [...data]
      .sort((a, b) => b.value - a.value)
      .slice(0, topCount)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  };

  const revenueData = getFilteredRevenueData();
  const expenseData = getFilteredExpenseData();

  // Auto-zoom effect for revenue data
  useEffect(() => {
    if (onTotalElementsChange) {
      onTotalElementsChange(revenueData.length);
    }
  }, [revenueData.length, onTotalElementsChange]);

  // Get focused data for auto-zoom (revenue)
  const getFocusedRevenueData = () => {
    if (!autoZoomActive || currentFocusedElement >= revenueData.length) {
      return revenueData;
    }

    const focusedItem = revenueData[currentFocusedElement];
    return [focusedItem];
  };

  // Get focused data for auto-zoom (expense)
  const getFocusedExpenseData = () => {
    if (!autoZoomActive || currentFocusedElement >= expenseData.length) {
      return expenseData;
    }

    const focusedItem = expenseData[currentFocusedElement];
    return [focusedItem];
  };

  const displayRevenueData = autoZoomActive
    ? getFocusedRevenueData()
    : revenueData;
  const displayExpenseData = autoZoomActive
    ? getFocusedExpenseData()
    : expenseData;

  // Handle item click for details panel
  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
  };

  // Render revenue chart (left container)
  const renderRevenueChart = () => {
    const chartData = displayRevenueData
      .filter(item => item != null)
      .map(item => ({
        id: item.id || '',
        name: item.name || '',
        value: item.value || 0,
        percentage: item.percentage || 0,
        color: item.color || '#3B82F6',
      }));

    switch (revenueChartType) {
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

  // Render expense chart (right container)
  const renderExpenseChart = () => {
    const chartData = displayExpenseData
      .filter(item => item != null)
      .map(item => ({
        id: item.id || '',
        name: item.name || '',
        value: item.value || 0,
        percentage: item.percentage || 0,
        color: item.color || '#3B82F6',
      }));

    switch (expenseChartType) {
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
            size={{ width: 621, height: chartDimensions.height }}
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
        {/* Left Section - Revenue Analysis Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Revenue Analysis
                  </h3>
                  <p className="text-sm text-gray-500">
                    {getChartSubtitle(selectedReportType, revenueTopFilter)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Top filter for Revenue */}
                <div className="flex items-center gap-2">
                  <Select
                    value={revenueTopFilter}
                    onValueChange={setRevenueTopFilter}
                  >
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
                  currentChartType={revenueChartType}
                  onChartTypeChange={setRevenueChartType}
                  onDownload={format =>
                    console.log('Download Revenue:', format)
                  }
                  topFilter={revenueTopFilter}
                />
              </div>
            </div>

            {/* Revenue Chart */}
            <div style={{ height: '21.9rem' }}>
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>
                  {renderRevenueChart()}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Expenses Analysis Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <DollarSign className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Expenses Analysis
                  </h3>
                  <p className="text-sm text-gray-500">
                    Top expense categories breakdown
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {/* Top filter for Expenses */}
                <div className="flex items-center gap-2">
                  <Select
                    value={expenseTopFilter}
                    onValueChange={setExpenseTopFilter}
                  >
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
                  currentChartType={expenseChartType}
                  onChartTypeChange={setExpenseChartType}
                  onDownload={format =>
                    console.log('Download Expenses:', format)
                  }
                  topFilter={expenseTopFilter}
                />
              </div>
            </div>

            {/* Expense Chart */}
            <div style={{ height: '21.9rem' }}>
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>
                  {renderExpenseChart()}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Revenue Data List */}
        <div className="lg:col-span-1">
          <ProductsList
            data={revenueData}
            valueUnit={valueUnit}
            onItemClick={handleItemClick}
            selectedReportType={selectedReportType}
            containerType="revenue"
          />
        </div>

        {/* Right Section - Expense Data List */}
        <div className="lg:col-span-1">
          <ProductsList
            data={expenseData}
            valueUnit={valueUnit}
            onItemClick={handleItemClick}
            selectedReportType="Expense Categories"
            containerType="expense"
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
export default function RevenueVsExpenses() {
  return <ChartsSection valueUnit="₹" />;
}
