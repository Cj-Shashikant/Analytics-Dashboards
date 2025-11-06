// Excel Parser Utility
import * as XLSX from 'xlsx';

export interface ExcelDataItem {
  Duration?: string;
  Region?: string;
  'Client Types'?: string;
  'Product Name'?: string;
  'Insurer Name'?: string;
  'LOB Name'?: string;
  'Policy Type'?: string;
  'No. of Policies'?: number;
  Premium?: number;
  'Gross Premium'?: number;
  Revenue?: number;
  'Revenue Percentage'?: number;
  Color?: string;
  [key: string]: any; // Allow additional properties
}

export const parseExcelFile = async (file: File): Promise<ExcelDataItem[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = e => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });

        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: null,
        }) as any[][];

        if (jsonData.length === 0) {
          reject(new Error('Excel file is empty'));
          return;
        }

        // Get headers from first row
        const headers = jsonData[0] as string[];

        // Convert rows to objects
        const parsedData: ExcelDataItem[] = [];
        for (let i = 1; i < jsonData.length; i++) {
          const row = jsonData[i];
          const item: ExcelDataItem = {};

          headers.forEach((header, index) => {
            if (header && row[index] !== null && row[index] !== undefined) {
              // Handle numeric fields
              if (
                [
                  'No. of Policies',
                  'Premium',
                  'Gross Premium',
                  'Revenue',
                  'Revenue Percentage',
                ].includes(header)
              ) {
                item[header] =
                  typeof row[index] === 'number'
                    ? row[index]
                    : parseFloat(row[index]) || 0;
              } else {
                item[header] = row[index];
              }
            }
          });

          // Only add rows that have at least some data
          if (Object.keys(item).length > 0) {
            parsedData.push(item);
          }
        }

        console.log('Parsed Excel data:', parsedData);
        resolve(parsedData);
      } catch (error) {
        console.error('Error parsing Excel file:', error);
        reject(
          new Error(
            "Failed to parse Excel file. Please ensure it's a valid Excel file."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read the file'));
    };

    reader.readAsArrayBuffer(file);
  });
};

export const validateExcelData = (data: ExcelDataItem[]) => {
  const errors: string[] = [];
  const requiredColumns = [
    'Duration',
    'Region',
    'Client Types',
    'Product Name',
    'Insurer Name',
    'LOB Name',
    'Policy Type',
    'No. of Policies',
    'Premium',
    'Gross Premium',
    'Revenue',
    'Revenue Percentage',
    'Color',
  ];

  if (data.length === 0) {
    errors.push('No data found in Excel file');
    return { isValid: false, errors };
  }

  // Check if required columns exist in at least one row
  const firstRow = data[0];
  const availableColumns = Object.keys(firstRow);

  const missingColumns = requiredColumns.filter(
    col => !availableColumns.includes(col)
  );
  if (missingColumns.length > 0) {
    errors.push(`Missing required columns: ${missingColumns.join(', ')}`);
  }

  // Validate data types for numeric fields
  const numericFields = [
    'No. of Policies',
    'Premium',
    'Gross Premium',
    'Revenue',
    'Revenue Percentage',
  ];
  data.forEach((row, index) => {
    numericFields.forEach(field => {
      if (
        row[field] !== undefined &&
        row[field] !== null &&
        isNaN(Number(row[field]))
      ) {
        errors.push(`Row ${index + 2}: ${field} should be a number`);
      }
    });
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
