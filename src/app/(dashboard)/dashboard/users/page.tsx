'use client';

import { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Button,
  Alert,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import UserTable from '@/presentation/components/dashboard/UserTable';
import userService, { User } from '@/services/userService';
import { DASHBOARD_ROUTES } from '../../routes';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const userData = await userService.getUsers();
      setUsers(userData);
    } catch (err) {
      console.error('Erro ao buscar usuários:', err);
      setError('Não foi possível carregar os usuários. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId: string) => {
    setDeleteError(null);
    try {
      await userService.deleteUser(userId);
      // Atualizar a lista após deletar
      fetchUsers();
    } catch (err) {
      console.error('Erro ao deletar usuário:', err);
      setDeleteError('Falha ao deletar usuário. Por favor, tente novamente.');
    }
  };

  const navigateToCreate = () => {
    router.push(DASHBOARD_ROUTES.userCreate);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Usuários</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc' }}>
          Gerenciamento de Usuários
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={navigateToCreate}
          sx={{
            bgcolor: '#3b82f6',
            '&:hover': {
              bgcolor: '#2563eb'
            }
          }}
        >
          Novo Usuário
        </Button>
      </Box>

      {deleteError && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>
          {deleteError}
        </Alert>
      )}

      <UserTable 
        users={users} 
        onDelete={handleDelete}
        isLoading={loading}
        error={error}
      />
    </Container>
  );
} 