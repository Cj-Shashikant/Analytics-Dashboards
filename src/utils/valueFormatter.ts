/**
 * Utility functions for formatting values based on selected value unit
 */

export type ValueUnitType = 'K' | 'L' | 'Cr';

/**
 * Formats a numeric value based on the selected value unit
 * @param value - The numeric value to format
 * @param valueUnit - The unit to format to ('K' for thousands, 'L' for lakhs, 'Cr' for crores)
 * @returns Formatted string with currency symbol and appropriate decimal places
 */
export const getFormattedValue = (value: number, valueUnit: ValueUnitType): string => {
  if (valueUnit === 'Cr') {
    return `₹${(value / 10000000).toFixed(2)}`;
  } else if (valueUnit === 'L') {
    return `₹${(value / 100000).toFixed(2)}`;
  } else if (valueUnit === 'K') {
    return `₹${(value / 1000).toFixed(2)}`;
  }
  return `₹${value.toLocaleString('en-IN')}`;
};

/**
 * Gets the unit label for display purposes
 * @param valueUnit - The value unit type
 * @returns Human readable unit label
 */
export const getUnitLabel = (valueUnit: ValueUnitType): string => {
  switch (valueUnit) {
    case 'K':
      return 'Thousands';
    case 'L':
      return 'Lakhs';
    case 'Cr':
      return 'Crores';
    default:
      return 'Units';
  }
};

/**
 * Gets the unit symbol for display
 * @param valueUnit - The value unit type
 * @returns Unit symbol
 */
export const getUnitSymbol = (valueUnit: ValueUnitType): string => {
  switch (valueUnit) {
    case 'K':
      return 'K';
    case 'L':
      return 'L';
    case 'Cr':
      return 'Cr';
    default:
      return '';
  }
};

/**
 * Converts a value to the specified unit without formatting
 * @param value - The numeric value to convert
 * @param valueUnit - The unit to convert to
 * @returns Converted numeric value
 */
export const convertValue = (value: number, valueUnit: ValueUnitType): number => {
  if (valueUnit === 'Cr') {
    return value / 10000000;
  } else if (valueUnit === 'L') {
    return value / 100000;
  } else if (valueUnit === 'K') {
    return value / 1000;
  }
  return value;
};

/**
 * Formats value for chart tooltips and labels
 * @param value - The numeric value to format
 * @param valueUnit - The unit to format to
 * @returns Formatted string suitable for charts
 */
export const formatChartValue = (value: number, valueUnit: ValueUnitType): string => {
  const formattedValue = getFormattedValue(value, valueUnit);
  const unitLabel = getUnitLabel(valueUnit);
  return `${formattedValue} ${unitLabel}`;
};