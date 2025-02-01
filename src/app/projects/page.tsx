'use client';
import * as React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, useTheme, CardMedia } from '@mui/material';
import { GitHub, Launch } from '@mui/icons-material';

const projects = [
  {
    title: 'Projeto 1',
    description: 'Descrição do projeto 1. Tecnologias utilizadas e principais funcionalidades.',
    image: '/project1.jpg',
    tags: ['React', 'TypeScript', 'Material UI'],
    github: 'https://github.com/seu-usuario/projeto1',
    demo: 'https://projeto1.exemplo.com',
  },
  {
    title: 'Projeto 2',
    description: 'Descrição do projeto 2. Tecnologias utilizadas e principais funcionalidades.',
    image: '/project2.jpg',
    tags: ['Next.js', 'Node.js', 'MongoDB'],
    github: 'https://github.com/seu-usuario/projeto2',
    demo: 'https://projeto2.exemplo.com',
  },
];

export default function ProjectsPage() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        position: 'relative',
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
            Meus Projetos
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
            Uma seleção dos meus projetos mais recentes e relevantes
          </Typography>
          <Grid container spacing={4}>
            {projects.map((project, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="240"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        color: 'text.primary',
                      }}
                    >
                      {project.title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {project.tags.map((tag) => (
                        <Box
                          key={tag}
                          sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: '50px',
                            backgroundColor: 'primary.main',
                            color: 'white',
                            fontSize: '0.75rem',
                            fontWeight: 500,
                          }}
                        >
                          {tag}
                        </Box>
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions sx={{ p: 3, pt: 0 }}>
                    <Button
                      variant="contained"
                      startIcon={<Launch />}
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                    >
                      Ver Demo
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<GitHub />}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      fullWidth
                      sx={{
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                        },
                      }}
                    >
                      GitHub
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
} 