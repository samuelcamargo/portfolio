'use client';
import * as React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import { GitHub, LinkedIn, Facebook, Instagram } from '@mui/icons-material';

const socialLinks = [
  {
    icon: <GitHub />,
    url: 'https://github.com/samuelcamargo',
    label: 'GitHub'
  },
  {
    icon: <LinkedIn />,
    url: 'https://www.linkedin.com/in/samuelcamargoti',
    label: 'LinkedIn'
  },
  {
    icon: <Facebook />,
    url: 'https://www.facebook.com/samuel.camargo.5439',
    label: 'Facebook'
  },
  {
    icon: <Instagram />,
    url: 'https://www.instagram.com/samuyoh/',
    label: 'Instagram'
  }
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        py: 3,
        background: 'transparent',
        backdropFilter: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
          >
            © 2025 Samuel Camargo
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: 'text.secondary',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    color: 'primary.main',
                    transform: 'translateY(-2px)',
                  },
                }}
                aria-label={social.label}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 