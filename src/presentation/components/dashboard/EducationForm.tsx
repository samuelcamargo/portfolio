'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Snackbar,
  InputLabel,
  FormControl,
} from '@mui/material';
import { Education, EducationInput } from '@/services/educationService';
import educationService from '@/services/educationService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

interface EducationFormProps {
  education?: Education;
  isEditMode?: boolean;
}

const initialFormState: EducationInput = {
  title: '',
  institution: '',
  period: '',
};

export default function EducationForm({ education, isEditMode = false }: EducationFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<EducationInput>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Se estiver no modo de edição e tiver dados do usuário, carregue-os no formulário
  useEffect(() => {
    if (isEditMode && education) {
      setFormData({
        title: education.title,
        institution: education.institution,
        period: education.period,
      });
    }
  }, [isEditMode, education]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'O título é obrigatório';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'A instituição é obrigatória';
    }

    if (!formData.period.trim()) {
      newErrors.period = 'O período é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      setSnackbar({
        open: true,
        message: 'Por favor, corrija os erros no formulário.',
        severity: 'error',
      });
      return;
    }

    setLoading(true);
    try {
      if (isEditMode && education) {
        await educationService.updateEducation(education.id, formData);
        setSnackbar({
          open: true,
          message: 'Educação atualizada com sucesso!',
          severity: 'success',
        });
      } else {
        await educationService.createEducation(formData);
        setSnackbar({
          open: true,
          message: 'Educação criada com sucesso!',
          severity: 'success',
        });
        // Limpar formulário após criação bem-sucedida
        setFormData(initialFormState);
      }
      // Redirecionar após um curto atraso para mostrar a mensagem
      setTimeout(() => {
        router.push(DASHBOARD_ROUTES.education);
      }, 1500);
    } catch (error) {
      console.error('Erro ao processar o formulário:', error);
      setSnackbar({
        open: true,
        message: 'Erro ao processar formulário. Por favor, tente novamente.',
        severity: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    router.push(DASHBOARD_ROUTES.education);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: '#1e293b',
        color: '#f8fafc',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditMode ? 'Editar Educação' : 'Nova Educação'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="title"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Título
              </InputLabel>
              <TextField
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                error={!!errors.title}
                helperText={errors.title}
                placeholder="Ex: MBA em Gestão de Projetos"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.title ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
                variant="outlined"
                required
                FormHelperTextProps={{
                  sx: { color: '#ef4444' },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="institution"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Instituição
              </InputLabel>
              <TextField
                id="institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                fullWidth
                error={!!errors.institution}
                helperText={errors.institution}
                placeholder="Ex: Universidade Anhembi Morumbi"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.institution ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
                variant="outlined"
                required
                FormHelperTextProps={{
                  sx: { color: '#ef4444' },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="period"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Período
              </InputLabel>
              <TextField
                id="period"
                name="period"
                value={formData.period}
                onChange={handleChange}
                fullWidth
                error={!!errors.period}
                helperText={errors.period}
                placeholder="Ex: 2023 - 2024"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.period ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#3b82f6',
                    },
                  },
                }}
                variant="outlined"
                required
                FormHelperTextProps={{
                  sx: { color: '#ef4444' },
                }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              sx={{
                color: '#94a3b8',
                borderColor: '#94a3b8',
                '&:hover': {
                  borderColor: '#cbd5e1',
                  bgcolor: 'rgba(148, 163, 184, 0.1)',
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: '#3b82f6',
                color: '#ffffff',
                '&:hover': {
                  bgcolor: '#2563eb',
                },
                '&.Mui-disabled': {
                  bgcolor: 'rgba(59, 130, 246, 0.5)',
                },
              }}
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: '#f8fafc' }} />
              ) : isEditMode ? (
                'Atualizar'
              ) : (
                'Criar'
              )}
            </Button>
          </Grid>
        </Grid>
      </Box>

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
    </Paper>
  );
} 