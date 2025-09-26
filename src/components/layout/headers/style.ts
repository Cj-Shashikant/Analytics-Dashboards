import { styled } from '@mui/material/styles';
import { Box, Button, TextField, Avatar } from '@mui/material';

// Main navigation container
export const NavigationContainer = styled(Box)(({  }) => ({
  backgroundColor: '#ffffff',
  borderBottom: '1px solid #e5e7eb',
  padding: '16px 12px',
}));

// Flex container for navigation items
export const NavigationContent = styled(Box)(({  }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

// Left section container
export const LeftSection = styled(Box)(({  }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

// Navigation button styling
export const NavButton = styled(Button)(({  }) => ({
  minWidth: 'auto',
  padding: '8px',
  color: '#6b7280',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

// Triangle icon for logo/brand
export const TriangleIcon = styled(Box)(({  }) => ({
  width: 0,
  height: 0,
  borderLeft: '6px solid transparent',
  borderRight: '6px solid transparent',
  borderBottom: '8px solid #ef4444',
}));

// Center section - Search container
export const SearchSection = styled(Box)(({ theme }) => ({
  display: 'none',
  flex: 1,
  maxWidth: '448px',
  margin: '0 24px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

// Search input container
export const SearchContainer = styled(Box)(({  }) => ({
  position: 'relative',
  width: '100%',
}));

// Search icon positioning
export const SearchIcon = styled(Box)(({  }) => ({
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  color: '#9ca3af',
  zIndex: 1,
}));

// Search input field
export const SearchInput = styled(TextField)(({  }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    paddingLeft: '40px',
    paddingRight: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '8px',
    '& fieldset': {
      borderColor: '#e5e7eb',
    },
    '&:hover fieldset': {
      borderColor: '#d1d5db',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3b82f6',
      borderWidth: '2px',
    },
  },
  '& .MuiOutlinedInput-input': {
    padding: '8px 0',
  },
}));

// Right section container
export const RightSection = styled(Box)(({  }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

// First group - Notifications
export const NotificationGroup = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginRight: '4px',
  [theme.breakpoints.up('sm')]: {
    marginRight: '12px',
  },
}));

// Notification button with badge
export const NotificationButton = styled(Button)(({  }) => ({
  minWidth: 'auto',
  padding: '8px',
  position: 'relative',
  color: '#6b7280',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));

// Notification badge
export const NotificationBadge = styled(Box)(({  }) => ({
  width: '8px',
  height: '8px',
  backgroundColor: '#10b981',
  borderRadius: '50%',
  position: 'absolute',
  top: '-2px',
  right: '-2px',
}));

// Second group - Navigation buttons (hidden on mobile)
export const NavigationGroup = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '8px',
  marginRight: '12px',
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
  },
}));

// Third group - Profile section
export const ProfileGroup = styled(Box)(({  }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

// User avatar styling
export const UserAvatar = styled(Avatar)(({  }) => ({
  width: '32px',
  height: '32px',
  backgroundColor: '#2563eb',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: 500,
}));

// User info container (hidden on mobile)
export const UserInfo = styled(Box)(({ theme }) => ({
  display: 'none',
  fontSize: '14px',
  [theme.breakpoints.up('sm')]: {
    display: 'block',
  },
}));

// User name styling
export const UserName = styled(Box)(({  }) => ({
  fontWeight: 500,
  color: '#111827',
}));

// User role styling
export const UserRole = styled(Box)(({  }) => ({
  color: '#6b7280',
  fontSize: '12px',
}));

// Settings button with margin
export const SettingsButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: '8px',
  marginLeft: '4px',
  color: '#6b7280',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  [theme.breakpoints.up('sm')]: {
    marginLeft: '8px',
  },
}));