// Common CSS styles for chart components

export const commonStyles = {
  container: 'space-y-4',
  splitLayout: 'grid grid-cols-1 lg:grid-cols-2 gap-6',
  leftSection: 'lg:col-span-1',
  chartCard: 'p-2 flex flex-col gap-1',
  chartHeader: 'flex items-center justify-between h-16 flex-shrink-0',
  chartTitle: 'text-lg font-semibold text-gray-900 mb-1',
  chartSubtitle: 'text-sm text-gray-600',
  selectTrigger: 'w-18 h-9 text-xs text-black',
  chartContainer: 'flex-1 relative min-h-[350px]',
  chartWrapper: 'w-full h-full',
};

// Chart dimension constants
export const chartDimensions = {
  height: 350,
  innerRadius: 60,
  outerRadius: 110,
};

// Common filter options
export const topFilterOptions = [
  'Top 5',
  'Top 10',
  'Top 15',
  'Top 20',
  'Top 30',
  'Top 50',
  'All',
];

// Common subtitle text generators
export const getChartSubtitle = (
  selectedReportType: string,
  topFilter: string
) => {
  const typeMap: Record<string, string> = {
    'Revenue by Vertical': 'business verticals',
    'Revenue by LOB': 'lines of business',
    'Revenue by Policy Type': 'policy types',
    'Revenue by Insurers': 'insurance partners',
    'Revenue by Products': 'product categories',
    'Cross-Sell Penetration': 'cross-sell combinations',
  };

  return `${topFilter} distribution of revenue across ${typeMap[selectedReportType] || 'categories'}`;
};

// Products List Styles
export const productsListStyles = {
  container:
    'bg-card text-card-foreground gap-6 rounded-xl border p-2 flex flex-col',

  header: {
    wrapper: 'flex items-center justify-between mb-2 h-16 flex-shrink-0',
    icon: 'w-5 h-5 text-blue-600',
    title: 'font-medium text-gray-900',
  },

  table: {
    headerRow: 'grid gap-4 pb-3 mb-3 border-b border-gray-200',
    headerCell: 'text-sm font-normal text-gray-700 text-center',
    headerCellCenter: 'text-sm font-normal text-gray-700 text-center',
    headerCellRight:
      'text-sm font-normal text-gray-700 text-center flex items-center',
    body: 'space-y-2 flex-1 overflow-y-auto min-h-0',
  },

  productRow: {
    container:
      'grid gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer items-center',
    productColumn: 'flex items-center gap-3',
    colorIndicator: 'w-3 h-3 rounded-full flex-shrink-0',
    productInfo: 'min-w-0',
    productName: 'font-medium text-gray-900 text-sm',
    productDescription: 'text-xs text-gray-500',
    centerColumn: 'text-center',
    rightColumn: 'text-center',
    cellValue: 'font-medium text-gray-900 text-sm',
  },
};
