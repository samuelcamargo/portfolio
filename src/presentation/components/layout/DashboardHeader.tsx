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
      color="primary" 
      elevation={0}
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
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
            letterSpacing: '-0.02em',
            fontFamily: '"Clash Display", sans-serif',
            background: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 10px rgba(124, 58, 237, 0.2)',
            '&:hover': {
              background: 'linear-gradient(135deg, #F8FAFC 30%, #7C3AED 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }
          }}
        >
          Samuel Camargo
        </Typography>

        <Button 
          color="inherit" 
          onClick={logout}
          startIcon={<LogoutIcon />}
          sx={{
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            }
          }}
        >
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
} 