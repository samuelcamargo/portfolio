'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Container, Typography, Box, CircularProgress, Alert } from '@mui/material';
import EducationForm from '@/presentation/components/dashboard/EducationForm';
import educationService, { Education } from '@/services/educationService';

export default function EditEducationPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id || '';
  
  const [education, setEducation] = useState<Education | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID do registro de educação não fornecido');
      setLoading(false);
      return;
    }

    const fetchEducation = async () => {
      try {
        const data = await educationService.getEducationById(id);
        setEducation(data);
      } catch (error) {
        console.error('Erro ao buscar educação:', error);
        setError('Não foi possível carregar as informações do registro de educação. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchEducation();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!education) {
    return (
      <Container sx={{ py: 3 }}>
        <Alert severity="warning">Registro de educação não encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc', fontWeight: 600 }}>
          Editar Registro de Educação
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', mt: 1 }}>
          Atualize as informações do registro de educação abaixo.
        </Typography>
      </Box>

      <EducationForm education={education} isEditMode={true} />
    </Container>
  );
} 