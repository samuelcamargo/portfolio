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
  Snackbar,
  Chip
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { Skill } from '@/services/skillService';
import skillService from '@/services/skillService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

export default function SkillTable() {
  const router = useRouter();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const loadSkills = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await skillService.getSkills();
      setSkills(data);
    } catch (error) {
      console.error('Erro ao carregar habilidades:', error);
      setError('Falha ao carregar as habilidades. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleEdit = (id: string) => {
    router.push(DASHBOARD_ROUTES.skillEdit(id));
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
      await skillService.deleteSkill(selectedId);
      setSnackbar({
        open: true,
        message: 'Habilidade excluída com sucesso!',
        severity: 'success'
      });
      await loadSkills();
    } catch (error) {
      console.error('Erro ao excluir habilidade:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao excluir habilidade. Por favor, tente novamente.',
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

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'avançado':
        return { bg: '#3b82f6', text: '#ffffff' };
      case 'intermediário':
        return { bg: '#8b5cf6', text: '#ffffff' };
      case 'básico':
        return { bg: '#94a3b8', text: '#ffffff' };
      default:
        return { bg: '#64748b', text: '#ffffff' };
    }
  };

  const getCategoryColor = (category: string) => {
    const categoryColors: Record<string, { bg: string, text: string }> = {
      'backend': { bg: '#3b82f6', text: '#ffffff' },
      'frontend': { bg: '#ec4899', text: '#ffffff' },
      'database': { bg: '#06b6d4', text: '#ffffff' },
      'devops': { bg: '#ef4444', text: '#ffffff' },
      'arquitetura': { bg: '#8b5cf6', text: '#ffffff' },
      'gestão': { bg: '#10b981', text: '#ffffff' }
    };
    
    return categoryColors[category.toLowerCase()] || { bg: '#64748b', text: '#ffffff' };
  };

  if (loading && skills.length === 0) {
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
          <Table stickyHeader aria-label="tabela de habilidades">
            <TableHead>
              <TableRow>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Nome</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Nível</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Categoria</TableCell>
                <TableCell sx={{ bgcolor: '#1e293b', color: '#f8fafc', fontWeight: 'bold' }}>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {skills.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ color: '#f8fafc' }}>
                    <Typography variant="body1">
                      Nenhuma habilidade encontrada
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                skills.map((skill) => {
                  const levelColor = getLevelColor(skill.level);
                  const categoryColor = getCategoryColor(skill.category);
                  
                  return (
                    <TableRow hover key={skill.id}>
                      <TableCell sx={{ color: '#f8fafc' }}>{skill.name}</TableCell>
                      <TableCell>
                        <Chip 
                          label={skill.level} 
                          sx={{ 
                            bgcolor: levelColor.bg,
                            color: levelColor.text,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={skill.category} 
                          sx={{ 
                            bgcolor: categoryColor.bg,
                            color: categoryColor.text,
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex' }}>
                          <Tooltip title="Editar">
                            <IconButton 
                              onClick={() => handleEdit(skill.id)}
                              sx={{ color: '#3b82f6' }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Excluir">
                            <IconButton 
                              onClick={() => handleClickDelete(skill.id)}
                              sx={{ color: '#ef4444' }}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
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
            Tem certeza que deseja excluir esta habilidade? Esta ação não pode ser desfeita.
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