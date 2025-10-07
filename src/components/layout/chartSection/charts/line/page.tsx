import React from "react";
import {
  ScrollableLineChart,
  ScrollableChartConfig,
  defaultScrollConfig,
  shouldUseScrollableChart,
} from "../../../ChartUtils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// TypeScript interfaces
export interface LineChartData {
  name: string;
  value: number;
  fullName?: string;
  originalIndex?: number;
  [key: string]: any;
}

export interface LineChartProps {
  data: LineChartData[];
  dataKey?: string;
  nameKey?: string;
  color?: string;
  config?: Partial<ScrollableChartConfig>;
  valueFormatter?: (value: number) => string;
  onPointClick?: (data: any, index: number) => void;
  className?: string;
  scrollable?: boolean;
  strokeWidth?: number;
  dotRadius?: number;
  activeDotRadius?: number;
  topFilter?: string;
}

// Enhanced Custom Tooltip
const EnhancedCustomTooltip = ({ 
  active, 
  payload, 
  label, 
  valueFormatter = (value: number) => `$${value.toLocaleString()}` 
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="font-medium text-gray-900 mb-1">{label}</p>
        <p className="text-sm text-gray-600">
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: data.color || "#3B82F6" }}
          ></span>
          {valueFormatter(data.value)}
        </p>
        {data.payload?.percentage && (
          <p className="text-xs text-gray-500 mt-1">
            {data.payload.percentage.toFixed(1)}% of total
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const LineChartComponent: React.FC<LineChartProps> = ({
  data,
  dataKey = "value",
  nameKey = "name",
  color = "#3B82F6",
  config = {},
  valueFormatter,
  onPointClick,
  className = "",
  scrollable = false,
  strokeWidth = 2,
  dotRadius = 4,
  activeDotRadius = 6,
  topFilter = "Top 10",
}) => {
  const chartConfig = { ...defaultScrollConfig, ...config };
  
  // Use the enhanced logic to determine if scrolling is needed
  const needsScrolling = scrollable || shouldUseScrollableChart(topFilter, data.length);

  // If scrolling is needed, use the ScrollableLineChart component
  if (needsScrolling) {
    return (
      <ScrollableLineChart
        data={data}
        dataKey={dataKey}
        nameKey={nameKey}
        color={color}
        config={config}
        valueFormatter={valueFormatter}
        onPointClick={onPointClick}
        className={className}
      />
    );
  }

  // Prepare chart data with proper formatting for regular chart
  const chartData = data.map((item, index) => ({
    ...item,
    [nameKey]:
      item[nameKey]?.length > 15
        ? `${item[nameKey].substring(0, 15)}...`
        : item[nameKey],
    fullName: item[nameKey],
    originalIndex: index,
  }));

  const handlePointClick = (data: any, index: number) => {
    if (onPointClick) {
      const originalData = data.payload;
      onPointClick(originalData, data.originalIndex);
    }
  };

  // Regular chart for smaller datasets
  return (
    <div
      className={`w-full ${className}`}
      style={{ height: chartConfig.containerHeight }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
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
          <Tooltip
            content={<EnhancedCustomTooltip valueFormatter={valueFormatter} />}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={strokeWidth}
            dot={{ fill: color, strokeWidth: 2, r: dotRadius }}
            activeDot={{ r: activeDotRadius, stroke: color, strokeWidth: 2 }}
            onClick={handlePointClick}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChartComponent;