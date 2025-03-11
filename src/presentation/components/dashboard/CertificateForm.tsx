'use client';

import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Alert, 
  Paper, 
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { CertificateInput } from '@/services/certificateService';

interface CertificateFormProps {
  initialData?: CertificateInput;
  onSubmit: (_data: CertificateInput) => Promise<void>;
  isLoading: boolean;
  error: string | null;
  submitButtonText: string;
  title: string;
}

export default function CertificateForm({ 
  initialData, 
  onSubmit, 
  isLoading, 
  error, 
  submitButtonText,
  title
}: CertificateFormProps) {
  const formatDateForInput = (dateString: string): string => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    } catch (e) {
      return '';
    }
  };
  
  const [formData, setFormData] = useState<CertificateInput>(
    initialData || { 
      name: '', 
      platform: '', 
      date: '', 
      url: '', 
      category: '' 
    }
  );
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  
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
  
  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
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
    
    if (!formData.name.trim()) {
      errors.name = 'Nome do certificado é obrigatório';
    }
    
    if (!formData.platform.trim()) {
      errors.platform = 'Plataforma é obrigatória';
    }
    
    if (!formData.date) {
      errors.date = 'Data é obrigatória';
    }
    
    if (!formData.category) {
      errors.category = 'Categoria é obrigatória';
    }
    
    // URL é opcional, mas se fornecida, deve ser válida
    if (formData.url && !isValidURL(formData.url)) {
      errors.url = 'URL inválida';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    await onSubmit(formData);
  };
  
  const categories = [
    { value: 'desenvolvimento', label: 'Desenvolvimento' },
    { value: 'data-science', label: 'Data Science' },
    { value: 'cloud', label: 'Cloud Computing' },
    { value: 'segurança', label: 'Segurança' },
    { value: 'design', label: 'Design' },
    { value: 'outras', label: 'Outras' }
  ];
  
  return (
    <Paper 
      elevation={0} 
      sx={{ 
        p: 4, 
        maxWidth: '600px', 
        mx: 'auto',
        bgcolor: '#1e293b',
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
          label="Nome do Certificado"
          variant="outlined"
          fullWidth
          margin="normal"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={!!validationErrors.name}
          helperText={validationErrors.name}
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
              bgcolor: 'rgba(15, 23, 42, 0.3)',
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
          label="Plataforma"
          variant="outlined"
          fullWidth
          margin="normal"
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          error={!!validationErrors.platform}
          helperText={validationErrors.platform}
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
              bgcolor: 'rgba(15, 23, 42, 0.3)',
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
          label="Data do Certificado"
          variant="outlined"
          fullWidth
          margin="normal"
          name="date"
          type="date"
          value={formatDateForInput(formData.date)}
          onChange={handleChange}
          error={!!validationErrors.date}
          helperText={validationErrors.date || 'Formato: AAAA-MM-DD'}
          disabled={isLoading}
          required
          InputLabelProps={{ shrink: true }}
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
              bgcolor: 'rgba(15, 23, 42, 0.3)',
            },
            '& .MuiInputLabel-root': {
              color: '#94a3b8',
              '&.Mui-focused': {
                color: '#60a5fa',
              },
            },
            '& .MuiFormHelperText-root': {
              color: validationErrors.date ? '#f87171' : '#94a3b8',
            },
          }}
        />
        
        <TextField
          label="URL (opcional)"
          variant="outlined"
          fullWidth
          margin="normal"
          name="url"
          value={formData.url}
          onChange={handleChange}
          error={!!validationErrors.url}
          helperText={validationErrors.url}
          disabled={isLoading}
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
              bgcolor: 'rgba(15, 23, 42, 0.3)',
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
        
        <FormControl 
          fullWidth 
          margin="normal" 
          error={!!validationErrors.category}
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
              bgcolor: 'rgba(15, 23, 42, 0.3)',
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
            '& .MuiPaper-root': {
              bgcolor: '#1e293b',
              color: '#f8fafc',
            }
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
            disabled={isLoading}
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
          {validationErrors.category && (
            <Box component="p" sx={{ color: '#f87171', m: 0, mt: 1, fontSize: '0.75rem' }}>
              {validationErrors.category}
            </Box>
          )}
        </FormControl>
        
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