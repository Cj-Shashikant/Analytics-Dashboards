// Value Unit options
export const VALUE_UNITS = ['K', 'L', 'Cr'] as const;

export type ValueUnitType = (typeof VALUE_UNITS)[number];

export const DEFAULT_VALUE_UNIT: ValueUnitType = 'Cr';

// Value unit display names
export const VALUE_UNIT_DISPLAY = {
  K: 'Thousands',
  L: 'Lakhs',
  Cr: 'Crores',
} as const;
