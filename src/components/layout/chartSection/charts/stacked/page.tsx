import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// TypeScript interfaces
export interface StackedBarData {
  name: string;
  [key: string]: any; // Allow multiple data keys for stacking
}

export interface StackedBarProps {
  data: StackedBarData[];
  dataKeys: string[]; // Array of keys to stack
  nameKey?: string;
  colors?: string[];
  valueFormatter?: (value: number) => string;
  onBarClick?: (data: any, index: number) => void;
  className?: string;
  height?: number;
  stackId?: string;
  showGrid?: boolean;
  showTooltip?: boolean;
  barRadius?: number | [number, number, number, number];
  margin?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

// Default colors for stacked bars
const defaultColors = [
  '#3B82F6', // Blue
  '#10B981', // Green
  '#F59E0B', // Yellow
  '#EF4444', // Red
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#F97316', // Orange
  '#84CC16', // Lime
];

// Enhanced Custom Tooltip for Stacked Bars
const StackedCustomTooltip = ({
  active,
  payload,
  label,
  valueFormatter = (value: number) => `$${value.toLocaleString()}`,
}: any) => {
  if (active && payload && payload.length) {
    const total = payload.reduce(
      (sum: number, entry: any) => sum + entry.value,
      0
    );

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between mb-1">
            <div className="flex items-center">
              <span
                className="inline-block w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-sm text-gray-600">{entry.dataKey}:</span>
            </div>
            <span className="text-sm font-medium text-gray-900 ml-2">
              {valueFormatter(entry.value)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 mt-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Total:</span>
            <span className="text-sm font-bold text-gray-900">
              {valueFormatter(total)}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export const StackedBarChartComponent: React.FC<StackedBarProps> = ({
  data,
  dataKeys,
  nameKey = 'name',
  colors = defaultColors,
  valueFormatter,
  onBarClick,
  className = '',
  height = 400,
  stackId = 'a',
  showGrid = true,
  showTooltip = true,
  barRadius = [4, 4, 0, 0],
  margin = { top: 20, right: 30, left: 20, bottom: 60 },
}) => {
  const handleBarClick = (data: any, _index: number) => {
    if (onBarClick) {
      onBarClick(data, _index);
    }
  };

  // Ensure we have enough colors for all data keys
  const getColor = (index: number) => {
    return colors[index % colors.length];
  };

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={margin}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
          <XAxis
            dataKey={nameKey}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
            fontSize={12}
            tick={{ fontSize: 12 }}
          />
          <YAxis fontSize={12} />
          {showTooltip && (
            <Tooltip
              content={<StackedCustomTooltip valueFormatter={valueFormatter} />}
            />
          )}
          {dataKeys.map((key, index) => (
            <Bar
              key={key}
              dataKey={key}
              stackId={stackId}
              fill={getColor(index)}
              radius={index === dataKeys.length - 1 ? barRadius : [0, 0, 0, 0]} // Only apply radius to top bar
              onClick={handleBarClick}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

// Alternative component for single-value stacked bars (legacy compatibility)
export const SimpleStackedBarChart: React.FC<{
  data: StackedBarData[];
  dataKey?: string;
  nameKey?: string;
  color?: string;
  valueFormatter?: (value: number) => string;
  onBarClick?: (data: any, index: number) => void;
  className?: string;
  height?: number;
}> = ({
  data,
  dataKey = 'value',
  nameKey = 'name',
  color = '#3B82F6',
  valueFormatter,
  onBarClick,
  className = '',
  height = 400,
}) => {
  return (
    <StackedBarChartComponent
      data={data}
      dataKeys={[dataKey]}
      nameKey={nameKey}
      colors={[color]}
      valueFormatter={
        valueFormatter || ((value: number) => `$${value.toLocaleString()}`)
      }
      onBarClick={onBarClick || (() => {})}
      className={className}
      height={height}
    />
  );
};

export default StackedBarChartComponent;
