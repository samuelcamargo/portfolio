'use client';
import * as React from 'react';
import Hero from '../presentation/components/sections/Hero';
import ParticlesBackground from '../presentation/components/ParticlesBackground';
import { Box } from '@mui/material';

export default function Home() {
  return (
    <Box sx={{ position: 'relative' }}>
      <ParticlesBackground />
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Hero />
      </Box>
    </Box>
  );
} 