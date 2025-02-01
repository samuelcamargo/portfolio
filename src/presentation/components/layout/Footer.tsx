'use client';
import * as React from 'react';
import { Box, Container, Typography, IconButton, Tooltip } from '@mui/material';
import { GitHub, LinkedIn, Facebook, Instagram } from '@mui/icons-material';

const socialLinks = [
  {
    name: 'GitHub',
    icon: <GitHub />,
    url: 'https://github.com/samuelcamargo',
  },
  {
    name: 'LinkedIn',
    icon: <LinkedIn />,
    url: 'https://www.linkedin.com/in/samuelcamargoti/',
  },
  {
    name: 'Facebook',
    icon: <Facebook />,
    url: 'https://www.facebook.com/samuel.camargo.5439',
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    url: 'https://www.instagram.com/samuyoh/',
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="sm">
        <Typography 
          variant="body1" 
          align="center" 
          color="text.secondary"
          sx={{ mb: 2 }}
        >
          © {new Date().getFullYear()} Samuel Camargo
        </Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 2,
            '& .MuiIconButton-root': {
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-2px)',
                color: 'primary.main',
              },
            },
          }}
        >
          {socialLinks.map((social) => (
            <Tooltip key={social.name} title={social.name} arrow>
              <IconButton
                color="inherit"
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                size="large"
              >
                {social.icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      </Container>
    </Box>
  );
} 