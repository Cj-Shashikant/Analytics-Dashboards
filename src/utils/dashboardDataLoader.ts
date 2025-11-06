// Dashboard Data Loader Utility
export const loadDataForReportType = (reportType: string) => {
  // Placeholder implementation - returns empty array
  console.log(`Loading data for report type: ${reportType}`);
  return [];
};

export const loadTotalsFromJson = () => {
  // Placeholder implementation - returns default totals
  return {
    totalRevenue: 0,
    totalExpenses: 0,
    grossProfit: 0,
  };
};

export const hasDataForReportType = (reportType: string) => {
  // Placeholder implementation - always returns false to use businessData
  void reportType;
  return false;
};
