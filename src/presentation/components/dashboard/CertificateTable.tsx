'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton, 
  Tooltip, 
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  LinearProgress,
  Typography,
  Alert,
  Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, OpenInNew as OpenInNewIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';
import { Certificate } from '@/services/certificateService';

interface CertificateTableProps {
  certificates: Certificate[];
  onDelete: (_id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function CertificateTable({ certificates, onDelete, isLoading, error }: CertificateTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [certificateToDelete, setCertificateToDelete] = useState<Certificate | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleEditClick = (certificateId: string) => {
    router.push(DASHBOARD_ROUTES.certificateEdit(certificateId));
  };

  const handleDeleteClick = (certificate: Certificate) => {
    setCertificateToDelete(certificate);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!certificateToDelete) return;
    
    setDeleteLoading(true);
    setDeleteError(null);
    
    try {
      await onDelete(certificateToDelete.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Erro ao excluir certificado');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setCertificateToDelete(null);
    setDeleteError(null);
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, { bg: string, text: string }> = {
      'desenvolvimento': { bg: '#3b82f6', text: '#ffffff' },
      'data-science': { bg: '#8b5cf6', text: '#ffffff' },
      'cloud': { bg: '#06b6d4', text: '#ffffff' },
      'segurança': { bg: '#ef4444', text: '#ffffff' },
      'design': { bg: '#ec4899', text: '#ffffff' },
      'outras': { bg: '#94a3b8', text: '#ffffff' }
    };
    
    return categoryColors[category.toLowerCase()] || { bg: '#64748b', text: '#ffffff' };
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress sx={{ bgcolor: '#475569', '& .MuiLinearProgress-bar': { bgcolor: '#94a3b8' } }} />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#94a3b8' }}>
          Carregando certificados...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert 
        severity="error" 
        sx={{ 
          mt: 4, 
          bgcolor: 'rgba(239, 68, 68, 0.1)', 
          color: '#f87171',
          '& .MuiAlert-icon': { color: '#ef4444' } 
        }}
      >
        {error}
      </Alert>
    );
  }

  if (certificates.length === 0) {
    return (
      <Alert 
        severity="info" 
        sx={{ 
          mt: 4, 
          bgcolor: 'rgba(96, 165, 250, 0.1)', 
          color: '#93c5fd',
          '& .MuiAlert-icon': { color: '#3b82f6' } 
        }}
      >
        Nenhum certificado encontrado.
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4, bgcolor: '#334155', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <Table aria-label="tabela de certificados">
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid rgba(248, 250, 252, 0.1)' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Plataforma</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Data</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Categoria</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {certificates.map((certificate) => {
              const categoryColor = getCategoryColor(certificate.category);
              
              return (
                <TableRow 
                  key={certificate.id} 
                  sx={{ 
                    '&:last-child td, &:last-child th': { border: 0 },
                    '&:hover': { bgcolor: '#475569' },
                    borderBottom: '1px solid rgba(248, 250, 252, 0.05)'
                  }}
                >
                  <TableCell sx={{ color: '#f8fafc', borderBottom: 'none' }}>{certificate.name}</TableCell>
                  <TableCell sx={{ color: '#cbd5e1', borderBottom: 'none' }}>{certificate.platform}</TableCell>
                  <TableCell sx={{ color: '#cbd5e1', borderBottom: 'none' }}>{formatDate(certificate.date)}</TableCell>
                  <TableCell sx={{ borderBottom: 'none' }}>
                    <Chip 
                      label={certificate.category} 
                      sx={{ 
                        bgcolor: `${categoryColor.bg}`,
                        color: categoryColor.text,
                        fontWeight: 500,
                        borderRadius: '4px',
                        fontSize: '0.75rem'
                      }} 
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ borderBottom: 'none' }}>
                    {certificate.url && (
                      <Tooltip title="Ver certificado">
                        <IconButton 
                          aria-label="ver certificado" 
                          onClick={() => window.open(certificate.url, '_blank')}
                          sx={{ color: '#94a3b8' }}
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    <Tooltip title="Editar">
                      <IconButton 
                        aria-label="editar" 
                        onClick={() => handleEditClick(certificate.id)}
                        sx={{ color: '#60a5fa' }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir">
                      <IconButton 
                        aria-label="excluir" 
                        onClick={() => handleDeleteClick(certificate)}
                        sx={{ color: '#f87171' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Diálogo de confirmação de exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            bgcolor: '#1e293b',
            color: '#f8fafc',
            borderRadius: '8px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
          }
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ borderBottom: '1px solid rgba(248, 250, 252, 0.1)' }}>
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" sx={{ color: '#cbd5e1', my: 2 }}>
            Tem certeza que deseja excluir o certificado <strong style={{ color: '#f8fafc' }}>{certificateToDelete?.name}</strong>? 
            Esta ação não pode ser desfeita.
          </DialogContentText>
          {deleteError && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 2, 
                bgcolor: 'rgba(239, 68, 68, 0.1)', 
                color: '#f87171',
                '& .MuiAlert-icon': { color: '#ef4444' } 
              }}
            >
              {deleteError}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleDeleteCancel} 
            disabled={deleteLoading}
            sx={{ 
              color: '#94a3b8',
              '&:hover': {
                bgcolor: 'rgba(148, 163, 184, 0.1)'
              }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleDeleteConfirm} 
            variant="contained"
            disabled={deleteLoading}
            autoFocus
            sx={{
              bgcolor: '#ef4444',
              '&:hover': {
                bgcolor: '#dc2626'
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(239, 68, 68, 0.5)'
              }
            }}
          >
            {deleteLoading ? 'Excluindo...' : 'Excluir'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
} 