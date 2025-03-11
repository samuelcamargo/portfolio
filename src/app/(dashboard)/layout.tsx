'use client';

import { Box } from '@mui/material';
import DashboardHeader from '@/presentation/components/layout/DashboardHeader';
import DashboardFooter from '@/presentation/components/layout/DashboardFooter';
import DashboardSidebar from '@/presentation/components/layout/DashboardSidebar';

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
        bgcolor: '#0f172a',
      }}
    >
      <DashboardHeader />
      <Box
        sx={{
          display: 'flex',
          flex: 1,
        }}
      >
        <DashboardSidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 1, sm: 3 },
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '240px' },
            bgcolor: '#1e293b',
            color: '#f8fafc',
            borderRadius: { xs: 0, sm: '8px 0 0 0' },
            boxShadow: { xs: 'none', sm: 'inset 0 1px 3px 0 rgba(0, 0, 0, 0.1)' },
            overflow: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
      <DashboardFooter />
    </Box>
  );
} 