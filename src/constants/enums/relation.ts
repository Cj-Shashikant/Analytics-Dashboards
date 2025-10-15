// Enum for duration categories
export enum DurationCategory {
  LESS_THAN_ONE_YEAR = '<1 Year',
  ONE_TO_THREE_YEARS = '1-3 Years',
  THREE_TO_FIVE_YEARS = '3-5 Years',
  FIVE_TO_TEN_YEARS = '5-10 Years',
  MORE_THAN_TEN_YEARS = '10+ Years',
}

// Enum for product count categories
export enum ProductCountCategory {
  ONE_PRODUCT = 'oneProduct',
  TWO_PRODUCTS = 'twoProducts',
  THREE_OR_MORE = 'threeOrMore',
}

// Enum for metric types
export enum MetricType {
  TOTAL_CUSTOMERS = 'totalCustomers',
  RETENTION_RATE = 'retentionRate',
  AVG_PREMIUM = 'avgPremium',
  CROSS_SELL_SUCCESS = 'crossSellSuccess',
}

// Enum for insight categories
export enum InsightCategoryType {
  LOYALTY_PATTERNS = 'loyalty',
  GROWTH_OPPORTUNITIES = 'growth',
  RETENTION_STRATEGY = 'retention',
}

// Enum for chart types
export enum ChartType {
  STACKED_BAR = 'stackedBar',
  SIMPLE_BAR = 'simpleBar',
}

// Enum for color themes
export enum ColorTheme {
  PRIMARY = '#3B82F6',
  SECONDARY = '#10B981',
  TERTIARY = '#F59E0B',
  QUATERNARY = '#8B5CF6',
  QUINTERNARY = '#EF4444',
}

// Enum for value units
export enum ValueUnit {
  CRORE = 'Crore',
  LAKH = 'Lakh',
  THOUSANDS = 'Thousands',
  RUPEES = 'Rupees',
}

// Enum for loading states
export enum LoadingState {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
}
