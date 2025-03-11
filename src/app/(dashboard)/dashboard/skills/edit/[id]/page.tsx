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

import SkillForm from '@/presentation/components/dashboard/SkillForm';
import skillService, { Skill, SkillInput } from '@/services/skillService';
import { DASHBOARD_ROUTES } from '../../../../routes';

interface EditSkillPageProps {
  params: {
    id: string;
  };
}

export default function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = params;
  const [skill, setSkill] = useState<Skill | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSkill = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const skillData = await skillService.getSkillById(id);
        setSkill(skillData);
      } catch (err) {
        console.error('Erro ao buscar habilidade:', err);
        setError('Falha ao carregar dados da habilidade. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSkill();
  }, [id]);

  const handleUpdateSkill = async (skillData: SkillInput) => {
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      await skillService.updateSkill(id, skillData);
      // Redirecionar para a lista de habilidades após sucesso
      router.push(DASHBOARD_ROUTES.skills);
    } catch (err) {
      console.error('Erro ao atualizar habilidade:', err);
      setSubmitError('Falha ao atualizar habilidade. Por favor, tente novamente.');
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
        <NextLink href={DASHBOARD_ROUTES.skills} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Habilidades
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Editar Habilidade</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DASHBOARD_ROUTES.skills)}
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
      ) : skill ? (
        <SkillForm
          skill={skill}
          isEditMode={true}
          onSubmit={handleUpdateSkill}
          isLoading={submitLoading}
          error={submitError}
        />
      ) : null}
    </Container>
  );
} 