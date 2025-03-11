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

import SkillForm from '@/presentation/components/dashboard/SkillForm';
import skillService, { SkillInput } from '@/services/skillService';
import { DASHBOARD_ROUTES } from '../../../routes';

export default function CreateSkillPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateSkill = async (skillData: SkillInput) => {
    setLoading(true);
    setError(null);
    
    try {
      await skillService.createSkill(skillData);
      // Redirecionar para a lista de habilidades após sucesso
      router.push(DASHBOARD_ROUTES.skills);
    } catch (err) {
      console.error('Erro ao criar habilidade:', err);
      setError('Falha ao criar habilidade. Por favor, verifique os dados e tente novamente.');
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
        <NextLink href={DASHBOARD_ROUTES.skills} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Habilidades
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Nova Habilidade</Typography>
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

      <SkillForm 
        onSubmit={handleCreateSkill}
        isLoading={loading}
        error={error}
        isEditMode={false}
      />
    </Container>
  );
} 