/**
 * Dynamic width calculation utilities for filter dropdowns
 * Based on analytics App.tsx implementation
 */

export const getDynamicWidth = (
  content: string,
  minWidth: number = 120,
  maxWidth: number = 240
): string => {
  // For custom period, we need extra space for date ranges
  const isCustomPeriodContent =
    content.includes(' - ') && content !== 'Custom Period';
  const baseWidth = isCustomPeriodContent
    ? Math.max(minWidth + 40, Math.min(maxWidth + 60, content.length * 7 + 60)) // Wider for date ranges
    : Math.max(minWidth, Math.min(maxWidth, content.length * 8 + 50)); // Normal width

  return `${baseWidth}px`;
};

// Calculate dynamic widths for each dropdown type
export const getFilterWidths = (
  selectedEntity: string,
  selectedDepartment: string,
  selectedReportType: string,
  selectedDuration: string,
  selectedLocation: string
) => ({
  entityWidth: getDynamicWidth(selectedEntity, 160, 220),
  departmentWidth: getDynamicWidth(selectedDepartment, 120, 180),
  reportTypeWidth: getDynamicWidth(selectedReportType, 180, 280),
  durationWidth: getDynamicWidth(selectedDuration, 110, 200),
  locationWidth: getDynamicWidth(selectedLocation, 100, 160),
});

// Convert pixel width to MUI sx prop
export const getWidthSx = (width: string) => ({
  width: { xs: '100%', lg: width },
});
