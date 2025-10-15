import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import {
  selectRetentionMetrics,
  selectLossReasons,
} from '@/redux/slices/retentionSlice';
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
import { AlertTriangle, Badge, Shield, ShoppingBag } from 'lucide-react';
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
  const retentionMetrics = useSelector(selectRetentionMetrics);
  const lossReasonData = useSelector(selectLossReasons);

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
  const getFormattedValueLocalLocal = (value: number) => {
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

  // Get data - Product folder specifically uses revenueByProducts data
  const getReportData = () => {
    return revenueState.insurerRetentionData || [];
  };

  // Filter data based on selected client types (only for Revenue by Products)
  const getFilteredData = () => {
    const data = getReportData();

    if (selectedReportType === 'Revenue by Products') {
      return data.map(item => {
        if (!item?.clientTypes) return item;

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
    }

    return data;
  };

  const reportData = getFilteredData();

  // Apply top filter
  const getTopFilteredData = () => {
    const topCount = parseInt(topFilter.replace('Top ', ''));
    return [...reportData]
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
            valueFormatter={getFormattedValueLocalLocal}
            size={{ width: 621, height: chartDimensions.height }}
            valueUnit={valueUnit}
          />
        );

      case 'bar':
        return (
          <BarChartComponent
            data={chartData}
            onBarClick={handleItemClick}
            valueFormatter={getFormattedValueLocalLocal}
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
            valueFormatter={getFormattedValueLocalLocal}
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
            valueFormatter={getFormattedValueLocalLocal}
            height={chartDimensions.height}
          />
        );

      default:
        return (
          <DonutChart
            data={chartData}
            onSegmentClick={handleItemClick}
            valueFormatter={getFormattedValueLocalLocal}
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
                    Product Analysis
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

      {/* Retention Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Retention Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <Shield className="w-6 text-emerald-800 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Retention Card
                </h3>
                <p className="text-sm text-gray-600">
                  Current retention performance
                </p>
              </div>
            </div>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-800"
            >
              Active
            </Badge>
          </div>

          <div className="space-y-1">
            {/* Overall Retention Rate */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Overall Retention
                </p>
                <p className="text-xs text-gray-500">
                  Policies successfully retained
                </p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">
                  {retentionMetrics.retentionRate}%
                </span>
              </div>
            </div>

            {/* Premium Retained */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Premium Retained
                </p>
                <p className="text-xs text-gray-500">
                  Premium from retained policies
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValueLocalLocal(
                    retentionMetrics.premiumRetained
                  )}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>

            {/* Revenue Earned */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Revenue Earned
                </p>
                <p className="text-xs text-gray-500">
                  Commission from retained premium
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValueLocalLocal(retentionMetrics.revenueEarned)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Business Lost Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 text-red-800 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Business Lost Card
                </h3>
                <p className="text-sm text-gray-600">Lost business analysis</p>
              </div>
            </div>
            <Badge className="bg-red-100 text-red-800">Alert</Badge>
          </div>

          <div className="space-y-1">
            {/* Business Lost Rate */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Business Lost
                </p>
                <p className="text-xs text-gray-500">Policies not renewed</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-bold text-gray-900">
                  {retentionMetrics.lostBusinessRate}%
                </span>
              </div>
            </div>

            {/* Premium Lost */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Premium Lost
                </p>
                <p className="text-xs text-gray-500">
                  Premium from lost policies
                </p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValueLocalLocal(retentionMetrics.premiumLost)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>

            {/* Potential Loss */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Potential Loss
                </p>
                <p className="text-xs text-gray-500">Revenue at risk</p>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-gray-900">
                  {getFormattedValueLocalLocal(retentionMetrics.potentialLoss)}
                </span>
                <span className="text-xs text-gray-500 ml-1">{valueUnit}s</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Complete Retention Analysis Table */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Complete Retention Analysis Table
            </h3>
            <p className="text-gray-600">
              Comprehensive retention metrics by insurer
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-900">
                  Company
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Retention %
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Total Premium ({valueUnit}s)
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Retained Premium ({valueUnit}s)
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Lost Premium ({valueUnit}s)
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Retained Policies
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Lost Policies
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Avg Ticket (Retained)
                </th>
                <th className="text-center py-3 px-4 font-semibold text-gray-900">
                  Avg Ticket (Lost)
                </th>
              </tr>
            </thead>
            <tbody>
              {lossReasonData.map(item => (
                <tr
                  key={item.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td className="text-center py-3 px-4">
                    <span className="font-semibold text-emerald-600">
                      {item.percentage}%
                    </span>
                  </td>
                  <td className="text-center py-3 px-4 text-black font-medium">
                    {getFormattedValueLocalLocal(item.premium)}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600 font-medium">
                    {getFormattedValueLocalLocal(item.premium * 0.76)}
                  </td>
                  <td className="text-center py-3 px-4 text-red-600 font-medium">
                    {getFormattedValueLocalLocal(item.premium * 0.24)}
                  </td>
                  <td className="text-center py-3 px-4 text-emerald-600 font-medium">
                    {Math.round(item.policies * 0.76)}
                  </td>
                  <td className="text-center py-3 px-4 text-red-600 font-medium">
                    {Math.round(item.policies * 0.24)}
                  </td>
                  <td className="text-center py-3 text-black px-4 font-medium">
                    2.0
                  </td>
                  <td className="text-center py-3 text-black px-4 font-medium">
                    2.0
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

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
export default function RetentionByInsurerPage() {
  return <ChartsSection valueUnit="₹" />;
}
