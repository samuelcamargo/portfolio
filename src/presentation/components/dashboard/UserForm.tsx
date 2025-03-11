'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Alert, 
  Paper, 
  Typography,
  InputAdornment,
  IconButton,
  CircularProgress
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { UserWithPassword } from '@/services/userService';

interface UserFormProps {
  initialData?: UserWithPassword;
  onSubmit: (_data: UserWithPassword) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  submitButtonText: string;
  title: string;
}

export default function UserForm({ 
  initialData, 
  onSubmit, 
  isLoading, 
  error, 
  submitButtonText,
  title
}: UserFormProps) {
  const [formData, setFormData] = useState<UserWithPassword>(
    initialData || { username: '', password: '' }
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpar erro de validação ao editar
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Nome de usuário é obrigatório';
    } else if (formData.username.length < 3) {
      errors.username = 'Nome de usuário deve ter pelo menos 3 caracteres';
    }
    
    // Só validar senha se for criação ou se o campo de senha tiver sido preenchido na edição
    if (!initialData || formData.password) {
      if (!formData.password) {
        errors.password = 'Senha é obrigatória';
      } else if (formData.password.length < 6) {
        errors.password = 'Senha deve ter pelo menos 6 caracteres';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    // Se estiver editando e a senha estiver vazia, enviar apenas o username
    if (initialData && !formData.password) {
      await onSubmit({ username: formData.username, password: '' });
    } else {
      await onSubmit(formData);
    }
  };
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        maxWidth: '600px', 
        mx: 'auto',
        bgcolor: '#334155',
        borderRadius: '8px',
        border: '1px solid rgba(248, 250, 252, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}
    >
      <Typography 
        variant="h5" 
        component="h2" 
        gutterBottom
        sx={{ 
          fontWeight: 600, 
          color: '#f8fafc',
          borderBottom: '1px solid rgba(248, 250, 252, 0.1)',
          pb: 2,
          mb: 3
        }}
      >
        {title}
      </Typography>
      
      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mb: 3, 
            bgcolor: 'rgba(239, 68, 68, 0.1)', 
            color: '#f87171', 
            '& .MuiAlert-icon': { color: '#ef4444' }
          }}
        >
          {error}
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          label="Nome de usuário"
          variant="outlined"
          fullWidth
          margin="normal"
          name="username"
          value={formData.username}
          onChange={handleChange}
          error={!!validationErrors.username}
          helperText={validationErrors.username}
          disabled={isLoading}
          required
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(248, 250, 252, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(248, 250, 252, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#60a5fa',
              },
              color: '#f8fafc',
            },
            '& .MuiInputLabel-root': {
              color: '#94a3b8',
              '&.Mui-focused': {
                color: '#60a5fa',
              },
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
            },
          }}
        />
        
        <TextField
          label={initialData ? 'Nova senha (deixe em branco para manter atual)' : 'Senha'}
          variant="outlined"
          fullWidth
          margin="normal"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={!!validationErrors.password}
          helperText={validationErrors.password}
          disabled={isLoading}
          required={!initialData}
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(248, 250, 252, 0.2)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(248, 250, 252, 0.3)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#60a5fa',
              },
              color: '#f8fafc',
            },
            '& .MuiInputLabel-root': {
              color: '#94a3b8',
              '&.Mui-focused': {
                color: '#60a5fa',
              },
            },
            '& .MuiFormHelperText-root': {
              color: '#f87171',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  sx={{ color: '#94a3b8' }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={isLoading}
            sx={{ 
              minWidth: '120px',
              bgcolor: '#3b82f6',
              color: '#f8fafc',
              '&:hover': {
                bgcolor: '#2563eb'
              },
              '&.Mui-disabled': {
                bgcolor: 'rgba(59, 130, 246, 0.5)'
              }
            }}
          >
            {isLoading ? <CircularProgress size={24} sx={{ color: '#f8fafc' }} /> : submitButtonText}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
} 