import { DepartmentType } from './departments';

// Location options by department
export const LOCATIONS_BY_DEPARTMENT = {
  'Business': [
    'All Location',
    'Mumbai',
    'Delhi',
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Pune',
    'Kolkata',
    'Ahmedabad'
  ],
  'Operations': [
    'All Location',
    'Mumbai HQ',
    'Delhi Operations',
    'Bangalore Tech Hub',
    'Chennai Support',
    'Hyderabad Center',
    'Pune Office',
    'Remote Teams'
  ],
  'Finance': [
    'All Location',
    'Mumbai Finance',
    'Delhi Treasury',
    'Bangalore Accounts',
    'Chennai Audit',
    'Corporate Finance',
    'Regional Finance'
  ],
  'Marketing': [
    'All Location',
    'Mumbai Marketing',
    'Delhi Campaign',
    'Bangalore Digital',
    'Chennai Creative',
    'National Marketing',
    'Regional Marketing'
  ],
  'Sales': [
    'All Location',
    'Mumbai Sales',
    'Delhi Sales',
    'Bangalore Sales',
    'Chennai Sales',
    'Hyderabad Sales',
    'Pune Sales',
    'Kolkata Sales',
    'Ahmedabad Sales',
    'Online Sales'
  ],
  'Retention': [
    'All Location',
    'Mumbai Retention',
    'Delhi Retention',
    'Bangalore Retention',
    'Chennai Retention',
    'Regional Retention',
    'Corporate Retention',
    'Retail Retention'
  ],
  'Customer Analysis': [
    'All Location'
  ]
} as const;

export type LocationType = typeof LOCATIONS_BY_DEPARTMENT[keyof typeof LOCATIONS_BY_DEPARTMENT][number];

export const getLocationOptions = (department: DepartmentType): readonly string[] => {
  return LOCATIONS_BY_DEPARTMENT[department] || ['All Location'];
};

export const DEFAULT_LOCATION: LocationType = 'All Location';