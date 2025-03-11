'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import ExperienceForm from '@/presentation/components/dashboard/ExperienceForm';
import experienceService, { Experience, ExperienceInput } from '@/services/experienceService';
import { DASHBOARD_ROUTES } from '../../../../routes';

interface EditExperiencePageProps {
  params: {
    id: string;
  };
}

export default function EditExperiencePage({ params }: EditExperiencePageProps) {
  const { id } = params;
  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchExperience = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const experienceData = await experienceService.getExperienceById(id);
        setExperience(experienceData);
      } catch (err) {
        console.error('Erro ao buscar experiência:', err);
        setError('Falha ao carregar dados da experiência. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  const handleUpdateExperience = async (experienceData: ExperienceInput) => {
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      await experienceService.updateExperience(id, experienceData);
      // Redirecionar para a lista de experiências após sucesso
      router.push(DASHBOARD_ROUTES.experiences);
    } catch (err) {
      console.error('Erro ao atualizar experiência:', err);
      setSubmitError('Falha ao atualizar experiência. Por favor, tente novamente.');
      setSubmitLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <NextLink href={DASHBOARD_ROUTES.experiences} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Experiências
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Editar Experiência</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DASHBOARD_ROUTES.experiences)}
          sx={{ 
            color: '#94a3b8',
            '&:hover': {
              bgcolor: 'rgba(148, 163, 184, 0.1)',
              color: '#f8fafc'
            }
          }}
        >
          Voltar para lista
        </Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <CircularProgress sx={{ color: '#60a5fa' }} />
        </Box>
      ) : error ? (
        <Alert 
          severity="error" 
          sx={{ 
            bgcolor: 'rgba(239, 68, 68, 0.1)', 
            color: '#f87171',
            '& .MuiAlert-icon': { color: '#ef4444' } 
          }}
        >
          {error}
        </Alert>
      ) : experience ? (
        <ExperienceForm
          experience={experience}
          isEditMode={true}
          onSubmit={handleUpdateExperience}
          isLoading={submitLoading}
          error={submitError}
        />
      ) : null}
    </Container>
  );
} 