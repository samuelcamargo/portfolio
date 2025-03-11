'use client';

import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Container,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EducationTable from '@/presentation/components/dashboard/EducationTable';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

export default function EducationPage() {
  const router = useRouter();

  const handleCreateNew = () => {
    router.push(DASHBOARD_ROUTES.educationCreate);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc', fontWeight: 600 }}>
          Gerenciamento de Educação
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
          Novo Registro
        </Button>
      </Box>

      <EducationTable />
    </Container>
  );
} 