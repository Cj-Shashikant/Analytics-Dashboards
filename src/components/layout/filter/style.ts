import { SxProps, Theme } from '@mui/material/styles';

export const filterStyles = {
  // Main container styles
  mainContainer: {
    p: '12px',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'grey.200',
    backgroundColor: 'white',
    marginBottom:'1rem',
    boxShadow:
      '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  } as SxProps<Theme>,

  // Filter container layout (improved responsive behavior)
  filterContainer: {
    display: 'flex',
    flexDirection: { xs: 'column', lg: 'row' },
    gap: { xs: 3, lg: 2 },
    alignItems: { lg: 'flex-start' },
    justifyContent: { lg: 'space-between' },
  } as SxProps<Theme>,

  // Left side filter controls (enhanced spacing)
  leftSide: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: { xs: 3, lg: 2 },
  } as SxProps<Theme>,

  // Filter item container
  filterItem: {
    minWidth: 0,
  } as SxProps<Theme>,

  // Filter label container
  labelContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 1,
    mb: 1,
  } as SxProps<Theme>,

  // Filter label text
  labelText: {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: '#111827',
  } as SxProps<Theme>,

  // Filter icon
  filterIcon: {
    width: 16,
    height: 16,
    color: '#2563eb',
  } as SxProps<Theme>,

  // Select trigger button (mimicking analytics style with dynamic width support)
  selectTrigger: {
    height: 36,
    minWidth: 120,
    justifyContent: 'flex-start',
    textTransform: 'none',
    color: '#111827',
    backgroundColor: '#eff6ff',
    borderColor: '#bfdbfe',
    fontSize: '0.875rem',
    fontWeight: 400,
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#dbeafe',
      borderColor: '#93c5fd',
    },
    '&:focus': {
      backgroundColor: '#dbeafe',
      borderColor: '#3b82f6',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
    },
    '& .MuiSelect-select': {
      paddingRight: '32px !important',
    },
  } as SxProps<Theme>,

  // Report type specific width
  reportTypeSelect: {
    minWidth: 160,
  } as SxProps<Theme>,

  // More button
  moreButton: {
    height: 36,
    px: 2,
    textTransform: 'none',
    color: '#2563eb',
    textDecoration: 'underline',
    '&:hover': {
      backgroundColor: '#eff6ff',
      textDecoration: 'underline',
    },
  } as SxProps<Theme>,

  // Right side container (single row layout)
rightSide: {
  display: 'flex',
  flexDirection: { xs: 'column', lg: 'row' },
  gap: { xs: 2, lg: 3 },
  alignItems: { lg: 'flex-end' },
  ml: { lg: 6 }
} as SxProps<Theme>,

  // Action container (horizontal layout)
actionContainer: {
  display: 'flex',
  flexDirection: 'column',
  alignItems: { xs: 'flex-start', lg: 'flex-end' }
} as SxProps<Theme>,

spacer: {
  height: 24,
  mb: 2
} as SxProps<Theme>,

  // Value unit button
  valueUnitButton: {
    height: 36,
    px: 2,
    textTransform: 'none',
    fontWeight: 500,
    backgroundColor: '#dbeafe',
    borderColor: '#bedbff',
    borderRadius:'.625rem',
    color: '#193cb8',
    '&:hover': {
      backgroundColor: '#dbeafe',
      borderColor: '#93c5fd',
    },
  } as SxProps<Theme>,

  // Action icons container
  actionIconsContainer: {
    display: 'flex',
    gap: 0.5,
  } as SxProps<Theme>,

  // Base icon button
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#6b7280',
    '&:hover': {
      backgroundColor: '#f3f4f6',
    },
  } as SxProps<Theme>,

  // Settings icon
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#2563eb',
    '&:hover': {
      backgroundColor: '#eff6ff',
      color:'#030213',
    },
  } as SxProps<Theme>,

  // Fullscreen icon
  fullscreenIcon: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#6b7280',
    '&:hover': {
      backgroundColor: '#f3f4f6',
      color:'#030213',
    },
  } as SxProps<Theme>,

  // Leaderboard icon
  leaderboardIcon: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#f59e0b',
    '&:hover': {
      backgroundColor: '#fffbeb',
      color:'#030213',
    },
  } as SxProps<Theme>,

  // Download icon
  downloadIcon: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#10b981',
    '&:hover': {
      backgroundColor: '#f0fdf4',
      color:'#030213',
    },
  } as SxProps<Theme>,

  // More options icon
  moreOptionsIcon: {
    width: 36,
    height: 36,
    borderRadius: '.825rem',
    color: '#9333ea',
    '&:hover': {
      backgroundColor: '#faf5ff',
      color:'#030213',
    },
  } as SxProps<Theme>,
};

export const productsListStyles = {
  // Main container - Flexible height with proper flex layout
  container: "p-4 flex flex-col",
  
  // Header section - Fixed height to match chart header
  header: {
    wrapper: "flex items-center justify-between mb-2 h-16 flex-shrink-0",
    icon: "w-5 h-5 text-blue-600",
    title: "font-medium text-gray-900"
  },
  
  // Table structure - Custom grid with wider Product column
  table: {
    headerRow: "grid gap-4 pb-3 mb-3 border-b border-gray-200",
    headerCell: "text-sm font-semibold text-gray-700 text-center",
    headerCellCenter: "text-sm font-semibold text-gray-700 text-center",
    headerCellRight: "text-sm font-semibold text-gray-700 text-center flex items-center",
    body: "space-y-2 flex-1 overflow-y-auto min-h-0"
  },
  
  // Product row - Custom grid with wider Product column
  productRow: {
    container: "grid gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer items-center",
    productColumn: "flex items-center gap-3",
    colorIndicator: "w-3 h-3 rounded-full flex-shrink-0",
    productInfo: "min-w-0",
    productName: "font-medium text-gray-900 text-sm",
    productDescription: "text-xs text-gray-500",
    centerColumn: "text-center",
    rightColumn: "text-center",
    cellValue: "font-medium text-gray-900 text-sm"
  },
  
  // Footer (commented out in original)
  footer: {
    wrapper: "mt-4 pt-3 border-t border-gray-200",
    text: "text-xs text-gray-600 text-center"
  }
};

// Export individual style groups for easier access
export const {
  container,
  header,
  table,
  productRow,
  footer
} = productsListStyles;


