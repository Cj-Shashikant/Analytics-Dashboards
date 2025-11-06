import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../hooks/hooks';
import { RootState } from '../../../../redux/store';
import {
  selectCrossSell,
  selectBaseMetrics,
} from '../../../../redux/slices/analyticsDataSlice';
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
  selectedReportType = 'Revenue by Products',
  chartType,
  baseMetricsData,
  autoZoomActive = false,
  currentFocusedElement = 0,
  onTotalElementsChange,
}: ChartsSectionProps) {
  // Redux hooks
  const dispatch = useAppDispatch();
  // Removed unused revenueState variable
  const filterState = useSelector((state: RootState) => state.filter);

  // Import handler function
  const handleImport = async () => {
    // Create a file input element for importing Excel files
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';

    fileInput.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];

      if (file) {
        try {
          console.log('File selected for import:', file.name);

          // Import and parse the Excel file
          const { parseExcelFile } = await import(
            '../../../../utils/excelParser'
          );
          const parsedData = await parseExcelFile(file);

          // Import Redux action
          const { setImportedData } = await import(
            '../../../../redux/slices/importedDataSlice'
          );

          // Dispatch the parsed data to Redux store
          dispatch(
            setImportedData({
              fileName: file.name,
              data: parsedData,
            })
          );

          console.log('Data imported successfully:', parsedData);

          // Show success message
          alert(
            `File "${file.name}" imported successfully!\n\n` +
              `Data Summary:\n` +
              `• Total Revenue: ₹${(parsedData.totalRevenue / 10000000).toFixed(2)} Cr\n` +
              `• Products: ${parsedData.productData.length} items\n` +
              `• Insurers: ${parsedData.insurerData.length} items\n` +
              `• Locations: ${parsedData.locationPerformance.length} items\n` +
              `• Monthly Data: ${parsedData.monthlyTrends.length} months\n\n` +
              ` Dashboard data has been updated with imported values.`
          );
        } catch (error) {
          console.error('Error importing file:', error);
          alert(
            `Error importing file: ${error}\n\n` +
              `Please ensure the Excel file has the correct format with these sheets:\n` +
              `• Main Metrics\n• Product Data\n• Insurer Data\n• Location Performance\n• Monthly Trends`
          );
        }
      }
    };

    // Trigger the file selection dialog
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);

    console.log('Import dialog opened');
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

  // Client types filter for Cross-Sell Analysis - using Redux state
  const selectedClientTypes = filterState.selectedClientTypes;

  // Products filter for Cross-Sell Analysis - using Redux state
  const selectedProducts = filterState.selectedProducts;

  // Force re-render when filter state changes
  useEffect(() => {
    // This effect ensures the component re-renders when filter state changes
  }, [selectedProducts, selectedClientTypes]);

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

  // Get data - Product folder specifically uses revenueByProducts data
  const productData = useSelector(selectCrossSell);

  const getReportData = () => {
    return productData || [];
  };

  // Filter data based on selected client types and products (only for Cross-Sell Penetration)
  const getFilteredData = () => {
    let data = getReportData();

    if (selectedReportType === 'Cross-Sell Penetration') {
      // First filter by selected products (if any are selected)
      if (selectedProducts.length > 0) {
        data = data.filter((item: any) => selectedProducts.includes(item.name));
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
