'use client';

import { Box, CircularProgress } from '@mui/material';

interface LoadingProps {
  height?: string | number;
}

export default function Loading({ height = 300 }: LoadingProps) {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height,
        width: '100%'
      }}
    >
      <CircularProgress sx={{ color: '#3b82f6' }} />
    </Box>
  );
} 