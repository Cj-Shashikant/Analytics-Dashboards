// Business Data Filtering Utility - Excel-style filtering
import { BusinessDataItem } from '../redux/slices/businessData';

export interface FilterCriteria {
  durations?: string[];
  regions?: string[];
  clientTypes?: string[];
  products?: string[];
  insurers?: string[];
  policyTypes?: string[];
  lobs?: string[];
  businessVerticals?: string[];
}

export interface FilterOptions {
  durations: string[];
  regions: string[];
  clientTypes: string[];
  products: string[];
  insurers: string[];
  policyTypes: string[];
  lobs: string[];
  businessVerticals: string[];
}

/**
 * Extract unique filter options from business data
 */
export const extractFilterOptions = (
  data: BusinessDataItem[]
): FilterOptions => {
  const options: FilterOptions = {
    durations: [],
    regions: [],
    clientTypes: [],
    products: [],
    insurers: [],
    policyTypes: [],
    lobs: [],
    businessVerticals: [],
  };

  if (!data || !Array.isArray(data)) {
    return options;
  }

  const uniqueSets = {
    durations: new Set<string>(),
    regions: new Set<string>(),
    clientTypes: new Set<string>(),
    products: new Set<string>(),
    insurers: new Set<string>(),
    policyTypes: new Set<string>(),
    lobs: new Set<string>(),
    businessVerticals: new Set<string>(),
  };

  data.forEach(item => {
    if (item.Duration) uniqueSets.durations.add(item.Duration);
    if (item.Region) uniqueSets.regions.add(item.Region);
    if (item['Client Types']) uniqueSets.clientTypes.add(item['Client Types']);
    // Handle both Excel format and static data format for product names
    if (item['Product Name'] || item['Product name'])
      uniqueSets.products.add(item['Product Name'] || item['Product name']);
    // Handle both Excel format and static data format for insurer names
    if (item['Insurer Name'] || item['Insurer name'])
      uniqueSets.insurers.add(item['Insurer Name'] || item['Insurer name']);
    if (item['Policy Type']) uniqueSets.policyTypes.add(item['Policy Type']);
    // Handle both Excel format and static data format for LOB names
    if (item['LOB Name'] || item['LOB name'])
      uniqueSets.lobs.add(item['LOB Name'] || item['LOB name']);
    // Handle both correct and incorrect spelling of Business Vertical
    if (item['Business Vertical'] || item['Bussiness Vertical'])
      uniqueSets.businessVerticals.add(
        item['Business Vertical'] || item['Bussiness Vertical']
      );
  });

  // Convert sets to sorted arrays
  options.durations = Array.from(uniqueSets.durations).sort();
  options.regions = Array.from(uniqueSets.regions).sort();
  options.clientTypes = Array.from(uniqueSets.clientTypes).sort();
  options.products = Array.from(uniqueSets.products).sort();
  options.insurers = Array.from(uniqueSets.insurers).sort();
  options.policyTypes = Array.from(uniqueSets.policyTypes).sort();
  options.lobs = Array.from(uniqueSets.lobs).sort();
  options.businessVerticals = Array.from(uniqueSets.businessVerticals).sort();

  return options;
};

/**
 * Apply Excel-style filtering to business data
 * All selected filters work as AND conditions (intersection)
 */
export const applyBusinessDataFilters = (
  data: BusinessDataItem[],
  filters: FilterCriteria
): BusinessDataItem[] => {
  if (!data || !Array.isArray(data)) {
    return [];
  }

  const normalize = (val: any): string =>
    (val ?? '').toString().trim().toLowerCase();

  // Pre-normalize all selected filter values once (OR within each filter)
  const selected = {
    durations: new Set((filters.durations || []).map(normalize)),
    regions: new Set((filters.regions || []).map(normalize)),
    clientTypes: new Set((filters.clientTypes || []).map(normalize)),
    products: new Set((filters.products || []).map(normalize)),
    insurers: new Set((filters.insurers || []).map(normalize)),
    policyTypes: new Set((filters.policyTypes || []).map(normalize)),
    lobs: new Set((filters.lobs || []).map(normalize)),
    businessVerticals: new Set(
      (filters.businessVerticals || []).map(normalize)
    ),
  };

  const hasSelections = {
    durations: selected.durations.size > 0,
    regions: selected.regions.size > 0,
    clientTypes: selected.clientTypes.size > 0,
    products: selected.products.size > 0,
    insurers: selected.insurers.size > 0,
    policyTypes: selected.policyTypes.size > 0,
    lobs: selected.lobs.size > 0,
    businessVerticals: selected.businessVerticals.size > 0,
  };

  return data.filter(item => {
    // Duration (AND across filters)
    if (hasSelections.durations) {
      const v = normalize(item.Duration);
      if (!selected.durations.has(v)) return false;
    }

    // Region
    if (hasSelections.regions) {
      const v = normalize(item.Region);
      if (!selected.regions.has(v)) return false;
    }

    // Client Types
    if (hasSelections.clientTypes) {
      const v = normalize(item['Client Types']);
      if (!selected.clientTypes.has(v)) return false;
    }

    // Products (support both key casings)
    if (hasSelections.products) {
      const v = normalize(item['Product Name'] ?? item['Product name']);
      if (!selected.products.has(v)) return false;
    }

    // Insurers (support both key casings)
    if (hasSelections.insurers) {
      const v = normalize(item['Insurer Name'] ?? item['Insurer name']);
      if (!selected.insurers.has(v)) return false;
    }

    // Policy Types
    if (hasSelections.policyTypes) {
      const v = normalize(item['Policy Type']);
      if (!selected.policyTypes.has(v)) return false;
    }

    // LOB (support both key casings)
    if (hasSelections.lobs) {
      const v = normalize(item['LOB Name'] ?? item['LOB name']);
      if (!selected.lobs.has(v)) return false;
    }

    // Business Vertical (support both spellings)
    if (hasSelections.businessVerticals) {
      const v = normalize(
        item['Business Vertical'] ?? item['Bussiness Vertical']
      );
      if (!selected.businessVerticals.has(v)) return false;
    }

    return true;
  });
};

/**
 * Group filtered data by a specific field for analytics reports
 */
export const groupBusinessDataBy = (
  data: BusinessDataItem[],
  groupByField: keyof BusinessDataItem
): Array<{
  name: string;
  policies: number;
  premium: number;
  grossPremium: number;
  revenue: number;
  revenuePercentage: number;
  color: string;
  count: number;
}> => {
  const groupedMap = new Map<
    string,
    {
      policies: number;
      premium: number;
      grossPremium: number;
      revenue: number;
      revenuePercentage: number;
      color: string;
      count: number;
    }
  >();

  data.forEach(item => {
    const key = String(item[groupByField] || 'Unknown');

    if (groupedMap.has(key)) {
      const existing = groupedMap.get(key)!;
      existing.policies += item['No.of Policies'] || 0;
      existing.premium += item.Premium || 0;
      existing.grossPremium += item['Gross Premium'] || 0;
      existing.revenue += item.Revenue || 0;
      existing.count += 1;
      // Average the revenue percentage
      existing.revenuePercentage =
        (existing.revenuePercentage + (item['Revenue Percentage'] || 0)) / 2;
    } else {
      groupedMap.set(key, {
        policies: item['No.of Policies'] || 0,
        premium: item.Premium || 0,
        grossPremium: item['Gross Premium'] || 0,
        revenue: item.Revenue || 0,
        revenuePercentage: item['Revenue Percentage'] || 0,
        color:
          item.Color || `hsl(${(groupedMap.size * 137.5) % 360}, 70%, 50%)`,
        count: 1,
      });
    }
  });

  return Array.from(groupedMap.entries())
    .map(([name, data]) => ({
      name,
      ...data,
    }))
    .sort((a, b) => b.revenue - a.revenue); // Sort by revenue descending
};

/**
 * Calculate totals from filtered business data
 */
export const calculateBusinessDataTotals = (data: BusinessDataItem[]) => {
  return data.reduce(
    (totals, item) => ({
      totalPolicies: totals.totalPolicies + (item['No.of Policies'] || 0),
      totalPremium: totals.totalPremium + (item.Premium || 0),
      totalGrossPremium:
        totals.totalGrossPremium + (item['Gross Premium'] || 0),
      totalRevenue: totals.totalRevenue + (item.Revenue || 0),
      count: totals.count + 1,
    }),
    {
      totalPolicies: 0,
      totalPremium: 0,
      totalGrossPremium: 0,
      totalRevenue: 0,
      count: 0,
    }
  );
};

/**
 * Get report-specific data based on report type
 */
export const getReportData = (
  filteredData: BusinessDataItem[],
  reportType: string
): Array<{
  name: string;
  policies: number;
  premium: number;
  grossPremium: number;
  revenue: number;
  revenuePercentage: number;
  color: string;
  count: number;
}> => {
  switch (reportType) {
    case 'Revenue by Products':
      return groupBusinessDataBy(filteredData, 'Product name');
    case 'Revenue by Insurers':
      return groupBusinessDataBy(filteredData, 'Insurer name');
    case 'Revenue by Policy Type':
      return groupBusinessDataBy(filteredData, 'Policy Type');
    case 'Revenue by LOB':
      return groupBusinessDataBy(filteredData, 'LOB name');
    case 'Revenue by Vertical':
      return groupBusinessDataBy(filteredData, 'Bussiness Vertical');
    default:
      return groupBusinessDataBy(filteredData, 'Product name');
  }
};
