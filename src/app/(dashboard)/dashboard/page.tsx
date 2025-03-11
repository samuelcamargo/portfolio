'use client';

import { Box, Typography, Paper, Grid } from '@mui/material';

export default function DashboardPage() {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4, 
          mb: 4, 
          textAlign: 'center',
          bgcolor: '#334155',
          color: '#f8fafc',
          borderRadius: '8px',
          border: '1px solid rgba(248, 250, 252, 0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700,
            color: '#f8fafc',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          Bem-vindo ao Dashboard
        </Typography>
        <Typography 
          variant="body1"
          sx={{ color: '#cbd5e1' }}
        >
          Hello World! Esta é sua área administrativa.
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              bgcolor: '#334155',
              borderRadius: '8px',
              border: '1px solid rgba(248, 250, 252, 0.1)'
            }}
          >
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: '#f8fafc',
                borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
                pb: 1,
                mb: 2
              }}
            >
              Gerenciamento de Usuários
            </Typography>
            <Typography 
              variant="body2" 
              paragraph
              sx={{ color: '#cbd5e1' }}
            >
              No menu lateral você pode acessar as opções para gerenciar usuários do sistema.
            </Typography>
            <Typography 
              variant="body2"
              sx={{ color: '#cbd5e1' }}
            >
              Crie, edite e remova usuários conforme necessário.
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              height: '100%',
              bgcolor: '#334155',
              borderRadius: '8px',
              border: '1px solid rgba(248, 250, 252, 0.1)'
            }}
          >
            <Typography 
              variant="h6" 
              component="h2" 
              gutterBottom
              sx={{ 
                fontWeight: 600,
                color: '#f8fafc',
                borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
                pb: 1,
                mb: 2
              }}
            >
              Seu Perfil
            </Typography>
            <Typography 
              variant="body2" 
              paragraph
              sx={{ color: '#cbd5e1' }}
            >
              Acesse seu perfil para visualizar suas informações cadastradas.
            </Typography>
            <Typography 
              variant="body2"
              sx={{ color: '#cbd5e1' }}
            >
              Você pode atualizar seu nome de usuário e senha a qualquer momento.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 