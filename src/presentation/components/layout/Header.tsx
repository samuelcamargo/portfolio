'use client';
import * as React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery, ListItemIcon, Divider } from '@mui/material';
import NextLink from 'next/link';
import { styled } from '@mui/material/styles';
import { Menu as MenuIcon, Home, Person, Code, Mail } from '@mui/icons-material';

const StyledLink = styled(NextLink)`
  color: inherit;
  text-decoration: none;
`;

const menuItems = [
  { text: 'Início', href: '/', icon: <Home /> },
  { text: 'Sobre', href: '/about', icon: <Person /> },
  { text: 'Projetos', href: '/projects', icon: <Code /> },
  { text: 'Contato', href: '/contact', icon: <Mail /> },
];

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    width: '280px',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2, 0),
  },
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  margin: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ mt: 2 }}>
      <Typography
        variant="h6"
        component="div"
        sx={{
          textAlign: 'center',
          mb: 3,
          fontWeight: 'bold',
          color: 'primary.main',
        }}
      >
        Menu
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <List>
        {menuItems.map((item) => (
          <NextLink key={item.href} href={item.href} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
            <StyledListItem onClick={handleDrawerToggle} disablePadding>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  py: 1.5,
                  px: 3,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'primary.main' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '1.1rem',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </StyledListItem>
          </NextLink>
        ))}
      </List>
    </Box>
  );

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
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Typography 
          variant="h6" 
          component="div" 
          className="logo"
          sx={{ 
            flexGrow: 1,
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontWeight: 700,
            letterSpacing: '-0.02em',
            '& a': {
              background: 'linear-gradient(135deg, #F8FAFC 0%, #94A3B8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 10px rgba(124, 58, 237, 0.2)',
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                background: 'linear-gradient(135deg, #F8FAFC 30%, #7C3AED 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 12px rgba(124, 58, 237, 0.4)',
              }
            }
          }}
        >
          <StyledLink href="/">
            Samuel Camargo
          </StyledLink>
        </Typography>
        
        {isMobile ? (
          <StyledDrawer
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </StyledDrawer>
        ) : (
          <Box sx={{ display: 'flex', gap: 2 }}>
            {menuItems.slice(1).map((item) => (
              <Button
                key={item.href}
                color="inherit"
                component={NextLink}
                href={item.href}
                sx={{
                  fontSize: '1rem',
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
                startIcon={item.icon}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 