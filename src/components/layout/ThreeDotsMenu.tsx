import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '../ui/dropdown-menu';
import {
  MoreVertical,
  PieChart,
  BarChart3,
  TrendingUp,
  LineChart,
  Table,
  Download,
  FileSpreadsheet,
  FileText,
  Presentation,
  Upload,
} from 'lucide-react';
import { ChartType } from './ChartTypeSwitcher';

interface ThreeDotsMenuProps {
  currentChartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
  onDownload: (format: string) => void;
  onImport?: () => void;
  onPresentationMode?: () => void;
  className?: string;
  topFilter?: string; // Add topFilter prop to block donut chart for Top 20
}

export function ThreeDotsMenu({
  currentChartType,
  onChartTypeChange,
  onDownload,
  onImport,
  onPresentationMode,
  className = '',
  topFilter,
}: ThreeDotsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Version 82 Chart Types with Enhanced Options
  const chartTypes = [
    {
      type: 'donut' as ChartType,
      label: 'Donut Chart',
      icon: PieChart,
      description: 'Circular chart with center hole',
    },
    {
      type: 'bar' as ChartType,
      label: 'Bar Chart',
      icon: BarChart3,
      description: 'Vertical bars comparison',
    },
    {
      type: 'line' as ChartType,
      label: 'Line Chart',
      icon: LineChart,
      description: 'Trend visualization',
    },
    {
      type: 'stackedBar' as ChartType,
      label: 'Stacked Bar',
      icon: TrendingUp,
      description: 'Multi-category bars',
    },
    {
      type: 'table' as ChartType,
      label: 'Table View',
      icon: Table,
      description: 'Detailed data table',
    },
  ];

  // Enhanced Download Options for Version 82
  const downloadFormats = [
    {
      format: 'import',
      label: 'Import to Excel',
      icon: Upload,
      description: 'Import Excel data',
    },
    {
      format: 'csv',
      label: 'Download as CSV',
      icon: FileSpreadsheet,
      description: 'Comma-separated values',
    },
    {
      format: 'excel',
      label: 'Download as Excel',
      icon: FileSpreadsheet,
      description: 'Microsoft Excel format',
    },
    {
      format: 'pdf',
      label: 'Download as PDF',
      icon: FileText,
      description: 'Portable document format',
    },
    {
      format: 'png',
      label: 'Save as Image',
      icon: Download,
      description: 'High-quality PNG image',
    },
  ];

  const handleChartTypeSelect = (type: ChartType) => {
    onChartTypeChange(type);
    setIsOpen(false);
  };

  const handleActionSelect = (format: string) => {
    if (format === 'import' && onImport) {
      onImport();
    } else {
      onDownload(format);
    }
    setIsOpen(false);
  };

  const handlePresentationMode = () => {
    if (onPresentationMode) {
      onPresentationMode();
    }
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={`h-9 w-9 p-0 hover:bg-gray-50 border-gray-200 rounded-lg transition-all ${className}`}
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 p-1 bg-white border border-gray-200 rounded-xl shadow-lg"
      >
        {/* Chart Type Section - Version 82 Enhanced */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Chart Format
          </div>
          <div className="text-xs text-gray-400">Version 82 Professional</div>
        </div>

        {chartTypes.map(chart => {
          const IconComponent = chart.icon;
          const isSelected = currentChartType === chart.type;

          // Block donut chart for all top filters > 15 (Top 20, 30, 50, etc.)
          const topCount = topFilter
            ? parseInt(topFilter.replace('Top ', ''))
            : 0;
          const isDonutBlocked = chart.type === 'donut' && topCount > 15;

          return (
            <DropdownMenuItem
              key={chart.type}
              onClick={() =>
                !isDonutBlocked && handleChartTypeSelect(chart.type)
              }
              className={`m-1 p-3 rounded-lg transition-all ${
                isDonutBlocked
                  ? 'cursor-not-allowed opacity-50 bg-gray-50'
                  : isSelected
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 cursor-pointer'
                    : 'hover:bg-gray-50 cursor-pointer'
              }`}
              disabled={isDonutBlocked}
            >
              <div className="flex items-center w-full">
                <div
                  className={`p-1.5 rounded-md mr-3 ${
                    isDonutBlocked
                      ? 'bg-gray-200'
                      : isSelected
                        ? 'bg-indigo-100'
                        : 'bg-gray-100'
                  }`}
                >
                  <IconComponent
                    className={`w-4 h-4 ${
                      isDonutBlocked
                        ? 'text-gray-400'
                        : isSelected
                          ? 'text-indigo-600'
                          : 'text-gray-600'
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-sm font-medium ${
                      isDonutBlocked
                        ? 'text-gray-400'
                        : isSelected
                          ? 'text-indigo-900'
                          : 'text-gray-900'
                    }`}
                  >
                    {chart.label}
                    {isDonutBlocked && ` (Not available for ${topFilter})`}
                  </div>
                  <div
                    className={`text-xs ${
                      isDonutBlocked
                        ? 'text-gray-400'
                        : isSelected
                          ? 'text-indigo-600'
                          : 'text-gray-500'
                    }`}
                  >
                    {isDonutBlocked
                      ? 'Switch to Top 15 or lower to use donut chart'
                      : chart.description}
                  </div>
                </div>
                {isSelected && !isDonutBlocked && (
                  <div className="w-2 h-2 rounded-full bg-indigo-600 ml-2"></div>
                )}
              </div>
            </DropdownMenuItem>
          );
        })}

        <DropdownMenuSeparator className="my-2 bg-gray-100" />

        {/* Presentation Mode Section */}
        {onPresentationMode && (
          <>
            <div className="px-3 py-2 border-b border-gray-100">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                View Mode
              </div>
              <div className="text-xs text-gray-400">
                Full-screen presentation experience
              </div>
            </div>

            <DropdownMenuItem
              onClick={handlePresentationMode}
              className="cursor-pointer m-1 p-3 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all"
            >
              <div className="flex items-center w-full">
                <div className="p-1.5 rounded-md bg-gradient-to-r from-blue-100 to-indigo-100 mr-3">
                  <Presentation className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    Presentation Mode
                  </div>
                  <div className="text-xs text-gray-500">
                    Auto-slide with navigation controls
                  </div>
                </div>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="my-2 bg-gray-100" />
          </>
        )}

        {/* Download Section - Version 82 Enhanced */}
        <div className="px-3 py-2 border-b border-gray-100">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
            Export Data
          </div>
          <div className="text-xs text-gray-400">
            Download in various formats
          </div>
        </div>

        {downloadFormats.map(download => {
          const IconComponent = download.icon;

          return (
            <DropdownMenuItem
              key={download.format}
              onClick={() => handleActionSelect(download.format)}
              className="cursor-pointer m-1 p-3 rounded-lg hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center w-full">
                <div className="p-1.5 rounded-md bg-gray-100 mr-3">
                  <IconComponent className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900">
                    {download.label}
                  </div>
                  <div className="text-xs text-gray-500">
                    {download.description}
                  </div>
                </div>
              </div>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
