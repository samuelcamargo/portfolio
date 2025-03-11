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
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { Skill, SkillInput } from '@/services/skillService';
import skillService from '@/services/skillService';
import { DASHBOARD_ROUTES } from '@/app/(dashboard)/routes';

interface SkillFormProps {
  skill?: Skill;
  isEditMode?: boolean;
  onSubmit?: (_data: SkillInput) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

const initialFormState: SkillInput = {
  name: '',
  level: '',
  category: ''
};

export default function SkillForm({ 
  skill, 
  isEditMode = false, 
  onSubmit,
  isLoading: externalLoading,
  error: externalError
}: SkillFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SkillInput>(initialFormState);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Usar o estado de carregamento externo se fornecido
  const isLoading = externalLoading !== undefined ? externalLoading : loading;

  useEffect(() => {
    if (isEditMode && skill) {
      setFormData({
        name: skill.name,
        level: skill.level,
        category: skill.category
      });
    }
  }, [isEditMode, skill]);

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

    if (!formData.name.trim()) {
      newErrors.name = 'O nome é obrigatório';
    }

    if (!formData.level) {
      newErrors.level = 'O nível é obrigatório';
    }

    if (!formData.category) {
      newErrors.category = 'A categoria é obrigatória';
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

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      if (isEditMode && skill) {
        await skillService.updateSkill(skill.id, formData);
        setSnackbar({
          open: true,
          message: 'Habilidade atualizada com sucesso!',
          severity: 'success',
        });
      } else {
        await skillService.createSkill(formData);
        setSnackbar({
          open: true,
          message: 'Habilidade criada com sucesso!',
          severity: 'success',
        });
        // Limpar formulário após criação bem-sucedida
        setFormData(initialFormState);
      }
      // Redirecionar após um curto atraso para mostrar a mensagem
      setTimeout(() => {
        router.push(DASHBOARD_ROUTES.skills);
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
    router.push(DASHBOARD_ROUTES.skills);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const levels = [
    { value: 'Básico', label: 'Básico' },
    { value: 'Intermediário', label: 'Intermediário' },
    { value: 'Avançado', label: 'Avançado' }
  ];

  const categories = [
    { value: 'Backend', label: 'Backend' },
    { value: 'Frontend', label: 'Frontend' },
    { value: 'Database', label: 'Database' },
    { value: 'DevOps', label: 'DevOps' },
    { value: 'Arquitetura', label: 'Arquitetura' },
    { value: 'Gestão', label: 'Gestão' }
  ];

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
        {isEditMode ? 'Editar Habilidade' : 'Nova Habilidade'}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <InputLabel
                htmlFor="name"
                shrink
                sx={{
                  color: '#94a3b8',
                  '&.Mui-focused': { color: '#3b82f6' },
                }}
              >
                Nome
              </InputLabel>
              <TextField
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                placeholder="Ex: Node.js"
                InputProps={{
                  sx: {
                    color: '#f8fafc',
                    bgcolor: 'rgba(15, 23, 42, 0.3)',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: errors.name ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
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
            <FormControl 
              fullWidth 
              error={!!errors.level}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f8fafc',
                  bgcolor: 'rgba(15, 23, 42, 0.3)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.level ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
              }}
            >
              <InputLabel id="level-label">Nível</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                name="level"
                value={formData.level}
                onChange={handleSelectChange}
                label="Nível"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#1e293b',
                      '& .MuiMenuItem-root': {
                        color: '#f8fafc'
                      }
                    }
                  }
                }}
              >
                {levels.map((level) => (
                  <MenuItem key={level.value} value={level.value} sx={{ color: '#f8fafc' }}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.level && (
                <Box component="p" sx={{ color: '#ef4444', m: '3px 14px 0px', fontSize: '0.75rem' }}>
                  {errors.level}
                </Box>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl 
              fullWidth 
              error={!!errors.category}
              required
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: '#f8fafc',
                  bgcolor: 'rgba(15, 23, 42, 0.3)',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: errors.category ? '#ef4444' : 'rgba(148, 163, 184, 0.5)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#3b82f6',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#94a3b8',
                  '&.Mui-focused': {
                    color: '#3b82f6',
                  },
                },
              }}
            >
              <InputLabel id="category-label">Categoria</InputLabel>
              <Select
                labelId="category-label"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleSelectChange}
                label="Categoria"
                MenuProps={{
                  PaperProps: {
                    sx: {
                      bgcolor: '#1e293b',
                      '& .MuiMenuItem-root': {
                        color: '#f8fafc'
                      }
                    }
                  }
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category.value} value={category.value} sx={{ color: '#f8fafc' }}>
                    {category.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <Box component="p" sx={{ color: '#ef4444', m: '3px 14px 0px', fontSize: '0.75rem' }}>
                  {errors.category}
                </Box>
              )}
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