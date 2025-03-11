'use client';

import { Box, Typography, Link as MuiLink } from '@mui/material';

export default function DashboardFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#0f172a',
        borderTop: '1px solid',
        borderColor: 'rgba(248, 250, 252, 0.1)',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="#94a3b8">
        © {currentYear}{' '}
        <MuiLink
          href="https://samuelcamargo.dev"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          sx={{ 
            color: '#f8fafc',
            '&:hover': {
              textDecoration: 'underline',
            }
          }}
        >
          Samuel Camargo
        </MuiLink>
        . Todos os direitos reservados.
      </Typography>
    </Box>
  );
} 