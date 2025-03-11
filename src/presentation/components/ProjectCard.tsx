'use client';

import { Box, Card, CardContent, CardActions, Typography, Button, Tooltip } from '@mui/material';
import { GitHub, Launch, Code } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ProjectCardProps {
  project: Repository;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const theme = useTheme();
  
  const formatDate = (date: string) => {
    return formatDistanceToNow(new Date(date), {
      addSuffix: true,
      locale: ptBR
    });
  };
  
  // Calcular percentuais de linguagens para o gráfico
  const totalBytes = Object.values(project.languages).reduce((a, b) => a + b, 0);
  const languagePercentages = Object.entries(project.languages)
    .map(([name, bytes]) => ({
      name,
      percentage: Math.round((bytes / totalBytes) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3); // Mostrar apenas as 3 principais linguagens
  
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        bgcolor: 'background.paper',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
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
            {project.name}
          </Typography>
          <Tooltip title={`Última atualização: ${formatDate(project.lastUpdated)}`}>
            <Typography
              variant="caption"
              sx={{ 
                color: 'text.secondary',
                fontSize: '0.75rem',
                display: 'block'
              }}
            >
              {formatDate(project.lastUpdated)}
            </Typography>
          </Tooltip>
        </Box>
        
        <Typography
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.6, minHeight: '3.2em' }}
        >
          {project.description}
        </Typography>
        
        {/* Linguagens */}
        {languagePercentages.length > 0 && (
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
              <Code fontSize="small" color="primary" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Linguagens
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', mb: 1, height: 8, borderRadius: 4, overflow: 'hidden' }}>
              {languagePercentages.map(({ name, percentage }, i) => (
                <Box 
                  key={name}
                  sx={{ 
                    width: `${percentage}%`, 
                    height: '100%',
                    bgcolor: i === 0 ? 'primary.main' : i === 1 ? 'primary.light' : 'secondary.main'
                  }}
                />
              ))}
            </Box>
            
            <Box sx={{ display: 'flex', gap: 2 }}>
              {languagePercentages.map(({ name, percentage }, _i) => (
                <Typography key={name} variant="caption" sx={{ fontSize: '0.7rem' }}>
                  {name}: {percentage}%
                </Typography>
              ))}
            </Box>
          </Box>
        )}
        
        {/* Tags/Tópicos */}
        {project.topics.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {project.topics.slice(0, 5).map((tag) => (
              <Box
                key={tag}
                sx={{
                  px: 1.5,
                  py: 0.5,
                  borderRadius: '50px',
                  backgroundColor: 'primary.main',
                  color: 'white',
                  fontSize: '0.7rem',
                  fontWeight: 500,
                }}
              >
                {tag}
              </Box>
            ))}
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ p: 3, pt: 0 }}>
        {project.homepage && (
          <Button
            variant="contained"
            startIcon={<Launch />}
            href={project.homepage}
            target="_blank"
            rel="noopener noreferrer"
            fullWidth
            size="small"
          >
            Ver Demo
          </Button>
        )}
        <Button
          variant="outlined"
          startIcon={<GitHub />}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          fullWidth
          size="small"
          sx={{
            borderWidth: 1,
            '&:hover': {
              borderWidth: 1,
            },
          }}
        >
          GitHub
        </Button>
      </CardActions>
    </Card>
  );
} 