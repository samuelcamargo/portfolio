'use client';

import { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Grid,
  Avatar,
  Button,
  CircularProgress,
  Alert,
  Breadcrumbs,
  Link as MuiLink,
  Divider
} from '@mui/material';
import { Edit as EditIcon, Person as PersonIcon } from '@mui/icons-material';
import NextLink from 'next/link';

import userService, { User } from '@/services/userService';
import { DASHBOARD_ROUTES } from '../../routes';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const userData = await userService.getProfile();
        setUser(userData);
      } catch (err) {
        console.error('Erro ao buscar perfil do usuário:', err);
        setError('Não foi possível carregar os dados do perfil. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Meu Perfil</Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h1" gutterBottom color="#f8fafc">
        Meu Perfil
      </Typography>

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
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            mt: 3,
            bgcolor: '#334155',
            borderRadius: '8px',
            border: '1px solid rgba(248, 250, 252, 0.1)',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={4} display="flex" flexDirection="column" alignItems="center">
              <Avatar 
                sx={{ 
                  width: 120, 
                  height: 120, 
                  bgcolor: '#3b82f6',
                  mb: 2
                }}
              >
                <PersonIcon sx={{ fontSize: 64 }} />
              </Avatar>
              
              <Typography variant="h5" gutterBottom color="#f8fafc">
                {user.username}
              </Typography>
              
              <Typography variant="body2" color="#94a3b8" gutterBottom>
                ID: {user.id}
              </Typography>
              
              <NextLink href={DASHBOARD_ROUTES.userEdit(user.id)} passHref style={{ textDecoration: 'none' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<EditIcon />} 
                  sx={{ 
                    mt: 2,
                    color: '#60a5fa',
                    borderColor: '#60a5fa',
                    '&:hover': {
                      borderColor: '#3b82f6',
                      bgcolor: 'rgba(96, 165, 250, 0.1)'
                    }
                  }}
                >
                  Editar Perfil
                </Button>
              </NextLink>
            </Grid>
            
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom color="#f8fafc">
                Detalhes da Conta
              </Typography>
              
              <Divider sx={{ mb: 3, borderColor: 'rgba(248, 250, 252, 0.1)' }} />
              
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body2" color="#94a3b8">
                    Nome de Usuário
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="#f8fafc">
                    {user.username}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="#94a3b8">
                    ID
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" sx={{ wordBreak: 'break-all', color: '#f8fafc' }}>
                    {user.id}
                  </Typography>
                </Grid>
                
                <Grid item xs={4}>
                  <Typography variant="body2" color="#94a3b8">
                    Senha
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" color="#f8fafc">
                    ••••••••••
                  </Typography>
                </Grid>
              </Grid>
              
              <Box mt={4}>
                <Typography variant="body2" color="#94a3b8">
                  Utilize a opção &quot;Editar Perfil&quot; para alterar sua senha ou atualizar seu nome de usuário.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ) : null}
    </Container>
  );
} 