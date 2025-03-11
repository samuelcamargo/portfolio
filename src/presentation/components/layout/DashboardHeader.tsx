'use client';

import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function DashboardHeader() {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogoClick = () => {
    router.push('/dashboard');
  };

  return (
    <AppBar 
      position="static" 
      sx={{
        bgcolor: '#0f172a',
        borderBottom: '1px solid',
        borderColor: 'rgba(248, 250, 252, 0.1)',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: '64px', sm: '72px' } }}>
        <Typography 
          variant="h6" 
          component="div"
          onClick={handleLogoClick}
          sx={{ 
            flexGrow: 1,
            cursor: 'pointer',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-0.02em',
            fontFamily: '"Clash Display", sans-serif',
            '&:hover': {
              color: '#94a3b8',
            }
          }}
        >
          Samuel Camargo
        </Typography>

        <Button 
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            color: '#f8fafc',
            borderRadius: '8px',
            padding: '8px 16px',
            '&:hover': {
              backgroundColor: 'rgba(248, 250, 252, 0.1)',
            }
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
} 