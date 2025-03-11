'use client';

import { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box,
  Breadcrumbs,
  Link as MuiLink,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';

import CertificateForm from '@/presentation/components/dashboard/CertificateForm';
import certificateService, { Certificate, CertificateInput } from '@/services/certificateService';
import { DASHBOARD_ROUTES } from '../../../../routes';

interface EditCertificatePageProps {
  params: {
    id: string;
  };
}

export default function EditCertificatePage({ params }: EditCertificatePageProps) {
  const { id } = params;
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCertificate = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const certificateData = await certificateService.getCertificateById(id);
        setCertificate(certificateData);
      } catch (err) {
        console.error('Erro ao buscar certificado:', err);
        setError('Falha ao carregar dados do certificado. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [id]);

  const handleUpdateCertificate = async (certificateData: CertificateInput) => {
    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      await certificateService.updateCertificate(id, certificateData);
      // Redirecionar para a lista de certificados após sucesso
      router.push(DASHBOARD_ROUTES.certificates);
    } catch (err) {
      console.error('Erro ao atualizar certificado:', err);
      setSubmitError('Falha ao atualizar certificado. Por favor, tente novamente.');
      setSubmitLoading(false);
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
        <Typography color="#f8fafc">Editar Certificado</Typography>
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
      ) : certificate ? (
        <CertificateForm
          initialData={{
            name: certificate.name,
            platform: certificate.platform,
            date: certificate.date,
            url: certificate.url,
            category: certificate.category
          }}
          onSubmit={handleUpdateCertificate}
          isLoading={submitLoading}
          error={submitError}
          submitButtonText="Atualizar Certificado"
          title={`Editar Certificado: ${certificate.name}`}
        />
      ) : null}
    </Container>
  );
} 