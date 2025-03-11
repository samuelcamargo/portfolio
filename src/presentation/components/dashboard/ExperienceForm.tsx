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
import { Experience, ExperienceInput } from '@/services/experienceService';
import experienceService from '@/services/experienceService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

interface ExperienceFormProps {
  experience?: Experience;
  isEditMode?: boolean;
  onSubmit?: (_data: ExperienceInput) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const initialFormState: ExperienceInput = {
  role: '',
  company: '',
  period: '',
  description: ''
};

export default function ExperienceForm({ 
  experience, 
  isEditMode = false,
  onSubmit,
  isLoading: externalLoading,
  error: externalError
}: ExperienceFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ExperienceInput>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Usar o estado de carregamento externo se fornecido
  const isLoading = externalLoading !== undefined ? externalLoading : loading;

  useEffect(() => {
    if (isEditMode && experience) {
      setFormData({
        role: experience.role,
        company: experience.company,
        period: experience.period,
        description: experience.description
      });
    }
  }, [isEditMode, experience]);

  // Mostrar erro externo se fornecido
  useEffect(() => {
    if (externalError) {
      setSnackbar({
        open: true,
        message: externalError,
        severity: 'error'
      });
    }
  }, [externalError]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.role.trim()) {
      newErrors.role = 'O cargo é obrigatório';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'A empresa é obrigatória';
    }

    if (!formData.period.trim()) {
      newErrors.period = 'O período é obrigatório';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'A descrição é obrigatória';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

    // Se houver uma função de envio externa, use-a
    if (onSubmit) {
      await onSubmit(formData);
      return;
    }

    // Caso contrário, use a lógica interna
    setLoading(true);
    try {
      if (isEditMode && experience) {
        await experienceService.updateExperience(experience.id, formData);
        setSnackbar({
          open: true,
          message: 'Experiência atualizada com sucesso!',
          severity: 'success',
        });
      } else {
        await experienceService.createExperience(formData);
        setSnackbar({
          open: true,
          message: 'Experiência criada com sucesso!',
          severity: 'success',
        });
        // Limpar formulário após criação bem-sucedida
        setFormData(initialFormState);
      }
      // Redirecionar após um curto atraso para mostrar a mensagem
      setTimeout(() => {
        router.push(DASHBOARD_ROUTES.experiences);
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
    router.push(DASHBOARD_ROUTES.experiences);
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
        {isEditMode ? 'Editar Experiência' : 'Nova Experiência'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="role"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Cargo
              </InputLabel>
              <TextField
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                fullWidth
                error={!!errors.role}
                helperText={errors.role}
                placeholder="Ex: Gerente de TI"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.role ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
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

          <Grid item xs={12} md={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="company"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Empresa
              </InputLabel>
              <TextField
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                fullWidth
                error={!!errors.company}
                helperText={errors.company}
                placeholder="Ex: Campsoft"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.company ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
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
                placeholder="Ex: Agosto de 2023 - Presente"
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

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="description"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Descrição
              </InputLabel>
              <TextField
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
                error={!!errors.description}
                helperText={errors.description}
                placeholder="Descreva suas responsabilidades e realizações neste cargo"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.description ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
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
              disabled={isLoading}
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
              {isLoading ? (
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