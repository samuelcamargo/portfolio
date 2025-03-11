'use client';

import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import CertificateForm from '@/presentation/components/dashboard/CertificateForm';
import certificateService, { CertificateInput } from '@/services/certificateService';
import { DASHBOARD_ROUTES } from '../../../routes';

export default function CreateCertificatePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateCertificate = async (certificateData: CertificateInput) => {
    setLoading(true);
    setError(null);
    
    try {
      await certificateService.createCertificate(certificateData);
      // Redirecionar para a lista de certificados após sucesso
      router.push(DASHBOARD_ROUTES.certificates);
    } catch (err) {
      console.error('Erro ao criar certificado:', err);
      setError('Falha ao criar certificado. Por favor, verifique os dados e tente novamente.');
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
        <NextLink href={DASHBOARD_ROUTES.home} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Dashboard
          </MuiLink>
        </NextLink>
        <NextLink href={DASHBOARD_ROUTES.certificates} passHref>
          <MuiLink underline="hover" component="span" sx={{ color: '#94a3b8', cursor: 'pointer' }}>
            Certificados
          </MuiLink>
        </NextLink>
        <Typography color="#f8fafc">Novo Certificado</Typography>
      </Breadcrumbs>

      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.push(DASHBOARD_ROUTES.certificates)}
          sx={{ 
            color: '#94a3b8',
            '&:hover': {
              bgcolor: 'rgba(148, 163, 184, 0.1)',
              color: '#f8fafc'
            }
          }}
        >
          Voltar para lista
        </Button>
      </Box>

      <CertificateForm
        onSubmit={handleCreateCertificate}
        isLoading={loading}
        error={error}
        submitButtonText="Criar Certificado"
        title="Novo Certificado"
      />
    </Container>
  );
} 