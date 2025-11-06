// Dynamic Import Handler for Excel Files
import { store } from '../redux/store';

export const triggerExcelImport = async (
  onSuccess?: (fileName: string) => void,
  onError?: (error: string) => void
) => {
  try {
    console.log('Excel import triggered');

    // Create a hidden file input
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx,.xls,.csv';
    fileInput.style.display = 'none';

    // Handle file selection
    fileInput.onchange = async event => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) {
        onError?.('No file selected');
        return;
      }

      try {
        // Dynamically import the Excel parser
        const { parseExcelFile, validateExcelData } = await import(
          './excelParser'
        );
        const { setDynamicImportedData } = await import(
          '../redux/slices/importedDataSlice'
        );

        // Parse the Excel file
        const parsedData = await parseExcelFile(file);
        console.log('Parsed Excel data:', parsedData);

        // Validate the data
        const validation = validateExcelData(parsedData);
        if (!validation.isValid) {
          onError?.(`Validation failed: ${validation.errors.join(', ')}`);
          return;
        }

        // Convert parsed data to CommonDataItem format
        const convertedData = parsedData.map((item, index) => ({
          name:
            item['Product Name'] ||
            item['Insurer Name'] ||
            item['LOB Name'] ||
            item['Policy Type'] ||
            `Item ${index + 1}`,
          policies: item['No. of Policies'] || 0,
          premium: item['Premium'] || 0,
          revenue: item['Revenue'] || 0,
          revenuePercentage: item['Revenue Percentage'] || 0,
          color: item['Color'] || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
          value: item['Revenue'] || 0,
          percentage: item['Revenue Percentage'] || 0,
        }));

        // Calculate totals
        const totalRevenue = convertedData.reduce(
          (sum, item) => sum + item.revenue,
          0
        );
        const totalPolicies = convertedData.reduce(
          (sum, item) => sum + item.policies,
          0
        );
        const totalPremium = convertedData.reduce(
          (sum, item) => sum + item.premium,
          0
        );

        // Determine report type based on data structure
        let reportType:
          | 'Revenue by Products'
          | 'Revenue by Insurers'
          | 'Revenue by LOB'
          | 'Revenue by Policy Type' = 'Revenue by Products';
        if (parsedData.some(item => item['Insurer Name'])) {
          reportType = 'Revenue by Insurers';
        } else if (parsedData.some(item => item['LOB Name'])) {
          reportType = 'Revenue by LOB';
        } else if (parsedData.some(item => item['Policy Type'])) {
          reportType = 'Revenue by Policy Type';
        }

        // Dispatch to Redux store
        store.dispatch(
          setDynamicImportedData({
            fileName: file.name,
            data: convertedData,
            rawData: parsedData,
            totalRevenue,
            totalPolicies,
            totalPremium,
            reportType,
          })
        );

        onSuccess?.(file.name);
        console.log('Excel data successfully imported and stored in Redux');
      } catch (error) {
        console.error('Error processing Excel file:', error);
        onError?.(
          error instanceof Error
            ? error.message
            : 'Failed to process Excel file'
        );
      } finally {
        // Clean up
        document.body.removeChild(fileInput);
      }
    };

    // Add to DOM and trigger click
    document.body.appendChild(fileInput);
    fileInput.click();
  } catch (error) {
    console.error('Error in triggerExcelImport:', error);
    onError?.(
      error instanceof Error
        ? error.message
        : 'Failed to initialize Excel import'
    );
  }
};
