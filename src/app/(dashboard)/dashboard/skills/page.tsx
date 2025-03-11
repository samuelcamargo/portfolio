'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Container,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import NextLink from 'next/link';
import SkillTable from '@/presentation/components/dashboard/SkillTable';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

export default function SkillsPage() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push(DASHBOARD_ROUTES.skillCreate);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Habilidades</Typography>
      </Breadcrumbs>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc', fontWeight: 600 }}>
          Gerenciamento de Habilidades
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateNew}
          sx={{
            bgcolor: '#3b82f6',
            '&:hover': {
              bgcolor: '#2563eb',
            },
          }}
        >
          Nova Habilidade
        </Button>
      </Box>

      <SkillTable />
    </Container>
  );
} 