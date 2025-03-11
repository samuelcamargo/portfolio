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

import CertificateTable from '@/presentation/components/dashboard/CertificateTable';
import certificateService, { Certificate } from '@/services/certificateService';
import { DASHBOARD_ROUTES } from '../../routes';

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const router = useRouter();

  const fetchCertificates = async () => {
    setLoading(true);
    setError(null);
    try {
      const certificateData = await certificateService.getCertificates();
      setCertificates(certificateData);
    } catch (err) {
      console.error('Erro ao buscar certificados:', err);
      setError('Não foi possível carregar os certificados. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleDelete = async (certificateId: string) => {
    setDeleteError(null);
    try {
      await certificateService.deleteCertificate(certificateId);
      // Atualizar a lista após deletar
      fetchCertificates();
    } catch (err) {
      console.error('Erro ao deletar certificado:', err);
      setDeleteError('Falha ao deletar certificado. Por favor, tente novamente.');
    }
  };

  const navigateToCreate = () => {
    router.push(DASHBOARD_ROUTES.certificateCreate);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Certificados</Typography>
      </Breadcrumbs>

      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1" sx={{ color: '#f8fafc' }}>
          Gerenciamento de Certificados
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
          Novo Certificado
        </Button>
      </Box>

      {deleteError && (
        <Alert severity="error" sx={{ mb: 3, bgcolor: 'rgba(239, 68, 68, 0.1)', color: '#f87171' }}>
          {deleteError}
        </Alert>
      )}

      <CertificateTable 
        certificates={certificates} 
        onDelete={handleDelete}
        isLoading={loading}
        error={error}
      />
    </Container>
  );
} 