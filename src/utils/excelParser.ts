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

  if (data.length === 0) {
    errors.push('No data found in Excel file');
    return { isValid: false, errors };
  }

  // Relaxed validation: ensure presence of at least one grouping column
  // and at least one premium column (Net or Gross)
  const normalize = (s: string) => s.trim().toLowerCase();
  const keys = Object.keys(data[0]).map(normalize);

  const hasProduct = keys.some(
    k => k.includes('product') && k.includes('name')
  );
  const hasInsurer = keys.some(
    k => k.includes('insurer') && k.includes('name')
  );
  const hasLob = keys.some(k => k.includes('lob'));
  const hasPolicyType = keys.some(
    k => k.includes('policy') && k.includes('type')
  );

  const hasNetPremium =
    keys.some(k => k.includes('net') && k.includes('premium')) ||
    keys.includes('premium');
  const hasGrossPremium =
    keys.some(k => k.includes('gross') && k.includes('premium')) ||
    keys.includes('revenue');

  if (!(hasProduct || hasInsurer || hasLob || hasPolicyType)) {
    errors.push('Missing grouping columns: Product/Insurer/LOB/Policy Type');
  }
  if (!(hasNetPremium || hasGrossPremium)) {
    errors.push('Missing premium columns: Net Premium or Gross Premium');
  }

  // Validate numeric fields when present
  const numericCandidates = [
    'No. of Policies',
    'No.of Policies',
    'Policy No',
    'Net Premium',
    'Premium',
    'Gross Premium',
    'Revenue',
  ];
  data.forEach((row, index) => {
    Object.keys(row).forEach(key => {
      const norm = normalize(key);
      if (
        numericCandidates.some(c => normalize(c) === norm) &&
        row[key] !== undefined &&
        row[key] !== null &&
        row[key] !== '' &&
        isNaN(Number(row[key]))
      ) {
        errors.push(`Row ${index + 2}: ${key} should be a number`);
      }
    });
  });

  return { isValid: errors.length === 0, errors };
};
