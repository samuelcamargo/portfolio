'use client';

import * as React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box, useTheme, Tooltip } from '@mui/material';
import { GitHub, Launch, Update } from '@mui/icons-material';
import { getGithubRepositories } from '@/services/github';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  updatedAt: string;
  lastCommit: {
    message: string;
    date: string;
  };
}

export default function ProjectsPage() {
  const theme = useTheme();
  const [projects, setProjects] = React.useState<ProjectData[]>([]);

  React.useEffect(() => {
    const fetchProjects = async () => {
      const data = await getGithubRepositories();
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR
    });
  };

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
                    bgcolor: 'background.paper',
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography
                        variant="h5"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontSize: '1.5rem',
                          fontWeight: 600,
                          color: 'text.primary',
                          mb: 0
                        }}
                      >
                        {project.title}
                      </Typography>
                      <Tooltip title={`Último commit: ${project.lastCommit.message}`}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '0.875rem' }}>
                          <Update sx={{ fontSize: '1rem' }} />
                          {formatDate(project.lastCommit.date)}
                        </Box>
                      </Tooltip>
                    </Box>
                    <Typography
                      color="text.secondary"
                      sx={{ mb: 2, lineHeight: 1.6 }}
                    >
                      {project.description}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {project.tags.map((tag: string) => (
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
                    {project.demo && (
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
                    )}
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