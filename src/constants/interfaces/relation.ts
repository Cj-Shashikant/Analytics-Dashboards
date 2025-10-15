// Interface for product distribution within each duration segment
export interface ProductDistribution {
  oneProduct: number;
  twoProducts: number;
  threeOrMore: number;
}

// Interface for duration of relationship data
export interface DurationData {
  duration: string;
  customers: number;
  percentage: number;
  avgPremium: number;
  avgProducts: number;
  productDistribution: ProductDistribution;
  color: string;
}

// Interface for summary metrics
export interface RelationSummaryMetrics {
  totalCustomers: number;
  retentionRate: number;
  avgPremium: number;
  crossSellSuccess: number;
  avgRelationshipDuration: number;
  avgProductsPerCustomer: number;
}

// Interface for component props
export interface DurationOfRelationshipProps {
  valueUnit: string;
  currentFilters?: {
    selectedEntity: string;
    selectedReportType: string;
    selectedBusinessType: string;
    selectedLocation: string;
    selectedDuration: string;
    valueUnit: string;
  };
  onPlayFullView?: (filters: any, chartData: any, chartType?: string) => void;
}

// Interface for product penetration component props
export interface ProductPenetrationProps {
  durationData: DurationData[];
}

// Interface for insight categories
export interface InsightCategory {
  title: string;
  emoji: string;
  color: string;
  insights: string[];
}

// Interface for relation state in Redux
export interface RelationState {
  durationData: DurationData[];
  summaryMetrics: RelationSummaryMetrics;
  insights: InsightCategory[];
  loading: boolean;
  error: string | null;
}
