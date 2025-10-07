
import React, { useState, useRef, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// TypeScript interfaces
export interface DonutChartData {
  id: string;
  name: string;
  value: number;
  color: string;
  percentage: number;
  description?: string;
}

export interface DonutChartProps {
  data: DonutChartData[];
  size?: { width: number; height: number };
  isPresentation?: boolean;
  onSegmentClick?: (data: DonutChartData) => void;
  valueFormatter?: (value: number) => string;
  totalFormatter?: (total: number) => string;
  className?: string;
  autoZoom?: boolean;
  valueUnit?: string;
}

// Custom Tooltip Component
const CustomTooltip = ({ 
  active, 
  payload, 
  valueFormatter = (value) => `$${value.toLocaleString()}` 
}: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200 z-50 pointer-events-none">
        <p className="font-medium text-gray-900">{data.name}</p>
        <p className="text-sm text-gray-600">
          {valueFormatter(data.value)} ({data.percentage}%)
        </p>
        {data.description && (
          <p className="text-xs text-gray-500 mt-1">{data.description}</p>
        )}
      </div>
    );
  }
  return null;
};

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  size = { width: 630, height: 350 },
  isPresentation = false,
  onSegmentClick,
  valueFormatter = (value) => `$${value.toLocaleString()}`,
  totalFormatter = (total) => `$${total.toLocaleString()}`,
  className = "",
  autoZoom = true,
  valueUnit = "Cr",
}) => {
  const [focusedElement, setFocusedElement] = useState<DonutChartData | null>(null);
  const [autoZoomActive, setAutoZoomActive] = useState(false);
  
  // State for dynamic font sizing
  const [fontSize, setFontSize] = useState<string>("1rem");
  const [fontWeight, setFontWeight] = useState<string>("500");
  
  // Refs for measuring text dimensions
  const textRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate total value
  const total = data.reduce((sum, item) => sum + item.value, 0);

  // Format total value based on unit
  const getFormattedTotal = (value: number) => {
    if (valueUnit === 'Cr') {
      return `${(value / 10000000).toFixed(1)}`;
    } else if (valueUnit === 'L') {
      return `${(value / 100000).toFixed(1)}`;
    } else if (valueUnit === 'K') {
      return `${(value / 1000).toFixed(1)}`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  // Get unit display name
  const getUnitDisplayName = () => {
    switch (valueUnit) {
      case 'Cr': return 'crores';
      case 'L': return 'lakhs';
      case 'K': return 'thousands';
      default: return '';
    }
  };

  // Function to calculate optimal font size and weight
  const calculateOptimalFontSize = () => {
    if (!textRef.current || !containerRef.current) return;

    const textElement = textRef.current;
    const containerElement = containerRef.current;
    
    // Get container dimensions (the white circle in the center)
    const containerWidth = containerElement.offsetWidth * 0.8; // 80% of container for padding
    const containerHeight = containerElement.offsetHeight * 0.6; // 60% for main text
    
    // Reset to default values first
    textElement.style.fontSize = "1rem";
    textElement.style.fontWeight = "500";
    
    // Get text dimensions with default styling
    const textWidth = textElement.scrollWidth;
    const textHeight = textElement.scrollHeight;
    
    // Check if text overflows
    if (textWidth > containerWidth || textHeight > containerHeight) {
      // Calculate scale factors
      const widthScale = containerWidth / textWidth;
      const heightScale = containerHeight / textHeight;
      const scale = Math.min(widthScale, heightScale);
      
      // Calculate new font size (minimum 0.5rem, maximum 1rem)
      const baseFontSize = 18; // 1rem = 12px
      const newFontSize = Math.max(8, Math.min(baseFontSize, baseFontSize * scale));
      
      // Adjust font weight based on size reduction
      let newFontWeight = "500";
      if (scale < 0.7) {
        newFontWeight = "400"; // Lighter weight for smaller text
      } else if (scale < 0.85) {
        newFontWeight = "450";
      }
      
      setFontSize(`${newFontSize}px`);
      setFontWeight(newFontWeight);
    } else {
      // Text fits, use default values
      setFontSize("1rem");
      setFontWeight("500");
    }
  };

  // Effect to recalculate font size when total value changes
  useEffect(() => {
    const timer = setTimeout(() => {
      calculateOptimalFontSize();
    }, 100); // Small delay to ensure DOM is updated
    
    return () => clearTimeout(timer);
  }, [total, valueUnit, isPresentation]);

  // Configuration based on presentation mode
  const presentationMultiplier = isPresentation ? 1.4 : 1.0;
  const outerRadiusMultiplier = isPresentation ? 0.38 : 0.32;
  const innerRadiusMultiplier = isPresentation ? 0.2 : 0.18;
  const labelDistance = isPresentation ? 45 : 30;

  // Auto-zoom magnification
  const focusedOuterRadiusMultiplier =
    autoZoomActive && focusedElement
      ? outerRadiusMultiplier + 0.08
      : outerRadiusMultiplier;

  // Calculate background circle size
  const backgroundRadius =
    Math.min(size.width, size.height) * innerRadiusMultiplier * 0.85;

  const handleSegmentClick = (data: any, index: number) => {
    const clickedData = data.payload;
    
    if (autoZoom) {
      if (focusedElement && focusedElement.id === clickedData.id) {
        // Unfocus if clicking the same element
        setFocusedElement(null);
        setAutoZoomActive(false);
      } else {
        // Focus on new element
        setFocusedElement(clickedData);
        setAutoZoomActive(true);
      }
    }

    if (onSegmentClick) {
      onSegmentClick(clickedData);
    }
  };

  const handleSegmentHover = (data: any, index: number) => {
    const hovered = data.payload;
    if (!autoZoomActive) {
      setFocusedElement(hovered);
    }
  };

  const handleSegmentLeave = () => {
    if (!autoZoomActive) {
      setFocusedElement(null);
    }
  };

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size.width, height: size.height }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          {/* SVG Filters for Auto-Zoom Effects */}
          <defs>
            <filter
              id="magnifyGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="focusHighlight"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="4"
                floodColor="#3B82F6"
                floodOpacity="0.6"
              />
            </filter>
          </defs>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({
              cx,
              cy,
              midAngle,
              innerRadius,
              outerRadius,
              percent,
              index,
              payload,
            }: {
              cx: number;
              cy: number;
              midAngle: number;
              innerRadius: number;
              outerRadius: number;
              percent: number;
              index: number;
              payload: any;
            }) => {
              const RADIAN = Math.PI / 180;
              
              // Adjust label distance based on position to use top space
              let dynamicLabelDistance = labelDistance;
              
              // Top area (270° to 90°, i.e., -90° to 90°): Give more space
              if (midAngle >= 270 || midAngle <= 90) {
                dynamicLabelDistance = labelDistance + 25;
              }
              // Left and right middle areas: Normal spacing
              else if ((midAngle > 90 && midAngle < 150) || (midAngle > 210 && midAngle < 270)) {
                dynamicLabelDistance = labelDistance + 10;
              }
              // Bottom area: Tighter spacing
              else {
                dynamicLabelDistance = labelDistance;
              }
              
              if (data.length > 6) {
                dynamicLabelDistance += 10;
              }
              
              const radius = outerRadius + dynamicLabelDistance;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              // Calculate line points
              const lineStartRadius = outerRadius + 5;
              const lineBreakRadius = outerRadius + (dynamicLabelDistance * 0.6);
              const lineLabelRadius = outerRadius + dynamicLabelDistance;
              
              const lineStartX = cx + lineStartRadius * Math.cos(-midAngle * RADIAN);
              const lineStartY = cy + lineStartRadius * Math.sin(-midAngle * RADIAN);
              
              const lineBreakX = cx + lineBreakRadius * Math.cos(-midAngle * RADIAN);
              const lineBreakY = cy + lineBreakRadius * Math.sin(-midAngle * RADIAN);
              
              const isRightSide = x > cx;
              const lineLabelX = cx + lineLabelRadius * Math.cos(-midAngle * RADIAN);
              const horizontalLineX = isRightSide ? lineLabelX + 40 : lineLabelX - 40;

              const isFocused =
                focusedElement && payload.id === focusedElement.id;
              const isAutoZooming = autoZoomActive && focusedElement;

              // Use lineBreakY directly without extra adjustments
              let adjustedY = lineBreakY;

              // Truncate text with ellipsis
              const maxLength = 20; // Adjust based on your needs
              const labelText = `${payload.name} (${(percent * 100).toFixed(1)}%)`;
              let displayText = labelText;
              
              if (labelText.length > maxLength) {
                if (isRightSide) {
                  // Right side: truncate from end
                  displayText = labelText.substring(0, maxLength - 3) + "...";
                } else {
                  // Left side: truncate from start
                  displayText = "..." + labelText.substring(labelText.length - (maxLength - 3));
                }
              }

              return (
                <g>
                  {/* Connecting line */}
                  <path
                    d={`M ${lineStartX} ${lineStartY} L ${lineBreakX} ${lineBreakY} L ${horizontalLineX} ${adjustedY}`}
                    stroke={isFocused ? "#3B82F6" : "#9CA3AF"}
                    strokeWidth={isFocused ? 2 : 1}
                    fill="none"
                    className="transition-all duration-300"
                  />
                  
                  {/* Label text with percentage in same line */}
                  <text
                    x={horizontalLineX}
                    y={adjustedY}
                    fill={
                      isFocused
                        ? "#3B82F6"
                        : isAutoZooming
                        ? "#9CA3AF"
                        : "#374151"
                    }
                    textAnchor={isRightSide ? "start" : "end"}
                    dominantBaseline="central"
                    className={
                      isFocused
                        ? "transition-all duration-500 font-semibold"
                        : "transition-all duration-500 font-medium"
                    }
                    style={{ fontSize: '0.725rem' }}
                  >
                    {displayText}
                  </text>
                </g>
              );
            }}
            outerRadius={
              Math.min(size.width, size.height) * focusedOuterRadiusMultiplier
            }
            innerRadius={
              Math.min(size.width, size.height) * innerRadiusMultiplier
            }
            paddingAngle={2}
            cornerRadius={8}
            dataKey="value"
            onClick={handleSegmentClick}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {data.map((entry, index) => {
              const isFocused =
                focusedElement && entry.id === focusedElement.id;
              const isAutoZooming = autoZoomActive && focusedElement;

              return (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className={
                    isFocused
                      ? "cursor-pointer transition-all duration-500 drop-shadow-lg"
                      : "cursor-pointer transition-all duration-500 hover:opacity-90"
                  }
                  fillOpacity={isAutoZooming ? (isFocused ? 1.0 : 0.2) : 1.0}
                  stroke={isFocused ? "#3B82F6" : "#ffffff"}
                  strokeWidth={isFocused ? 8 : 2}
                  filter={isFocused ? "url(#magnifyGlow)" : undefined}
                  onMouseEnter={() => handleSegmentHover(entry, index)}
                  onMouseLeave={handleSegmentLeave}
                />
              );
            })}
          </Pie>
          <Tooltip
            content={<CustomTooltip valueFormatter={valueFormatter} />}
            cursor={false}
            wrapperStyle={{
              zIndex: 1000,
              pointerEvents: "none",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      {/* Round background for center label */}
      <div
        ref={containerRef}
        className="absolute bg-white rounded-full border border-gray-100 shadow-sm flex items-center justify-center pointer-events-none"
        style={{
          width: backgroundRadius * 2,
          height: backgroundRadius * 2,
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="text-center">
          <div
            ref={textRef}
            className="text-gray-900"
            style={{
              fontSize: fontSize,
              fontWeight: fontWeight,
              lineHeight: "1.2",
            }}
          >
            {getFormattedTotal(total)}
          </div>
          <div
            className={`${
              isPresentation ? "text-lg" : "text-sm"
            } text-gray-600 mt-1`}
          >
            {getUnitDisplayName()}
          </div>
        </div>
      </div>
    </div>
  );
};