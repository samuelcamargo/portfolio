'use client';
import * as React from 'react';
import { Box, Typography, Button, Container, useTheme } from '@mui/material';
import { Launch, GitHub } from '@mui/icons-material';
import { SiPhp, SiLaravel, SiNodedotjs, SiTypescript, SiReact, SiNextdotjs, SiDocker, SiMysql } from 'react-icons/si';

export default function Hero() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
        overflow: 'hidden',
        pt: { xs: 10, sm: 12, md: 16 },
        pb: { xs: 8, sm: 10, md: 12 },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200%',
          height: '200%',
          backgroundImage: `radial-gradient(circle at center, ${theme.palette.primary.main}20 0%, transparent 50%)`,
          opacity: 0.5,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center',
          }}
        >
          <Typography
            component="h1"
            variant="h1"
            sx={{
              fontSize: {
                xs: '2.5rem',
                sm: '3.5rem',
                md: '4rem',
              },
              fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              mb: 2,
            }}
          >
            Olá, eu sou Samuel Camargo
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '1.25rem',
                sm: '1.5rem',
                md: '1.75rem',
              },
              color: 'text.secondary',
              mb: 4,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Aventureiro tech: desbravando novos horizontes no desenvolvimento Full Stack
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              variant="contained"
              size="large"
              href="/projects"
              startIcon={<Launch />}
              sx={{
                minWidth: 200,
              }}
            >
              Ver Projetos
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/samuelcamargo"
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<GitHub />}
              sx={{
                minWidth: 200,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                },
              }}
            >
              GitHub
            </Button>
          </Box>
          {/* Tech Stack Icons */}
          <Box
            sx={{
              mt: 6,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
              justifyContent: 'center',
              alignItems: 'center',
              '& svg': {
                width: { xs: 28, md: 32 },
                height: { xs: 28, md: 32 },
                transition: 'all 0.3s ease',
                opacity: 0.7,
                filter: 'brightness(0) invert(1)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  opacity: 1,
                  filter: 'none',
                }
              }
            }}
          >
            <Box component={SiPhp} sx={{ '&:hover': { color: '#777BB4' } }} />
            <Box component={SiLaravel} sx={{ '&:hover': { color: '#FF2D20' } }} />
            <Box component={SiNodedotjs} sx={{ '&:hover': { color: '#339933' } }} />
            <Box component={SiTypescript} sx={{ '&:hover': { color: '#F7DF1E' } }} />
            <Box component={SiReact} sx={{ '&:hover': { color: '#61DAFB' } }} />
            <Box component={SiNextdotjs} sx={{ '&:hover': { color: '#FFFFFF' } }} />
            <Box component={SiDocker} sx={{ '&:hover': { color: '#2496ED' } }} />
            <Box component={SiMysql} sx={{ '&:hover': { color: '#4479A1' } }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 