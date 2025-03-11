'use client';

import { Box } from '@mui/material';
import DashboardHeader from '@/presentation/components/layout/DashboardHeader';
import DashboardFooter from '@/presentation/components/layout/DashboardFooter';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <DashboardHeader />
      <Box
        component="main"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
      <DashboardFooter />
    </Box>
  );
} 