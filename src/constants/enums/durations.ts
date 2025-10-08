// Duration/Time Period options
export const DURATIONS = [
  'FY 2023-24',
  'FY 2022-23',
  'FY 2021-22',
  'Q4 2023-24',
  'Q3 2023-24',
  'Q2 2023-24',
  'Q1 2023-24',
  'Custom Period',
] as const;

export type DurationType = (typeof DURATIONS)[number];

export const DEFAULT_DURATION: DurationType = 'FY 2023-24';
