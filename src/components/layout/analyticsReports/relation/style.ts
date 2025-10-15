// Professional color palette for customer analytics
export const colors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  tertiary: '#F59E0B',
  quaternary: '#8B5CF6',
  quinternary: '#EF4444',
  gradient: [
    '#3B82F6',
    '#10B981',
    '#F59E0B',
    '#8B5CF6',
    '#EF4444',
    '#06B6D4',
    '#F97316',
    '#84CC16',
  ],
};

// Common styles for the relation components
export const relationStyles = {
  // Summary metrics container
  summaryMetrics: 'grid grid-cols-4 lg:grid-cols-4 gap-4',

  // Metric card styles
  metricCard: {
    blue: 'bg-blue-50 p-4 rounded-lg border border-blue-200',
    green: 'bg-green-50 p-4 rounded-lg border border-green-200',
    purple: 'bg-purple-50 p-4 rounded-lg border border-purple-200',
    amber: 'bg-amber-50 p-4 rounded-lg border border-amber-200',
  },

  // Icon and text styles
  metricIcon: 'w-4 h-4',
  metricLabel: 'text-sm font-medium',
  metricValue: 'text-2xl font-semibold',
  metricSubtext: 'text-xs mt-1',

  // Header section
  headerSection: 'bg-white border border-gray-200 rounded-lg p-6',
  headerTitle: 'text-base font-semibold text-gray-900',
  headerSubtitle: 'text-sm text-gray-600 mt-1',

  // Chart container
  chartContainer: 'grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4',
  chartCard: 'bg-white border border-gray-200 rounded-lg p-6',
  chartTitle: 'text-base font-medium text-gray-900',

  // Product penetration styles
  productPenetrationCard:
    'bg-white border border-gray-200 rounded-lg p-6 h-[85vh] overflow-auto relative',
  productItem: 'space-y-2',
  productHeader: 'flex items-center justify-between',
  productTitle: 'font-medium text-gray-900',
  productAvg: 'text-sm text-blue-600 font-medium',
  productDetails: 'space-y-1',
  productRow: 'flex justify-between text-sm',
  productLabel: 'text-gray-600',
  productPercentage: 'text-gray-500',

  // Progress bar
  progressBar: 'w-full bg-gray-200 rounded-full h-2',
  progressFill: 'h-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600',

  // Legend styles
  legend:
    'flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100',
  legendItem: 'flex items-center gap-2',
  legendColor: 'w-3 h-3 rounded-sm',
  legendText: 'text-sm text-gray-600',

  // Insights section
  insightsSection:
    'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6',
  insightsTitle: 'text-base font-medium text-gray-900 mb-4',
  insightsGrid: 'grid grid-cols-1 lg:grid-cols-3 gap-6',
  insightCategory: 'space-y-3',
  insightHeader: 'font-medium',
  insightList: 'text-sm space-y-1',
  insightItem: 'text-gray-600',

  // Tooltip styles
  tooltip: 'bg-white p-4 border border-gray-200 rounded-lg shadow-lg',
  tooltipTitle: 'font-medium text-gray-900 mb-3',
  tooltipContent: 'space-y-2 text-sm',
  tooltipRow: 'flex justify-between',
  tooltipLabel: 'text-gray-600',
  tooltipValue: 'font-medium',
  tooltipDivider: 'border-t border-gray-200 pt-2',
  tooltipProductHeader: 'font-medium text-gray-700 mb-2',
  tooltipProductRow: 'space-y-1',
  tooltipProductItem: 'flex justify-between',
  tooltipProductColor: 'w-3 h-3 rounded-sm',
  tooltipHighlight: 'text-blue-600 font-medium',
};

// Chart dimensions and configurations
export const chartConfig = {
  margin: { top: 20, right: 30, left: 20, bottom: 5 },
  height: 380,
  barRadius: [4, 4, 0, 0],
  stackedBarRadius: [0, 0, 0, 0],
  topStackedBarRadius: [4, 4, 0, 0],
};
