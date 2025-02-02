'use client';
import * as React from 'react';
import { Container, Typography, Box, TextField, Button, Paper, Grid, IconButton, Tooltip } from '@mui/material';
import { Send, Phone, Email, LocationOn, LinkedIn, GitHub, Facebook, Instagram } from '@mui/icons-material';

const contactInfo = [
  {
    icon: <LocationOn />,
    label: 'Localização',
    value: 'Barueri - São Paulo - BR'
  },
  {
    icon: <Phone />,
    label: 'Telefone',
    value: '+55 11 91481-0664'
  },
  {
    icon: <Email />,
    label: 'Email',
    value: 'samuelcamargo1@gmail.com'
  }
];

const socialLinks = [
  {
    name: 'LinkedIn',
    icon: <LinkedIn />,
    url: 'https://www.linkedin.com/in/samuelcamargoti/'
  },
  {
    name: 'GitHub',
    icon: <GitHub />,
    url: 'https://github.com/samuelcamargo'
  },
  {
    name: 'Facebook',
    icon: <Facebook />,
    url: 'https://www.facebook.com/samuel.camargo.5439'
  },
  {
    name: 'Instagram',
    icon: <Instagram />,
    url: 'https://www.instagram.com/samuyoh/'
  }
];

export default function ContactPage() {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            textAlign: 'center',
            mb: 2,
            background: 'linear-gradient(135deg, #9F67FF 0%, #7C3AED 100%)',
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
          Vamos conversar? Entre em contato comigo através de qualquer um dos canais abaixo
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Paper elevation={0} sx={{ p: 4, height: '100%', bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
                Informações de Contato
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                {contactInfo.map((info, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: 3,
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        p: 1,
                        display: 'flex',
                      }}
                    >
                      {info.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        {info.label}
                      </Typography>
                      <Typography>{info.value}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>

              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Redes Sociais
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {socialLinks.map((social) => (
                  <Tooltip key={social.name} title={social.name} arrow>
                    <IconButton
                      color="primary"
                      component="a"
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={7}>
            <Paper elevation={0} sx={{ p: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom color="primary" sx={{ mb: 4 }}>
                Envie uma Mensagem
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 3,
                }}
              >
                <TextField
                  required
                  fullWidth
                  label="Nome"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <TextField
                  required
                  fullWidth
                  label="Mensagem"
                  name="message"
                  multiline
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<Send />}
                  sx={{ mt: 2 }}
                >
                  Enviar Mensagem
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
} 