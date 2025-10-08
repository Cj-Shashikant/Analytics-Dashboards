// Department/Business Type options
export const DEPARTMENTS = [
  'Business',
  'Operations',
  'Finance',
  'Marketing',
  'Sales',
  'Retention',
  'Customer Analysis',
] as const;

export type DepartmentType = (typeof DEPARTMENTS)[number];

export const DEFAULT_DEPARTMENT: DepartmentType = 'Business';
