'use client';

import { Box, Container, Typography } from '@mui/material';

export default function DashboardFooter() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        mt: 'auto',
        background: 'transparent',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
        >
          © 2025 Samuel Camargo
        </Typography>
      </Container>
    </Box>
  );
} 