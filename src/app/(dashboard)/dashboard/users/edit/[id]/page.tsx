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

import UserForm from '@/presentation/components/dashboard/UserForm';
import userService, { User, UserWithPassword } from '@/services/userService';
import { DASHBOARD_ROUTES } from '../../../../routes';

interface EditUserPageProps {
  params: {
    id: string;
  };
}

export default function EditUserPage({ params }: EditUserPageProps) {
  const { id } = params;
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Aqui precisaríamos de um endpoint para buscar usuário por ID
        // Como não temos, vamos usar a lista de usuários e filtrar
        const users = await userService.getUsers();
        const foundUser = users.find(u => u.id === id);
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          setError('Usuário não encontrado');
        }
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
        setError('Falha ao carregar dados do usuário. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleUpdateUser = async (userData: UserWithPassword) => {
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      await userService.updateUser(id, userData);
      // Redirecionar para a lista de usuários após sucesso
      router.push(DASHBOARD_ROUTES.users);
    } catch (err) {
      console.error('Erro ao atualizar usuário:', err);
      setSubmitError('Falha ao atualizar usuário. Por favor, tente novamente.');
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
        <NextLink href={DASHBOARD_ROUTES.users} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Usuários
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Editar Usuário</Typography>
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
      ) : user ? (
        <UserForm
          initialData={{ username: user.username, password: '' }}
          onSubmit={handleUpdateUser}
          isLoading={submitLoading}
          error={submitError}
          submitButtonText="Atualizar Usuário"
          title={`Editar Usuário: ${user.username}`}
        />
      ) : null}
    </Container>
  );
} 