'use client';

import { Container, Typography, Box } from '@mui/material';
import EducationForm from '@/presentation/components/dashboard/EducationForm';

export default function CreateEducationPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc', fontWeight: 600 }}>
          Criar Novo Registro de Educação
        </Typography>
        <Typography variant="body1" sx={{ color: '#94a3b8', mt: 1 }}>
          Preencha o formulário abaixo para adicionar um novo registro de educação.
        </Typography>
      </Box>

      <EducationForm />
    </Container>
  );
} 