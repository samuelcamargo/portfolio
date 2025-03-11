'use client';

import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import ExperienceForm from '@/presentation/components/dashboard/ExperienceForm';
import experienceService, { ExperienceInput } from '@/services/experienceService';
import { DASHBOARD_ROUTES } from '../../../routes';

export default function CreateExperiencePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateExperience = async (experienceData: ExperienceInput) => {
    setLoading(true);
    setError(null);
    
    try {
      await experienceService.createExperience(experienceData);
      // Redirecionar para a lista de experiências após sucesso
      router.push(DASHBOARD_ROUTES.experiences);
    } catch (err) {
      console.error('Erro ao criar experiência:', err);
      setError('Falha ao criar experiência. Por favor, verifique os dados e tente novamente.');
      setLoading(false);
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
        <Typography color="#f8fafc">Nova Experiência</Typography>
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

      <ExperienceForm
        onSubmit={handleCreateExperience}
        isLoading={loading}
        error={error}
        isEditMode={false}
      />
    </Container>
  );
} 