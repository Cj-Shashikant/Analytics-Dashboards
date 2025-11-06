import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { selectBaseMetrics } from '../../../../redux/slices/analyticsDataSlice';
import { selectFilteredBusinessData } from '../../../../redux/slices/filterSlice';
import {
  selectIsDataImported,
  selectAllImportedData,
  selectIsDynamicImport,
  selectDataForReportType,
} from '../../../../redux/slices/importedDataSlice';
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

  // Client types filter for Revenue by LOB - using Redux state
  const selectedClientTypes = filterState.selectedClientTypes;

  // Products filter for Revenue by LOB - using Redux state
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

  // Get data based on whether imported data is available
  const isDataImported = useSelector(selectIsDataImported);
  const importedData = useSelector(selectAllImportedData);
  const isDynamicImport = useSelector(selectIsDynamicImport);
  const dynamicLobData = useSelector(selectDataForReportType('Revenue by LOB'));

  // Transform businessData to LOB format
  const transformBusinessDataToLobs = () => {
    // Group by LOB name and aggregate data
    const lobGroups = filteredBusinessData.reduce(
      (acc: any, item: BusinessDataItem) => {
        const lobName = item['LOB name'];
        if (!acc[lobName]) {
          acc[lobName] = {
            name: lobName,
            totalPolicies: 0,
            totalPremium: 0,
            totalRevenue: 0,
            items: [],
            color: item.Color,
          };
        }

        acc[lobName].totalPolicies += item['No.of Policies'];
        acc[lobName].totalPremium += item.Premium;
        acc[lobName].totalRevenue += item.Revenue;
        acc[lobName].items.push(item);

        return acc;
      },
      {}
    );

    // Convert to array format expected by the component
    return Object.values(lobGroups).map((group: any, index: number) => ({
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
      color: group.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
      revenuePercentage:
        (group.totalRevenue /
          filteredBusinessData.reduce((sum, item) => sum + item.Revenue, 0)) *
        100,
    }));
  };

  // Transform imported LOB data to match expected format
  const transformImportedLobData = (lobData: any[]) => {
    if (!lobData || lobData.length === 0) {
      return [];
    }

    return lobData.map((item, index) => ({
      id: item.name?.toLowerCase().replace(/\s+/g, '-') || `lob-${index}`,
      name: item.name || item.label || 'Unknown LOB',
      value: item.revenue || item.value || 0,
      premiumRevenue: item.revenue || item.value || 0,
      percentage: item.percentage || item.revenuePercentage || 0,
      policies: item.policies || item.totalPolicies || 0,
      premium: item.premium || item.totalPremium || 0,
      color: item.color || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
      revenuePercentage: item.revenuePercentage || item.percentage || 0,
    }));
  };

  // Use imported data based on import type
  const getLobData = () => {
    if (isDynamicImport && dynamicLobData && dynamicLobData.length > 0) {
      // Use dynamic import data
      return transformImportedLobData(dynamicLobData);
    } else if (isDataImported && importedData?.lobData) {
      // Use legacy import data
      return transformImportedLobData(importedData.lobData);
    } else {
      // Use business data as default (LOBs)
      return transformBusinessDataToLobs();
    }
  };

  const productData = getLobData();

  const getReportData = () => {
    return productData || [];
  };

  // Filter data based on selected client types and products (only for Revenue by Products)
  const getFilteredData = () => {
    let data = getReportData();

    if (selectedReportType === 'Revenue by Products') {
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
          return item.name ? selectedLobs.includes(item.name) : true;
        });
      }

      // Filter by selected policy types (if any are selected)
      if (selectedPolicyTypes.length > 0) {
        data = data.filter((item: any) => {
          return item.policyType
            ? selectedPolicyTypes.includes(item.policyType)
            : true;
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
    return reportData
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
