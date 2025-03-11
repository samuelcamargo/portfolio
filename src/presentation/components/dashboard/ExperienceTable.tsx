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
import { Experience } from '@/services/experienceService';
import experienceService from '@/services/experienceService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

export default function ExperienceTable() {
  const router = useRouter();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const loadExperiences = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await experienceService.getExperiences();
      setExperiences(data);
    } catch (error) {
      console.error('Erro ao carregar experiências:', error);
      setError('Falha ao carregar as experiências profissionais. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleEdit = (id: string) => {
    router.push(DASHBOARD_ROUTES.experienceEdit(id));
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
      await experienceService.deleteExperience(selectedId);
      setSnackbar({
        open: true,
        message: 'Experiência excluída com sucesso!',
        severity: 'success'
      });
      await loadExperiences();
    } catch (error) {
      console.error('Erro ao excluir experiência:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao excluir experiência. Por favor, tente novamente.',
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

  if (loading && experiences.length === 0) {
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
          <Table stickyHeader aria-label="tabela de experiências">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Cargo</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Empresa</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Período</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold', width: '30%' }}>Descrição</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {experiences.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ color: '#f8fafc' }}>
                    <Typography variant="body1">
                      Nenhuma experiência profissional encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                experiences.map((experience) => (
                  <TableRow hover key={experience.id}>
                    <TableCell sx={{ color: '#f8fafc' }}>{experience.role}</TableCell>
                    <TableCell sx={{ color: '#f8fafc' }}>{experience.company}</TableCell>
                    <TableCell sx={{ color: '#f8fafc' }}>{experience.period}</TableCell>
                    <TableCell sx={{ color: '#f8fafc' }}>
                      <Typography noWrap sx={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {experience.description}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        <Tooltip title="Editar">
                          <IconButton 
                            onClick={() => handleEdit(experience.id)}
                            sx={{ color: '#3b82f6' }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir">
                          <IconButton 
                            onClick={() => handleClickDelete(experience.id)}
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
            Tem certeza que deseja excluir esta experiência profissional? Esta ação não pode ser desfeita.
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