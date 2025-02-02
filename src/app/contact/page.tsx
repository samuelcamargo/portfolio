'use client';

import * as React from 'react';
import { Container, Typography, Box, useTheme, Paper, Grid, Divider } from '@mui/material';
import { Email, LinkedIn, LocationOn, GitHub, Facebook, Instagram, WhatsApp } from '@mui/icons-material';

export default function ContactPage() {
  const theme = useTheme();

  const mainContacts = [
    {
      icon: <LocationOn />,
      title: 'Localização',
      content: 'Barueri - São Paulo - BR',
      color: theme.palette.primary.main
    },
    {
      icon: <WhatsApp />,
      title: 'WhatsApp',
      content: '+55 (11) 91481-0664',
      href: 'https://wa.me/5511914810664',
      color: '#25D366' // Cor oficial do WhatsApp
    },
    {
      icon: <Email />,
      title: 'E-mail',
      content: 'samuelcamargo1@gmail.com',
      href: 'mailto:samuelcamargo1@gmail.com',
      color: '#EA4335' // Cor do Gmail
    }
  ];

  const socialLinks = [
    {
      icon: <LinkedIn />,
      title: 'LinkedIn',
      content: '/samuelcamargoti',
      href: 'https://www.linkedin.com/in/samuelcamargoti',
      color: '#0A66C2'
    },
    {
      icon: <GitHub />,
      title: 'GitHub',
      content: '/samuelcamargo',
      href: 'https://github.com/samuelcamargo',
      color: '#6e40c9'
    },
    {
      icon: <Facebook />,
      title: 'Facebook',
      content: '/samuel.camargo.5439',
      href: 'https://www.facebook.com/samuel.camargo.5439',
      color: '#1877F2'
    },
    {
      icon: <Instagram />,
      title: 'Instagram',
      content: '@samuyoh',
      href: 'https://www.instagram.com/samuyoh/',
      color: '#E4405F'
    }
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        position: 'relative',
        minHeight: '100vh',
        pb: 8,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `linear-gradient(180deg, ${theme.palette.primary.main}10 0%, transparent 100%)`,
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: { xs: 6, md: 10 } }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              textAlign: 'center',
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Contato
          </Typography>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.1rem', md: '1.25rem' },
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              mb: { xs: 6, md: 8 },
            }}
          >
            Vamos conversar? Escolha o canal que preferir
          </Typography>

          <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              Informações de Contato
            </Typography>
            <Grid container spacing={3} mb={6}>
              {mainContacts.map((info, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper
                    component={info.href ? 'a' : 'div'}
                    href={info.href}
                    target={info.href?.startsWith('http') ? '_blank' : undefined}
                    rel={info.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      cursor: info.href ? 'pointer' : 'default',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': info.href ? {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: info.color,
                      } : {},
                      '&:hover': info.href ? {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                        '& .MuiSvgIcon-root': {
                          transform: 'scale(1.1)',
                          color: info.color,
                        }
                      } : {},
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: info.href ? `${info.color}15` : 'primary.main',
                        color: info.href ? info.color : 'white',
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.75rem',
                          transition: 'all 0.3s ease',
                        }
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        color: 'text.primary',
                      }}
                    >
                      {info.title}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        fontSize: '0.95rem',
                      }}
                    >
                      {info.content}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Divider sx={{ my: 6 }} />

            <Typography
              variant="h5"
              sx={{
                mb: 3,
                fontWeight: 600,
                textAlign: 'center',
                color: 'text.primary',
              }}
            >
              Redes Sociais
            </Typography>
            <Grid container spacing={3}>
              {socialLinks.map((social, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 2,
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        bgcolor: social.color,
                      },
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                        '& .MuiSvgIcon-root': {
                          transform: 'scale(1.1)',
                          color: social.color,
                        }
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        bgcolor: `${social.color}15`,
                        color: social.color,
                        '& .MuiSvgIcon-root': {
                          fontSize: '1.75rem',
                          transition: 'all 0.3s ease',
                        }
                      }}
                    >
                      {social.icon}
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        textAlign: 'center',
                        color: 'text.primary',
                      }}
                    >
                      {social.title}
                    </Typography>
                    <Typography
                      sx={{
                        textAlign: 'center',
                        color: 'text.secondary',
                        fontSize: '0.95rem',
                      }}
                    >
                      {social.content}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
} 