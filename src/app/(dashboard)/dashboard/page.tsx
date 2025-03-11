'use client';

import { Container, Paper, Typography } from '@mui/material';

const DASHBOARD_CONFIG = {
  welcomeMessage: 'Bem-vindo ao Dashboard',
  description: 'Hello World! Esta é sua área administrativa.',
};

export default function DashboardPage() {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          {DASHBOARD_CONFIG.welcomeMessage}
        </Typography>
        <Typography variant="body1">
          {DASHBOARD_CONFIG.description}
        </Typography>
      </Paper>
    </Container>
  );
} 