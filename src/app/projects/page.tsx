'use client';

import * as React from 'react';
import { Container, Grid, Typography, Box, CircularProgress, Alert } from '@mui/material';
import ProjectCard from '@/presentation/components/ProjectCard';
import { getGithubRepositories } from '@/services/github';

export default function ProjectsPage() {
  const [projects, setProjects] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function loadProjects() {
      try {
        // Remover console.log
        // console.log('Iniciando carregamento dos projetos...');
        setLoading(true);
        setError(null);
        
        const data = await getGithubRepositories();
        
        // Remover console.log
        // console.log('Dados recebidos:', data);
        
        if (data.length === 0) {
          setError('Nenhum projeto encontrado');
        } else {
          setProjects(data);
        }
      } catch (error: unknown) {
        setError('Erro ao carregar projetos. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ pt: 6, pb: 12 }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            color: 'text.primary',
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          }}
        >
          Meus Projetos
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            maxWidth: '800px', 
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          Uma seleção dos meus trabalhos recentes em desenvolvimento web e aplicações
        </Typography>
      </Box>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ my: 4 }}>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
} 