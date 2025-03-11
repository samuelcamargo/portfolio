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
  Alert
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';
import { User } from '@/services/userService';

interface UserTableProps {
  users: User[];
  onDelete: (_id: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export default function UserTable({ users, onDelete, isLoading, error }: UserTableProps) {
  const router = useRouter();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const handleEditClick = (userId: string) => {
    router.push(DASHBOARD_ROUTES.userEdit(userId));
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;
    
    setDeleteLoading(true);
    setDeleteError(null);
    
    try {
      await onDelete(userToDelete.id);
      setDeleteDialogOpen(false);
    } catch (error) {
      setDeleteError(error instanceof Error ? error.message : 'Erro ao excluir usuário');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
    setDeleteError(null);
  };

  if (isLoading) {
    return (
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress sx={{ bgcolor: '#475569', '& .MuiLinearProgress-bar': { bgcolor: '#94a3b8' } }} />
        <Typography variant="body2" sx={{ mt: 2, textAlign: 'center', color: '#94a3b8' }}>
          Carregando usuários...
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

  if (users.length === 0) {
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
        Nenhum usuário encontrado.
      </Alert>
    );
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4, bgcolor: '#334155', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <Table aria-label="tabela de usuários">
          <TableHead>
            <TableRow sx={{ borderBottom: '2px solid rgba(248, 250, 252, 0.1)' }}>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Nome de Usuário</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: '#f8fafc', borderBottom: 'none' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow 
                key={user.id} 
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': { bgcolor: '#475569' },
                  borderBottom: '1px solid rgba(248, 250, 252, 0.05)'
                }}
              >
                <TableCell sx={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', color: '#cbd5e1', borderBottom: 'none' }}>
                  <Tooltip title={user.id}>
                    <span>{user.id.substring(0, 8)}...</span>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{ color: '#f8fafc', borderBottom: 'none' }}>{user.username}</TableCell>
                <TableCell align="right" sx={{ borderBottom: 'none' }}>
                  <Tooltip title="Editar">
                    <IconButton 
                      aria-label="editar" 
                      onClick={() => handleEditClick(user.id)}
                      sx={{ color: '#60a5fa' }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      aria-label="excluir" 
                      onClick={() => handleDeleteClick(user)}
                      sx={{ color: '#f87171' }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
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
            Tem certeza que deseja excluir o usuário <strong style={{ color: '#f8fafc' }}>{userToDelete?.username}</strong>? 
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