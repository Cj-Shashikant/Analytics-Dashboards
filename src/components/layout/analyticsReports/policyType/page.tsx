import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { selectDataForReportType } from '../../../../redux/slices/importedDataSlice';
import { selectBaseMetrics } from '../../../../redux/slices/analyticsDataSlice';
import { selectFilteredBusinessData } from '../../../../redux/slices/filterSlice';
import {
  loadDataForReportType,
  loadTotalsFromJson,
  hasDataForReportType,
} from '../../../../utils/dashboardDataLoader';
import { Card } from '@/components/ui/card';
import {
  chartDimensions,
  topFilterOptions,
  getChartSubtitle,
  commonStyles,
} from './style';
import { getFormattedValue } from '@/utils/valueFormatter';
import { BusinessDataItem } from '../../../../redux/slices/businessData';

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
  selectedReportType = 'Revenue by Products',
  chartType,
  baseMetricsData,
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
}: ChartsSectionProps) {
  const filterState = useSelector((state: RootState) => state.filter);
  const filteredBusinessData = useSelector(selectFilteredBusinessData);

  // Import handler function
  const handleImport = async () => {
    console.log('Import button clicked for Product report');
    try {
      const { triggerExcelImport } = await import(
        '../../../../utils/dynamicImportHandler'
      );
      await triggerExcelImport();
      alert(
        `Excel import functionality triggered for "${selectedReportType}" report type.\n\n` +
          `Please select an Excel file to import product data.\n\n` +
          `Dashboard data will be updated with imported values.`
      );
    } catch (error) {
      console.error('Error during Product import:', error);
      alert(
        `Error importing file: ${error}\n\n` +
          `Please try again or check the file format.`
      );
    }
  };

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

  // Client types filter for Revenue by Policy Type - using Redux state
  const selectedClientTypes = filterState.selectedClientTypes;

  // Products filter for Revenue by Policy Type - using Redux state
  const selectedProducts = filterState.selectedProducts;

  // Additional filters - using Redux state
  const selectedInsurers = filterState.selectedInsurers;
  const selectedLobs = filterState.selectedLob;
  const selectedPolicyTypes = filterState.selectedPolicy;
  const selectedVerticals = filterState.selectedVertical;

  // Force re-render when filter state changes
  useEffect(() => {
    // This effect ensures the component re-renders when filter state changes
  }, [
    selectedProducts,
    selectedClientTypes,
    selectedInsurers,
    selectedLobs,
    selectedPolicyTypes,
    selectedVerticals,
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
  const baseMetricsFromSelector = useSelector(selectBaseMetrics);

  const getMetricsData = () => {
    if (baseMetricsData) {
      return baseMetricsData;
    }

    // Try to get totals from JSON data first
    if (hasDataForReportType(selectedReportType)) {
      const jsonTotals = loadTotalsFromJson();
      if (jsonTotals) {
        console.log('Loading Policy Type totals from JSON:', jsonTotals);
        return {
          totalRevenue: jsonTotals.totalRevenue || 0,
          expenses: jsonTotals.totalExpenses || 0,
          grossProfit:
            (jsonTotals.totalRevenue || 0) - (jsonTotals.totalExpenses || 0),
        };
      }
    }

    // Use Redux base metrics (now includes imported data support)
    const baseMetrics = baseMetricsFromSelector;

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

  // Transform businessData to Policy Type format
  const transformBusinessDataToPolicyTypes = () => {
    // Group by Policy Type and aggregate data
    const policyTypeGroups = filteredBusinessData.reduce(
      (acc: any, item: BusinessDataItem) => {
        const policyTypeName = item['Policy Type'];
        if (!acc[policyTypeName]) {
          acc[policyTypeName] = {
            name: policyTypeName,
            totalPolicies: 0,
            totalPremium: 0,
            totalRevenue: 0,
            items: [],
            color: item.Color,
          };
        }

        acc[policyTypeName].totalPolicies += item['No.of Policies'];
        acc[policyTypeName].totalPremium += item.Premium;
        acc[policyTypeName].totalRevenue += item.Revenue;
        acc[policyTypeName].items.push(item);

        return acc;
      },
      {}
    );

    // Convert to array format expected by the component
    return Object.values(policyTypeGroups).map((group: any, index: number) => ({
      id: group.name.toLowerCase().replace(/\s+/g, '-'),
      name: group.name,
      value: group.totalRevenue,
      premiumRevenue: group.totalRevenue,
      percentage:
        (group.totalRevenue /
          filteredBusinessData.reduce((sum, item) => sum + item.Revenue, 0)) *
        100,
      policies: group.totalPolicies,
      premium: group.totalPremium,
      revenue: group.totalRevenue,
      color: group.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
      revenuePercentage:
        (group.totalRevenue /
          filteredBusinessData.reduce((sum, item) => sum + item.Revenue, 0)) *
        100,
    }));
  };

  // Get data - Try JSON data first, then fallback to Redux
  const productData = useSelector(selectDataForReportType(selectedReportType));

  const getReportData = () => {
    // Check if we have JSON data for this report type
    if (hasDataForReportType(selectedReportType)) {
      const jsonData = loadDataForReportType(selectedReportType);
      console.log('Loading Policy Type data from JSON:', jsonData);

      // Transform JSON data to match expected format
      return jsonData.map((item: any) => ({
        name: item.name,
        value: item.revenue,
        premiumRevenue: item.revenue,
        policies: item.policies,
        premium: item.premium,
        revenue: item.revenue,
        revenuePercentage: 0, // Calculate if needed
      }));
    }

    // Fallback to Redux data if available
    if (productData && productData.length > 0) {
      return productData;
    }

    // Use business data as default (Policy Types)
    return transformBusinessDataToPolicyTypes();
  };

  // Filter data based on selected client types and products (only for Revenue by Policy Type)
  const getFilteredData = () => {
    let data = getReportData();

    if (selectedReportType === 'Revenue by Policy Type') {
      // First filter by selected products (if any are selected)
      if (selectedProducts.length > 0) {
        data = data.filter((item: any) => selectedProducts.includes(item.name));
      }

      // Filter by selected insurers (if any are selected)
      if (selectedInsurers.length > 0) {
        data = data.filter((item: any) => {
          return item.insurerName
            ? selectedInsurers.includes(item.insurerName)
            : true;
        });
      }

      // Filter by selected LOBs (if any are selected)
      if (selectedLobs.length > 0) {
        data = data.filter((item: any) => {
          return item.lobName ? selectedLobs.includes(item.lobName) : true;
        });
      }

      // Filter by selected policy types (if any are selected)
      if (selectedPolicyTypes.length > 0) {
        data = data.filter((item: any) => {
          return item.name ? selectedPolicyTypes.includes(item.name) : true;
        });
      }

      // Filter by selected verticals (if any are selected)
      if (selectedVerticals.length > 0) {
        data = data.filter((item: any) => {
          return item.vertical
            ? selectedVerticals.includes(item.vertical)
            : true;
        });
      }

      // Then apply client type filtering
      return data.map((item: any) => {
        let finalValue = item.premiumRevenue;

        if (item?.clientTypes) {
          const filteredValue = selectedClientTypes.reduce(
            (sum: number, clientType: string) => {
              const clientTypeValue =
                item.clientTypes?.[
                  clientType as keyof typeof item.clientTypes
                ] || 0;
              return sum + clientTypeValue;
            },
            0
          );
          finalValue = filteredValue;
        }

        return {
          ...item,
          value: finalValue,
          percentage: (finalValue / metricsData.totalRevenue) * 100,
          policies: item.policies, // Preserve policies data
          premium: item.premiumRevenue, // Map premiumRevenue to premium field
          revenue: item.premiumRevenue, // Map premiumRevenue to revenue field
          revenuePercentage: item.revenuePercentage, // Preserve revenue percentage
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
      .sort((a: any, b: any) => b.value - a.value)
      .slice(0, topCount)
      .map((item: any, index: number) => ({
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
      .filter((item: any) => item != null)
      .map((item: any) => ({
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
            size={{ width: 636, height: chartDimensions.height }}
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
                  onImport={handleImport}
                  topFilter={topFilter}
                />
              </div>
            </div>

            {/* Chart */}
            <div style={{ height: '27rem' }}>
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
export default function ProductPage() {
  return <ChartsSection valueUnit="₹" />;
}
