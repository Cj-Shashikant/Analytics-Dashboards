// Product Analytics Data
export interface ProductAnalyticsData {
  name: string;
  policies: number;
  premiumRevenue: number;
  revenuePercentage: number;
  color: string;
}
export interface ColorPalette {
  CommonColors: string[];
}

const professionalColors: ColorPalette = {
  CommonColors: [
    '#3B82F6', // Professional blue
    '#10B981', // Emerald green
    '#F59E0B', // Amber
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#EC4899', // Pink
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#EC4899',
    '#14B8A6',
    '#F97316',
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#96CEB4',
    '#FFEAA7',
    '#DDA0DD',
    '#98D8C8',
    '#F7DC6F',
    '#BB8FCE',
    '#85C1E9',
    '#F8C471',
    '#82E0AA',
    '#F1948A',
    '#85929E',
    '#D5A6BD',
  ],
};

const getColorSafely = (
  colorArray: string[],
  index: number,
  fallback: string = '#3B82F6'
): string => {
  return colorArray[index] || fallback;
};

export const productAnalyticsData: ProductAnalyticsData[] = [
  {
    name: 'Health Insurance',
    policies: 15420,
    premiumRevenue: 68400000, // ₹6.84 crores
    revenuePercentage: 28.5,
    color: getColorSafely(professionalColors.CommonColors, 0),
  },
  {
    name: 'Motor Insurance',
    policies: 12850,
    premiumRevenue: 58800000, // ₹5.88 crores
    revenuePercentage: 24.5,
    color: getColorSafely(professionalColors.CommonColors, 1),
  },
  {
    name: 'Life Insurance',
    policies: 9680,
    premiumRevenue: 44400000, // ₹4.44 crores
    revenuePercentage: 18.5,
    color: getColorSafely(professionalColors.CommonColors, 2),
  },
  {
    name: 'Property Insurance',
    policies: 6250,
    premiumRevenue: 30000000, // ₹3.0 crores
    revenuePercentage: 12.5,
    color: getColorSafely(professionalColors.CommonColors, 3),
  },
  {
    name: 'Travel Insurance',
    policies: 4820,
    premiumRevenue: 22800000, // ₹2.28 crores
    revenuePercentage: 9.5,
    color: getColorSafely(professionalColors.CommonColors, 4),
  },
  {
    name: 'Marine Insurance',
    policies: 2150,
    premiumRevenue: 15600000, // ₹1.56 crores
    revenuePercentage: 6.5,
    color: getColorSafely(professionalColors.CommonColors, 5),
  },
  {
    name: 'Cyber Insurance',
    policies: 3420,
    premiumRevenue: 18900000, // ₹1.89 crores
    revenuePercentage: 7.9,
    color: getColorSafely(professionalColors.CommonColors, 6),
  },
  {
    name: 'Pet Insurance',
    policies: 1850,
    premiumRevenue: 8400000, // ₹0.84 crores
    revenuePercentage: 3.5,
    color: getColorSafely(professionalColors.CommonColors, 7),
  },
  {
    name: 'Business Insurance',
    policies: 4560,
    premiumRevenue: 26700000, // ₹2.67 crores
    revenuePercentage: 11.1,
    color: getColorSafely(professionalColors.CommonColors, 8),
  },
  {
    name: 'Professional Indemnity',
    policies: 2980,
    premiumRevenue: 16800000, // ₹1.68 crores
    revenuePercentage: 7.0,
    color: getColorSafely(professionalColors.CommonColors, 9),
  },
  {
    name: 'Home Insurance',
    policies: 7340,
    premiumRevenue: 32400000, // ₹3.24 crores
    revenuePercentage: 13.5,
    color: getColorSafely(professionalColors.CommonColors, 10),
  },
  {
    name: 'Credit Insurance',
    policies: 1620,
    premiumRevenue: 12000000, // ₹1.2 crores
    revenuePercentage: 5.0,
    color: getColorSafely(professionalColors.CommonColors, 11),
  },
  {
    name: 'Liability Insurance',
    policies: 3750,
    premiumRevenue: 21600000, // ₹2.16 crores
    revenuePercentage: 9.0,
    color: getColorSafely(professionalColors.CommonColors, 12),
  },
  {
    name: 'Agriculture Insurance',
    policies: 5680,
    premiumRevenue: 19200000, // ₹1.92 crores
    revenuePercentage: 8.0,
    color: getColorSafely(professionalColors.CommonColors, 13),
  },
  {
    name: 'Aviation Insurance',
    policies: 890,
    premiumRevenue: 9600000, // ₹0.96 crores
    revenuePercentage: 4.0,
    color: getColorSafely(professionalColors.CommonColors, 14),
  },
  {
    name: 'Workers Compensation',
    policies: 4120,
    premiumRevenue: 24000000, // ₹2.4 crores
    revenuePercentage: 10.0,
    color: getColorSafely(professionalColors.CommonColors, 15),
  },
];
