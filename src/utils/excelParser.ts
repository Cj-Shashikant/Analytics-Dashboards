import * as XLSX from 'xlsx';

export interface ExcelDataStructure {
  totalRevenue: number;
  expenses: number;
  grossProfit: number;
  netProfit: number;
  revenueGrowth: number;
  expenseGrowth: number;
  profitMargin: number;
  productData: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    growth: number;
    percentage: number;
    color: string;
  }>;
  insurerData: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;
  locationPerformance: Array<{
    location: string;
    revenue: number;
    growth: number;
    target: number;
  }>;
  monthlyTrends: Array<{
    month: string;
    revenue: number;
    expenses: number;
    profit: number;
  }>;
  policyTypeData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    growth: number;
    percentage: number;
    color: string;
  }>;
  lobData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    growth: number;
    percentage: number;
    color: string;
  }>;
  verticalData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    growth: number;
    percentage: number;
    color: string;
  }>;
  retentionByInsurerData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;
  retentionByBrokerData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    retention: number;
    premium: number;
    revenuePercentage: number;
    color: string;
  }>;
  numberOfProductData?: Array<{
    name: string;
    revenue: number;
    policies: number;
    premium: number;
    revenuePercentage: number;
    growth: number;
    percentage: number;
    color: string;
  }>;
}

// Default colors for charts
const defaultColors = [
  '#4C9AFF',
  '#00C7B7',
  '#FF715B',
  '#FFCE56',
  '#9C27B0',
  '#FF9800',
  '#4CAF50',
  '#F44336',
  '#2196F3',
  '#795548',
];

export const parseExcelFile = (file: File): Promise<ExcelDataStructure> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Initialize result structure
        const result: ExcelDataStructure = {
          totalRevenue: 0,
          expenses: 0,
          grossProfit: 0,
          netProfit: 0,
          revenueGrowth: 0,
          expenseGrowth: 0,
          profitMargin: 0,
          productData: [],
          insurerData: [],
          locationPerformance: [],
          monthlyTrends: [],
          policyTypeData: [],
          lobData: [],
          verticalData: [],
          retentionByInsurerData: [],
          retentionByBrokerData: [],
          numberOfProductData: [],
        };

        // Parse Main Metrics sheet
        if (workbook.SheetNames.includes('Main Metrics')) {
          const mainSheet = workbook.Sheets['Main Metrics'];
          const mainData = XLSX.utils.sheet_to_json(mainSheet, {
            header: 1,
          }) as any[][];

          // Parse main metrics (assuming specific cell positions)
          for (let i = 0; i < mainData.length; i++) {
            const row = mainData[i];
            if (row[0] === 'Total Revenue')
              result.totalRevenue = Number(row[1]) || 0;
            if (row[0] === 'Expenses') result.expenses = Number(row[1]) || 0;
            if (row[0] === 'Gross Profit')
              result.grossProfit = Number(row[1]) || 0;
            if (row[0] === 'Net Profit') result.netProfit = Number(row[1]) || 0;
            if (row[0] === 'Revenue Growth')
              result.revenueGrowth = Number(row[1]) || 0;
            if (row[0] === 'Expense Growth')
              result.expenseGrowth = Number(row[1]) || 0;
            if (row[0] === 'Profit Margin')
              result.profitMargin = Number(row[1]) || 0;
          }
        }

        // Parse Product Data sheet
        if (workbook.SheetNames.includes('Product Data')) {
          const productSheet = workbook.Sheets['Product Data'];
          const productData = XLSX.utils.sheet_to_json(productSheet) as any[];

          result.productData = productData.map((row, index) => ({
            name: row['Product Name'] || row['Name'] || '',
            revenue: Number(row['Revenue']) || 0,
            policies: Number(row['No.of Policies'] || row['Policies']) || 0,
            premium: Number(row['Premium']) || 0,
            revenuePercentage: Number(row['Revenue Percentage']) || 0,
            growth: Number(row['Growth']) || 0,
            percentage: Number(row['Percentage']) || 0,
            color: row['Color'] || defaultColors[index % defaultColors.length],
          }));
        }

        // Parse Insurer Data sheet
        if (workbook.SheetNames.includes('Insurer Data')) {
          const insurerSheet = workbook.Sheets['Insurer Data'];
          const insurerData = XLSX.utils.sheet_to_json(insurerSheet) as any[];

          result.insurerData = insurerData.map((row, index) => ({
            name: row['Insurer Name'] || row['Name'] || '',
            revenue: Number(row['Revenue']) || 0,
            policies: Number(row['Policies']) || 0,
            retention: Number(row['Retention']) || 0,
            premium: Number(row['Premium']) || 0,
            revenuePercentage: Number(row['Revenue Percentage']) || 0,
            color: row['Color'] || defaultColors[index % defaultColors.length],
          }));
        }

        // Parse Location Performance sheet
        if (workbook.SheetNames.includes('Location Performance')) {
          const locationSheet = workbook.Sheets['Location Performance'];
          const locationData = XLSX.utils.sheet_to_json(locationSheet) as any[];

          result.locationPerformance = locationData.map(row => ({
            location: row['Location'] || '',
            revenue: Number(row['Revenue']) || 0,
            growth: Number(row['Growth']) || 0,
            target: Number(row['Target']) || 0,
          }));
        }

        // Parse Monthly Trends sheet
        if (workbook.SheetNames.includes('Monthly Trends')) {
          const trendsSheet = workbook.Sheets['Monthly Trends'];
          const trendsData = XLSX.utils.sheet_to_json(trendsSheet) as any[];

          result.monthlyTrends = trendsData.map(row => ({
            month: row['Month'] || '',
            revenue: Number(row['Revenue']) || 0,
            expenses: Number(row['Expenses']) || 0,
            profit: Number(row['Profit']) || 0,
          }));
        }

        // Parse Policy Type Data sheet
        if (workbook.SheetNames.includes('Policy Type Data')) {
          const policyTypeSheet = workbook.Sheets['Policy Type Data'];
          const policyTypeData = XLSX.utils.sheet_to_json(
            policyTypeSheet
          ) as any[];

          result.policyTypeData = policyTypeData.map((row, index) => ({
            name: row['Policy Type'] || row['Name'] || '',
            revenue: Number(row['Revenue']) || 0,
            policies: Number(row['No.of Policies'] || row['Policies']) || 0,
            premium: Number(row['Premium']) || 0,
            revenuePercentage: Number(row['Revenue Percentage']) || 0,
            growth: Number(row['Growth']) || 0,
            percentage: Number(row['Percentage']) || 0,
            color: row['Color'] || defaultColors[index % defaultColors.length],
          }));
        }

        // Parse LOB Data sheet
        if (workbook.SheetNames.includes('LOB Data')) {
          const lobSheet = workbook.Sheets['LOB Data'];
          const lobData = XLSX.utils.sheet_to_json(lobSheet) as any[];

          result.lobData = lobData.map((row, index) => ({
            name: row['LOB'] || row['Name'] || '',
            revenue: Number(row['Revenue']) || 0,
            policies: Number(row['No.of Policies'] || row['Policies']) || 0,
            premium: Number(row['Premium']) || 0,
            revenuePercentage: Number(row['Revenue Percentage']) || 0,
            growth: Number(row['Growth']) || 0,
            percentage: Number(row['Percentage']) || 0,
            color: row['Color'] || defaultColors[index % defaultColors.length],
          }));
        }

        // Parse Vertical Data sheet
        if (workbook.SheetNames.includes('Vertical Data')) {
          const verticalSheet = workbook.Sheets['Vertical Data'];
          const verticalData = XLSX.utils.sheet_to_json(verticalSheet) as any[];

          result.verticalData = verticalData.map((row, index) => ({
            name: row['Vertical'] || row['Name'] || '',
            revenue: Number(row['Revenue']) || 0,
            policies: Number(row['No.of Policies'] || row['Policies']) || 0,
            premium: Number(row['Premium']) || 0,
            revenuePercentage: Number(row['Revenue Percentage']) || 0,
            growth: Number(row['Growth']) || 0,
            percentage: Number(row['Percentage']) || 0,
            color: row['Color'] || defaultColors[index % defaultColors.length],
          }));
        }

        // Parse Retention by Insurer Data sheet
        if (workbook.SheetNames.includes('Retention by Insurer Data')) {
          const retentionInsurerSheet =
            workbook.Sheets['Retention by Insurer Data'];
          const retentionInsurerData = XLSX.utils.sheet_to_json(
            retentionInsurerSheet
          ) as any[];

          result.retentionByInsurerData = retentionInsurerData.map(
            (row, index) => ({
              name: row['Insurer Name'] || row['Name'] || '',
              revenue: Number(row['Revenue']) || 0,
              policies: Number(row['No.of Policies'] || row['Policies']) || 0,
              retention: Number(row['Retention']) || 0,
              premium: Number(row['Premium']) || 0,
              revenuePercentage: Number(row['Revenue Percentage']) || 0,
              color:
                row['Color'] || defaultColors[index % defaultColors.length],
            })
          );
        }

        // Parse Retention by Broker Data sheet
        if (workbook.SheetNames.includes('Retention by Broker Data')) {
          const retentionBrokerSheet =
            workbook.Sheets['Retention by Broker Data'];
          const retentionBrokerData = XLSX.utils.sheet_to_json(
            retentionBrokerSheet
          ) as any[];

          result.retentionByBrokerData = retentionBrokerData.map(
            (row, index) => ({
              name: row['Broker Name'] || row['Name'] || '',
              revenue: Number(row['Revenue']) || 0,
              policies: Number(row['No.of Policies'] || row['Policies']) || 0,
              retention: Number(row['Retention']) || 0,
              premium: Number(row['Premium']) || 0,
              revenuePercentage: Number(row['Revenue Percentage']) || 0,
              color:
                row['Color'] || defaultColors[index % defaultColors.length],
            })
          );
        }

        // Parse Number of Product Data sheet
        if (workbook.SheetNames.includes('Number of Product Data')) {
          const numberOfProductSheet =
            workbook.Sheets['Number of Product Data'];
          const numberOfProductData = XLSX.utils.sheet_to_json(
            numberOfProductSheet
          ) as any[];

          result.numberOfProductData = numberOfProductData.map(
            (row, index) => ({
              name: row['Product Name'] || row['Name'] || '',
              revenue: Number(row['Revenue']) || 0,
              policies: Number(row['No.of Policies'] || row['Policies']) || 0,
              premium: Number(row['Premium']) || 0,
              revenuePercentage: Number(row['Revenue Percentage']) || 0,
              growth: Number(row['Growth']) || 0,
              percentage: Number(row['Percentage']) || 0,
              color:
                row['Color'] || defaultColors[index % defaultColors.length],
            })
          );
        }

        resolve(result);
      } catch (error) {
        reject(new Error(`Failed to parse Excel file: ${error}`));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

// Function to create a sample Excel file with dummy data
export const createSampleExcelFile = (): void => {
  const wb = XLSX.utils.book_new();

  // Main Metrics sheet
  const mainMetrics = [
    ['Metric', 'Value'],
    ['Total Revenue', 240000000],
    ['Expenses', 153467000],
    ['Gross Profit', 86533000],
    ['Net Profit', 72000000],
    ['Revenue Growth', 12.5],
    ['Expense Growth', 8.3],
    ['Profit Margin', 30.0],
  ];
  const mainSheet = XLSX.utils.aoa_to_sheet(mainMetrics);
  XLSX.utils.book_append_sheet(wb, mainSheet, 'Main Metrics');

  // Product Data sheet
  const productData = [
    ['Product Name', 'Revenue', 'Growth', 'Percentage', 'Color'],
    ['Motor Insurance', 95000000, 15.2, 39.6, '#4C9AFF'],
    ['Health Insurance', 72000000, 22.8, 30.0, '#00C7B7'],
    ['Life Insurance', 48000000, 8.5, 20.0, '#FF715B'],
    ['Property Insurance', 25000000, -2.1, 10.4, '#FFCE56'],
  ];
  const productSheet = XLSX.utils.aoa_to_sheet(productData);
  XLSX.utils.book_append_sheet(wb, productSheet, 'Product Data');

  // Insurer Data sheet
  const insurerData = [
    ['Insurer Name', 'Revenue', 'Policies', 'Retention', 'Color'],
    ['HDFC ERGO', 85000000, 12500, 92.5, '#4C9AFF'],
    ['ICICI Lombard', 68000000, 9800, 89.2, '#00C7B7'],
    ['Bajaj Allianz', 52000000, 7600, 87.8, '#FF715B'],
    ['Tata AIG', 35000000, 5200, 85.1, '#FFCE56'],
  ];
  const insurerSheet = XLSX.utils.aoa_to_sheet(insurerData);
  XLSX.utils.book_append_sheet(wb, insurerSheet, 'Insurer Data');

  // Location Performance sheet
  const locationData = [
    ['Location', 'Revenue', 'Growth', 'Target'],
    ['Mumbai', 85000000, 18.5, 80000000],
    ['Delhi', 62000000, 12.3, 65000000],
    ['Bangalore', 48000000, 25.7, 45000000],
    ['Chennai', 32000000, 8.9, 35000000],
    ['Hyderabad', 13000000, 15.2, 12000000],
  ];
  const locationSheet = XLSX.utils.aoa_to_sheet(locationData);
  XLSX.utils.book_append_sheet(wb, locationSheet, 'Location Performance');

  // Monthly Trends sheet
  const monthlyData = [
    ['Month', 'Revenue', 'Expenses', 'Profit'],
    ['Apr 2023', 18500000, 12200000, 6300000],
    ['May 2023', 19200000, 12800000, 6400000],
    ['Jun 2023', 20800000, 13500000, 7300000],
    ['Jul 2023', 21500000, 13900000, 7600000],
    ['Aug 2023', 22100000, 14200000, 7900000],
    ['Sep 2023', 23200000, 14800000, 8400000],
    ['Oct 2023', 24000000, 15200000, 8800000],
    ['Nov 2023', 24800000, 15600000, 9200000],
    ['Dec 2023', 25500000, 16000000, 9500000],
    ['Jan 2024', 26200000, 16400000, 9800000],
    ['Feb 2024', 26800000, 16800000, 10000000],
    ['Mar 2024', 27500000, 17200000, 10300000],
  ];
  const monthlySheet = XLSX.utils.aoa_to_sheet(monthlyData);
  XLSX.utils.book_append_sheet(wb, monthlySheet, 'Monthly Trends');

  // Download the file
  XLSX.writeFile(wb, 'analytics_sample_data.xlsx');
};
