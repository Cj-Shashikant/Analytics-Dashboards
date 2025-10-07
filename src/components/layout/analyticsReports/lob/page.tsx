import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setSelectedReportType } from '@/redux/slices/revenueSlice';
import { getFormattedValue, getUnitLabel } from '@/utils/valueFormatter';
import { Card } from '@/components/ui/card';
import {
  chartDimensions,
  topFilterOptions,
  getChartSubtitle,
  commonStyles,
} from './style';
import { Badge } from '@/components/ui/badge';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  TrendingDown,
  TrendingUp,
  BarChart3,
  Filter,
  Table,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { RevenueBreakdownCards } from '../../RevenueBreakdownCards';
// import { FullScreenChartModalEnhanced } from '../../FullScreenChartModal_Enhanced';
import { ThreeDotsMenu } from '../../ThreeDotsMenu';
import { ChartType } from '../../ChartTypeSwitcher';
import { ProductsList } from './detailList';
import { ProductDetailsPanel } from '../../ProductDetailsPanel';
import { renderEnhancedChart } from '../../ChartUtils';
import { Button } from '@/components/ui/button';
import { RevenueReportType } from '@/constants/enums';

// Import existing chart components
import { DonutChart } from '../../chartSection/charts/dount/page';
import { BarChartComponent } from '../../chartSection/charts/bar/page';
import { LineChartComponent } from '../../chartSection/charts/line/page';
import { SimpleStackedBarChart } from '../../chartSection/charts/stacked/page';

interface ChartsSectionProps {
  valueUnit: string;
  selectedReportType?: string;
  fullScreen?: boolean;
  chartType?: 'revenue' | 'expenses';
  baseMetricsData?: {
    totalRevenue: number;
    expenses: number;
    grossProfit: number;
  };
  onNavigate?: (direction: 'prev' | 'next') => void;
  presentationMode?: boolean;
  onPresentationMode?: () => void;
  onPlayFullView?: (
    filters: any,
    chartData: any,
    chartType?: 'revenue' | 'expenses'
  ) => void;
  // Add props for current filters to pass to SavedChartsManager
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  // Auto-zoom props
  autoZoomActive?: boolean;
  currentFocusedElement?: number;
  onTotalElementsChange?: (count: number) => void;
  selectedXAxis?: string;
  selectedYAxis?: string;
}

export function ChartsSection({
  valueUnit,
  selectedReportType = 'Revenue by Products',
  fullScreen = false,
  chartType,
  baseMetricsData,
  onNavigate,
  presentationMode = false,
  onPresentationMode,
  onPlayFullView,
  currentFilters,
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
  selectedXAxis,
  selectedYAxis,
}: ChartsSectionProps) {
  // Redux hooks
  const dispatch = useDispatch();
  const revenueState = useSelector((state: RootState) => state.revenue);
  const filterState = useSelector((state: RootState) => state.filter);

  // Get current value unit from Redux state with fallback
  const currentValueUnit = filterState.valueUnit || valueUnit || 'K';

  // Chart type switching capability added back for bar/line chart support
  const [chartTypeState, setChartTypeState] = useState<ChartType>('donut');

  // Top filter for all report types
  const [topFilter, setTopFilter] = useState<string>('Top 10');
  
  // Automatic chart switching: Convert donut to bar when Top 20 is selected
  useEffect(() => {
    const topCount = parseInt(topFilter.replace('Top ', ''));
    if (topCount > 15 && chartTypeState === 'donut') {
      setChartTypeState('bar');
    }
  }, [topFilter, chartTypeState]);

  // Client types filter for Revenue by Products
  const [selectedClientTypes, setSelectedClientTypes] = useState<string[]>([
    'Corporate',
    'Retail',
    'Affinity',
  ]);

  // Insurer details panel state
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isItemDetailsOpen, setIsItemDetailsOpen] = useState(false);

  // Debug function to track state changes
  const handleClosePanel = () => {
    console.log('handleClosePanel called - current state:', isItemDetailsOpen);
    setIsItemDetailsOpen(false);
    setSelectedItem(null);
    console.log('handleClosePanel - state should now be false');
  };

  // Full screen modal states
  const [isRevenueFullScreen, setIsRevenueFullScreen] = useState(false);
  const [isExpensesFullScreen, setIsExpensesFullScreen] = useState(false);

  // Full screen expense filter state (separate from normal view)
  const [fullScreenExpenseFilter, setFullScreenExpenseFilter] =
    useState<string>('Top 10');

  // Local value formatting functions using the utility
  const getFormattedValueLocal = (value: number) => {
    // For Cross-Sell Penetration, show customer counts instead of revenue
    if (selectedReportType === 'Cross-Sell Penetration') {
      return value.toLocaleString('en-IN');
    }
    return getFormattedValue(value, currentValueUnit);
  };

  // Get formatted total for center display with separate lines for number and unit
  const getFormattedTotal = (value: number) => {
    // For Cross-Sell Penetration, show customer counts
    if (selectedReportType === 'Cross-Sell Penetration') {
      const number = (value / 1000).toFixed(0);
      const unit = 'customers';
      return (
        <div className="text-center">
          <div>{number}K</div>
          <div className="text-xs">{unit}</div>
        </div>
      );
    }

    const formattedValue = getFormattedValue(value, currentValueUnit);
    const unitLabel = getUnitLabel(currentValueUnit);
    
    // Extract number from formatted value
    const numberMatch = formattedValue.match(/[\d.]+/);
    const number = numberMatch ? numberMatch[0] : '0';
    
    return (
      <div className="text-center">
        <div>{number}</div>
        <div className="text-xs">{unitLabel}</div>
      </div>
    );
  };

  // Get professional colors from Redux
  const professionalColors = revenueState.professionalColors;

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
              ? 0.96 // Updated name
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

  // Get data - LOB folder specifically uses revenueByLOB data
  const getReportData = () => {
    // LOB folder always uses revenueByLOB data from Redux
    return revenueState.revenueByLOB || [];
  };

  // Filter data based on selected client types (only for Revenue by Products)
  const getFilteredData = () => {
    const data = getReportData();

    if (selectedReportType === 'Revenue by Products') {
      return data.map(item => {
        if (!item.clientTypes) return item;

        const filteredValue = selectedClientTypes.reduce((sum, clientType) => {
          return sum + (item.clientTypes[clientType] || 0);
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
    return reportData
      .sort((a, b) => b.value - a.value)
      .slice(0, topCount)
      .map((item, index) => ({
        ...item,
        rank: index + 1,
      }));
  };

  const filteredData = getTopFilteredData();

  // Calculate total for filtered data
  const filteredTotal = filteredData.reduce((sum, item) => sum + item.value, 0);

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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{data.name}</p>
          <p className="text-blue-600">
            <span className="font-medium">Value: </span>
            {getFormattedValueLocal(data.value)}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Percentage: </span>
            {data.percentage.toFixed(1)}%
          </p>
          {data.description && (
            <p className="text-gray-500 text-sm mt-1">{data.description}</p>
          )}
        </div>
      );
    }
    return null;
  };

  // Handle item click for details panel
  const handleItemClick = (item: any) => {
    console.log('handleItemClick called with:', item);
    setSelectedItem(item);
    setIsItemDetailsOpen(true);
    console.log('handleItemClick - state should now be true');
  };

  // Render chart based on selected chart type
  const renderChart = () => {
    const chartData = displayData;

    // Use existing chart components based on chart type
    switch (chartTypeState) {
      case 'donut':
        return (
          <DonutChart
            data={chartData}
            onItemClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
            innerRadius={chartDimensions.innerRadius}
            outerRadius={chartDimensions.outerRadius}
            valueUnit={currentValueUnit}
          />
        );

      case 'bar':
        return (
          <BarChartComponent
            data={chartData}
            onItemClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
            dataKey="value"
            nameKey="name"
            color="#3B82F6"
          />
        );

      case 'line':
        return (
          <LineChartComponent
            data={chartData}
            onItemClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
            dataKey="value"
            nameKey="name"
            color="#3B82F6"
          />
        );

      case 'stackedBar':
        return (
          <SimpleStackedBarChart
            data={chartData}
            onItemClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
          />
        );

      default:
        // Fallback to donut chart
        return (
          <DonutChart
            data={chartData}
            onItemClick={handleItemClick}
            valueFormatter={getFormattedValueLocal}
            height={chartDimensions.height}
            innerRadius={chartDimensions.innerRadius}
            outerRadius={chartDimensions.outerRadius}
            valueUnit={currentValueUnit}
          />
        );
    }
  };

  // Get expense data for Revenue vs Expenses view using Redux data
  const getExpenseData = () => {
    return revenueState.expenseData || [];
  };

  // Main component return
  return (
    <div className={commonStyles.container}>
      {/* Revenue vs Expenses Cards */}
      {chartType && (
        <RevenueBreakdownCards
          totalRevenue={metricsData.totalRevenue}
          expenses={metricsData.expenses}
          grossProfit={metricsData.grossProfit}
          valueUnit={valueUnit}
          chartType={chartType}
        />
      )}

      {/* Main Layout - Left and Right Sections */}
      <div className={commonStyles.splitLayout}>
        {/* Left Section - Chart */}
        <div className={commonStyles.leftSection}>
          <Card className={commonStyles.chartCard}>
            <div className={commonStyles.chartHeader}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    LOB Analysis
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
                  onPresentationMode={onPresentationMode}
                  topFilter={topFilter}
                />
              </div>
            </div>

            {/* Chart */}
            <div style={{height:"21.9rem"}}>
              <div className={commonStyles.chartContainer}>
                <div className={commonStyles.chartWrapper}>{renderChart()}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Section - Data List */}
        <div className='lg:col-span-1'>
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
        item={selectedItem}
        valueUnit={valueUnit}
        reportType={selectedReportType}
      />

      {/* Full Screen Modals - Commented out for now */}
    </div>
  );
}

// Default export for ReportRouter
export default function LOBPage() {
  return <ChartsSection valueUnit="₹" />;
}
