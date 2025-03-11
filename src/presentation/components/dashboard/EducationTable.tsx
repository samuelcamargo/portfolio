'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Education } from '@/services/educationService';
import educationService from '@/services/educationService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

export default function EducationTable() {
  const router = useRouter();
  const [educationList, setEducationList] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const loadEducation = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await educationService.getEducationList();
      setEducationList(data);
    } catch (error) {
      console.error('Erro ao carregar educação:', error);
      setError('Falha ao carregar os registros de educação. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleEdit = (id: string) => {
    router.push(DASHBOARD_ROUTES.educationEdit(id));
  };

  const handleClickDelete = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    
    setLoading(true);
    try {
      await educationService.deleteEducation(selectedId);
      setSnackbar({
        open: true,
        message: 'Registro de educação excluído com sucesso!',
        severity: 'success'
      });
      await loadEducation();
    } catch (error) {
      console.error('Erro ao excluir educação:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao excluir registro de educação. Por favor, tente novamente.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading && educationList.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  return (
    <>
      <Paper sx={{ width: '100%', bgcolor: '#1e293b', color: '#f8fafc', overflow: 'hidden', mb: 2 }}>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="tabela de educação">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Título</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Instituição</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Período</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educationList.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: '#f8fafc' }}>
                    <Typography variant="body1">
                      Nenhum registro de educação encontrado
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                educationList.map((education) => (
                  <TableRow hover key={education.id}>
                    <TableCell sx={{ color: '#f8fafc' }}>{education.title}</TableCell>
                    <TableCell sx={{ color: '#f8fafc' }}>{education.institution}</TableCell>
                    <TableCell sx={{ color: '#f8fafc' }}>{education.period}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Editar">
                          <IconButton 
                            onClick={() => handleEdit(education.id)}
                            sx={{ color: '#3b82f6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton 
                            onClick={() => handleClickDelete(education.id)}
                            sx={{ color: '#ef4444' }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Dialog para confirmar exclusão */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            bgcolor: '#1e293b',
            color: '#f8fafc',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }
        }}
      >
        <DialogTitle>Confirmar exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#cbd5e1' }}>
            Tem certeza que deseja excluir este registro de educação? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            onClick={handleCloseDialog} 
            sx={{ 
              color: '#94a3b8',
              '&:hover': { bgcolor: 'rgba(148, 163, 184, 0.1)' }
            }}
          >
            Cancelar
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            sx={{ 
              color: '#ef4444',
              '&:hover': { bgcolor: 'rgba(239, 68, 68, 0.1)' }
            }}
            autoFocus
          >
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para mostrar feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
} 