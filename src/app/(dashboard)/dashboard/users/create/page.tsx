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

import UserForm from '@/presentation/components/dashboard/UserForm';
import userService, { UserWithPassword } from '@/services/userService';
import { DASHBOARD_ROUTES } from '../../../routes';

export default function CreateUserPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateUser = async (userData: UserWithPassword) => {
    setLoading(true);
    setError(null);
    
    try {
      await userService.createUser(userData);
      // Redirecionar para a lista de usuários após sucesso
      router.push(DASHBOARD_ROUTES.users);
    } catch (err) {
      console.error('Erro ao criar usuário:', err);
      setError('Falha ao criar usuário. Por favor, verifique os dados e tente novamente.');
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
        <NextLink href={DASHBOARD_ROUTES.users} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Usuários
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Novo Usuário</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DASHBOARD_ROUTES.users)}
          sx={{ color: '#94a3b8' }}
        >
          Voltar para lista
        </Button>
      </Box>

      <UserForm
        onSubmit={handleCreateUser}
        isLoading={loading}
        error={error}
        submitButtonText="Criar Usuário"
        title="Novo Usuário"
      />
    </Container>
  );
} 