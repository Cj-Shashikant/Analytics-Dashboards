// Revenue Related Enums

export enum RevenueReportType {
  REVENUE_BY_INSURERS = 'Revenue by Insurers',
  REVENUE_BY_POLICY_TYPE = 'Revenue by Policy Type',
  REVENUE_BY_VERTICAL = 'Revenue by Vertical',
  REVENUE_BY_LOB = 'Revenue by LOB',
  REVENUE_BY_PRODUCTS = 'Revenue by Products',
  CROSS_SELL_PENETRATION = 'Cross-Sell Penetration',
  REVENUE_VS_EXPENSES = 'Revenue vs Expenses',
}

export enum ClientType {
  CORPORATE = 'Corporate',
  RETAIL = 'Retail',
  AFFINITY = 'Affinity',
}

export enum InsuranceVertical {
  LIFE_HEALTH = 'Life & Health',
  PROPERTY_CASUALTY = 'Property & Casualty',
  COMMERCIAL_LINES = 'Commercial Lines',
  SPECIALTY_LINES = 'Specialty Lines',
  REINSURANCE = 'Reinsurance',
  INTERNATIONAL = 'International',
  DIGITAL_INSURANCE = 'Digital Insurance',
  BANCASSURANCE = 'Bancassurance',
  MICROINSURANCE = 'Microinsurance',
  CROP_INSURANCE = 'Crop Insurance',
  CYBER_INSURANCE = 'Cyber Insurance',
  PARAMETRIC_INSURANCE = 'Parametric Insurance',
  CLIMATE_INSURANCE = 'Climate Insurance',
  INSURTECH = 'InsurTech',
  PEER_TO_PEER = 'Peer-to-Peer',
}

export enum PolicyType {
  HEALTH_INSURANCE = 'Health Insurance',
  MOTOR_INSURANCE = 'Motor Insurance',
  LIFE_INSURANCE = 'Life Insurance',
  PROPERTY_INSURANCE = 'Property Insurance',
  TRAVEL_INSURANCE = 'Travel Insurance',
  MARINE_INSURANCE = 'Marine Insurance',
  FIRE_INSURANCE = 'Fire Insurance',
  PERSONAL_ACCIDENT_INSURANCE = 'Personal Accident Insurance',
  PROFESSIONAL_INDEMNITY_INSURANCE = 'Professional Indemnity Insurance',
  PUBLIC_LIABILITY_INSURANCE = 'Public Liability Insurance',
  PRODUCT_LIABILITY_INSURANCE = 'Product Liability Insurance',
  DIRECTORS_OFFICERS_INSURANCE = 'Directors & Officers Insurance',
  EMPLOYMENT_PRACTICES_LIABILITY = 'Employment Practices Liability',
  CYBER_LIABILITY_INSURANCE = 'Cyber Liability Insurance',
  KEY_PERSON_INSURANCE = 'Key Person Insurance',
  BUSINESS_INTERRUPTION_INSURANCE = 'Business Interruption Insurance',
  EQUIPMENT_INSURANCE = 'Equipment Insurance',
  CARGO_INSURANCE = 'Cargo Insurance',
  CREDIT_INSURANCE = 'Credit Insurance',
  FIDELITY_GUARANTEE_INSURANCE = 'Fidelity Guarantee Insurance',
  WORKMEN_COMPENSATION_INSURANCE = 'Workmen Compensation Insurance',
  GROUP_PERSONAL_ACCIDENT = 'Group Personal Accident',
  GROUP_HEALTH_INSURANCE = 'Group Health Insurance',
  TERM_LIFE_INSURANCE = 'Term Life Insurance',
  WHOLE_LIFE_INSURANCE = 'Whole Life Insurance',
}

export enum LOBType {
  EMPLOYEE_BENEFIT = 'Employee Benefit',
  PROPERTY_ENGINEERING = 'Property & Engineering',
  MARINE = 'Marine',
  SPECIE = 'Specie',
  SPECIALITIES = 'Specialities',
}

export enum ExpenseCategory {
  COMMISSION_BROKERAGE = 'Commission & Brokerage',
  EMPLOYEE_COSTS = 'Employee Costs',
  TECHNOLOGY_IT = 'Technology & IT',
  OFFICE_ADMINISTRATION = 'Office & Administration',
  MARKETING_ADVERTISING = 'Marketing & Advertising',
  PROFESSIONAL_SERVICES = 'Professional Services',
  TRAVEL_ENTERTAINMENT = 'Travel & Entertainment',
  TRAINING_DEVELOPMENT = 'Training & Development',
  REGULATORY_COMPLIANCE = 'Regulatory & Compliance',
  INSURANCE_RISK = 'Insurance & Risk',
  UTILITIES_FACILITIES = 'Utilities & Facilities',
  COMMUNICATION = 'Communication',
  DEPRECIATION = 'Depreciation',
  INTEREST_FINANCE = 'Interest & Finance',
  OTHER_EXPENSES = 'Other Expenses',
  BAD_DEBTS = 'Bad Debts',
  AUDIT_LEGAL = 'Audit & Legal',
  SUBSCRIPTIONS = 'Subscriptions',
  REPAIRS_MAINTENANCE = 'Repairs & Maintenance',
  MISCELLANEOUS = 'Miscellaneous',
}

export enum InsuranceCompany {
  HDFC_ERGO = 'HDFC ERGO',
  ICICI_LOMBARD = 'ICICI Lombard',
  BAJAJ_ALLIANZ = 'Bajaj Allianz',
  TATA_AIG = 'Tata AIG',
  RELIANCE_GENERAL = 'Reliance General',
  NEW_INDIA_ASSURANCE = 'New India Assurance',
  ORIENTAL_INSURANCE = 'Oriental Insurance',
  UNITED_INDIA = 'United India',
  NATIONAL_INSURANCE = 'National Insurance',
  FUTURE_GENERALI = 'Future Generali',
  LIBERTY_GENERAL = 'Liberty General',
  IFFCO_TOKIO = 'IFFCO Tokio',
  CHOLAMANDALAM = 'Cholamandalam MS',
  SHRIRAM_GENERAL = 'Shriram General',
  GO_DIGIT = 'Go Digit',
  ACKO_GENERAL = 'Acko General',
  KOTAK_MAHINDRA = 'Kotak Mahindra',
  MAGMA_HDI = 'Magma HDI',
  RAHEJA_QBE = 'Raheja QBE',
  UNIVERSAL_SOMPO = 'Universal Sompo',
  SBI_GENERAL = 'SBI General',
  BHARTI_AXA = 'Bharti AXA',
  ROYAL_SUNDARAM = 'Royal Sundaram',
}

export enum CrossSellCombination {
  HEALTH_MOTOR = 'Health + Motor',
  LIFE_HEALTH = 'Life + Health',
  MOTOR_TRAVEL = 'Motor + Travel',
  HEALTH_TRAVEL = 'Health + Travel',
  LIFE_MOTOR = 'Life + Motor',
  PROPERTY_MOTOR = 'Property + Motor',
}

export enum ChartType {
  PIE_CHART = 'pie',
  BAR_CHART = 'bar',
  LINE_CHART = 'line',
  AREA_CHART = 'area',
  DONUT_CHART = 'donut',
}

export enum DataStatus {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
  IDLE = 'idle',
}

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export enum SortBy {
  NAME = 'name',
  VALUE = 'value',
  PERCENTAGE = 'percentage',
  POLICIES = 'policies',
  AMOUNT = 'amount',
  REVENUE = 'revenue',
}

export enum FilterType {
  DATE_RANGE = 'dateRange',
  REPORT_TYPE = 'reportType',
  CATEGORY = 'category',
  INSURER = 'insurer',
  CLIENT_TYPE = 'clientType',
}

export enum ValueUnit {
  RUPEES = '₹',
  PERCENTAGE = '%',
  COUNT = 'count',
  CRORES = 'Cr',
  LAKHS = 'L',
}

export enum ColorTheme {
  PROFESSIONAL = 'professional',
  VIBRANT = 'vibrant',
  MONOCHROME = 'monochrome',
  CUSTOM = 'custom',
}

// Export arrays for easy iteration
export const REVENUE_REPORT_TYPES = Object.values(RevenueReportType);
export const CLIENT_TYPES = Object.values(ClientType);
export const INSURANCE_VERTICALS = Object.values(InsuranceVertical);
export const POLICY_TYPES = Object.values(PolicyType);
export const LOB_TYPES = Object.values(LOBType);
export const EXPENSE_CATEGORIES = Object.values(ExpenseCategory);
export const INSURANCE_COMPANIES = Object.values(InsuranceCompany);
export const CROSS_SELL_COMBINATIONS = Object.values(CrossSellCombination);
export const CHART_TYPES = Object.values(ChartType);
export const DATA_STATUSES = Object.values(DataStatus);
export const SORT_ORDERS = Object.values(SortOrder);
export const SORT_BY_OPTIONS = Object.values(SortBy);
export const FILTER_TYPES = Object.values(FilterType);
export const VALUE_UNITS = Object.values(ValueUnit);
export const COLOR_THEMES = Object.values(ColorTheme);

// Helper functions for enum validation
export const isValidRevenueReportType = (value: string): value is RevenueReportType => {
  return Object.values(RevenueReportType).includes(value as RevenueReportType);
};

export const isValidClientType = (value: string): value is ClientType => {
  return Object.values(ClientType).includes(value as ClientType);
};

export const isValidInsuranceCompany = (value: string): value is InsuranceCompany => {
  return Object.values(InsuranceCompany).includes(value as InsuranceCompany);
};

export const isValidPolicyType = (value: string): value is PolicyType => {
  return Object.values(PolicyType).includes(value as PolicyType);
};

export const isValidExpenseCategory = (value: string): value is ExpenseCategory => {
  return Object.values(ExpenseCategory).includes(value as ExpenseCategory);
};

// Default values
export const DEFAULT_REPORT_TYPE = RevenueReportType.REVENUE_BY_INSURERS;
export const DEFAULT_SORT_BY = SortBy.VALUE;
export const DEFAULT_SORT_ORDER = SortOrder.DESC;
export const DEFAULT_CHART_TYPE = ChartType.PIE_CHART;
export const DEFAULT_VALUE_UNIT = ValueUnit.RUPEES;
export const DEFAULT_COLOR_THEME = ColorTheme.PROFESSIONAL;