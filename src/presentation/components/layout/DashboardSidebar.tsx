'use client';

import { usePathname } from 'next/navigation';
import NextLink from 'next/link';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Drawer,
  IconButton,
  Divider,
  Typography
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Menu as MenuIcon,
  Close as CloseIcon,
  WorkspacePremium as CertificateIcon,
  AddTask as AddCertificateIcon,
  School as EducationIcon,
  Add as AddEducationIcon,
  Work as ExperienceIcon,
  AddBusiness as AddExperienceIcon,
  Psychology as SkillIcon,
  Addchart as AddSkillIcon
} from '@mui/icons-material';
import { useState } from 'react';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

const drawerWidth = 240;

interface DrawerItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const mainItems: DrawerItem[] = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: DASHBOARD_ROUTES.home },
    { text: 'Meu Perfil', icon: <PersonIcon />, path: DASHBOARD_ROUTES.profile },
  ];

  const userManagementItems: DrawerItem[] = [
    { text: 'Listar Usuários', icon: <PeopleIcon />, path: DASHBOARD_ROUTES.users },
    { text: 'Novo Usuário', icon: <PersonAddIcon />, path: DASHBOARD_ROUTES.userCreate },
  ];
  
  const certificateManagementItems: DrawerItem[] = [
    { text: 'Listar Certificados', icon: <CertificateIcon />, path: DASHBOARD_ROUTES.certificates },
    { text: 'Novo Certificado', icon: <AddCertificateIcon />, path: DASHBOARD_ROUTES.certificateCreate },
  ];

  const educationManagementItems: DrawerItem[] = [
    { text: 'Listar Educação', icon: <EducationIcon />, path: DASHBOARD_ROUTES.education },
    { text: 'Nova Educação', icon: <AddEducationIcon />, path: DASHBOARD_ROUTES.educationCreate },
  ];

  const experienceManagementItems: DrawerItem[] = [
    { text: 'Listar Experiências', icon: <ExperienceIcon />, path: DASHBOARD_ROUTES.experiences },
    { text: 'Nova Experiência', icon: <AddExperienceIcon />, path: DASHBOARD_ROUTES.experienceCreate },
  ];

  const skillManagementItems: DrawerItem[] = [
    { text: 'Listar Habilidades', icon: <SkillIcon />, path: DASHBOARD_ROUTES.skills },
    { text: 'Nova Habilidade', icon: <AddSkillIcon />, path: DASHBOARD_ROUTES.skillCreate },
  ];

  const renderNavItem = (item: DrawerItem) => (
    <ListItem key={item.text} disablePadding>
      <NextLink href={item.path} passHref style={{ textDecoration: 'none', width: '100%', color: 'inherit' }}>
        <ListItemButton 
          selected={pathname === item.path}
          component="div"
          sx={{ 
            color: '#f8fafc',
            '&.Mui-selected': {
              bgcolor: '#334155',
              '&:hover': {
                bgcolor: '#475569',
              }
            },
            '&:hover': {
              bgcolor: '#334155',
            }
          }}
        >
          <ListItemIcon sx={{ color: '#94a3b8' }}>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      </NextLink>
    </ListItem>
  );

  const drawer = (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: 2,
          justifyContent: 'space-between',
          bgcolor: '#1e293b'
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: '#f8fafc',
          }}
        >
          Admin Dashboard
        </Typography>
        <Box sx={{ display: { sm: 'none' } }}>
          <IconButton onClick={handleDrawerToggle} sx={{ color: '#f8fafc' }}>
            <CloseIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
      <Box sx={{ bgcolor: '#1e293b', height: '100%' }}>
        <List>
          {mainItems.map(renderNavItem)}
        </List>
        <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Gerenciamento de Usuários
          </Typography>
        </Box>
        <List>
          {userManagementItems.map(renderNavItem)}
        </List>
        <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Gerenciamento de Certificados
          </Typography>
        </Box>
        <List>
          {certificateManagementItems.map(renderNavItem)}
        </List>
        <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Gerenciamento de Educação
          </Typography>
        </Box>
        <List>
          {educationManagementItems.map(renderNavItem)}
        </List>
        <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Gerenciamento de Experiências
          </Typography>
        </Box>
        <List>
          {experienceManagementItems.map(renderNavItem)}
        </List>
        <Divider sx={{ bgcolor: 'rgba(248, 250, 252, 0.12)' }} />
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle2" sx={{ color: '#94a3b8', fontWeight: 600 }}>
            Gerenciamento de Habilidades
          </Typography>
        </Box>
        <List>
          {skillManagementItems.map(renderNavItem)}
        </List>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Botão para abrir menu em telas pequenas */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 5,
          display: { xs: 'block', sm: 'none' }
        }}
      >
        <IconButton
          color="primary"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            bgcolor: '#f8fafc',
            boxShadow: 3,
            '&:hover': { bgcolor: '#e2e8f0' }
          }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      
      {/* Drawer para dispositivos móveis */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor desempenho em dispositivos móveis
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: '#1e293b' },
        }}
      >
        {drawer}
      </Drawer>
      
      {/* Drawer permanente para desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'rgba(248, 250, 252, 0.12)',
            bgcolor: '#1e293b',
            position: 'relative',
            height: '100%',
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
} 