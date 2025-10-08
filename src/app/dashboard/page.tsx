'use client';

import { TopNavigation } from '@/components/layout/header/page';
import { Box } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      {/* Header Component */}
      <TopNavigation />

      {/* Main content area */}
    </Box>
  );
}
