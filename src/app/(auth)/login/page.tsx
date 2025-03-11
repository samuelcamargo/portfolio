'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Lock as LockIcon, Visibility, VisibilityOff } from '@mui/icons-material';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [apiStatus, setApiStatus] = useState<string | null>(null);
  const [diagnosticMode, setDiagnosticMode] = useState(false);

  const checkApiStatus = async () => {
    setDiagnosticMode(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      setApiStatus(`Verificando API em: ${apiUrl}`);
      
      try {
        const response = await fetch(apiUrl as string);
        setApiStatus(`API base respondeu com status: ${response.status}`);
      } catch (error: any) {
        setApiStatus(`Erro na conexão com API: ${error.message || 'Erro desconhecido'}`);
      }
    } catch (error: unknown) {
      setApiStatus(`Erro no diagnóstico: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setApiStatus(null);
    setLoading(true);

    if (!username.trim()) {
      setError('O nome de usuário é obrigatório');
      setLoading(false);
      return;
    }

    if (!password.trim()) {
      setError('A senha é obrigatória');
      setLoading(false);
      return;
    }

    try {
      await login(username, password);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Usuário ou senha inválidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          backgroundColor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 2,
          mx: 'auto'
        }}
      >
        <LockIcon sx={{ color: 'white' }} />
      </Box>

      <Typography component="h1" variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
        Login
      </Typography>

      {error && (
        <Alert 
          severity="error" 
          sx={{ width: '100%', mb: 2 }}
          onClose={() => setError('')}
        >
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Usuário"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 1.5 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            'Entrar'
          )}
        </Button>

        {error && (
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            fullWidth
            onClick={checkApiStatus}
            sx={{ mb: 2 }}
          >
            Diagnosticar Problema
          </Button>
        )}

        {apiStatus && (
          <Alert severity="info" sx={{ width: '100%', mb: 2, wordBreak: 'break-word' }}>
            {apiStatus}
          </Alert>
        )}

        {diagnosticMode && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
            API URL: {process.env.NEXT_PUBLIC_API_URL || 'não definida'}
          </Typography>
        )}
      </Box>
    </>
  );
} 