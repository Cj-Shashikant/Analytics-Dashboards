// Entity/Organization options
export const ENTITIES = [
  'ABC Broking Pvt Ltd',
  'XYZ Insurance Agency',
  'PQR Financial Services',
  'DEF Risk Management',
] as const;

export type EntityType = (typeof ENTITIES)[number];

export const DEFAULT_ENTITY: EntityType = 'ABC Broking Pvt Ltd';
