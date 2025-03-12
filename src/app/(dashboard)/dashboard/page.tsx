'use client';

import { Box, Grid, Container, Typography } from '@mui/material';
import { Suspense } from 'react';
import Loading from '@/presentation/components/Loading';

// Componentes dos gráficos
import SummaryCards from '@/presentation/components/dashboard/charts/SummaryCards';
import SkillsByCategory from '@/presentation/components/dashboard/charts/SkillsByCategory';
import SkillsByLevel from '@/presentation/components/dashboard/charts/SkillsByLevel';

export default function DashboardPage() {
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold',
          color: '#f8fafc',
          fontSize: { xs: '1.5rem', md: '2rem' }
        }}
      >
        Dashboard
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Suspense fallback={<Loading />}>
          <SummaryCards />
        </Suspense>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography 
          variant="h5" 
          component="h2" 
          sx={{ 
            mb: 3, 
            fontWeight: 'medium',
            color: '#f8fafc',
            borderBottom: '2px solid #3b82f6',
            pb: 1,
            display: 'inline-block'
          }}
        >
          Habilidades
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<Loading />}>
              <SkillsByCategory />
            </Suspense>
          </Grid>
          <Grid item xs={12} md={6}>
            <Suspense fallback={<Loading />}>
              <SkillsByLevel />
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 