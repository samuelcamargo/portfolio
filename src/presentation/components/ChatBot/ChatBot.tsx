'use client';

import { useState } from 'react';
import { Box, Paper, TextField, IconButton, Typography, Fab, keyframes } from '@mui/material';
import { Send, Close } from '@mui/icons-material';
import { chatWithGemini } from '@/services/gemini';

// Definindo as animações
const pulse = keyframes`
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const blink = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Sou o assistente virtual do Samuel. Como posso ajudar?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Enviando mensagem para processamento...');
      const response = await chatWithGemini(input);
      console.log('Resposta recebida do serviço:', response);
      
      if (response) {
        const botMessage: Message = {
          text: response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Erro no chat:', error);
      const errorMessage: Message = {
        text: 'Desculpe, ocorreu um erro ao processar sua mensagem. Por favor, tente novamente.',
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Fab
        color="primary"
        aria-label="chat"
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          zIndex: 9999,
          animation: `${pulse} 2s infinite ease-in-out`,
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.1)',
            animation: 'none',
          },
          '& .MuiTypography-root': {
            animation: `${blink} 1.5s infinite ease-in-out`,
            fontWeight: 'bold',
            fontSize: '1.2rem',
          }
        }}
        onClick={() => setIsOpen(true)}
      >
        <Typography>IA</Typography>
      </Fab>
    );
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: { xs: 'calc(100% - 40px)', sm: 350 },
        height: 500,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: theme => theme.shadows[10],
        zIndex: 9999,
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 2,
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          bgcolor: 'primary.main',
          background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <Typography variant="h6" color="white" sx={{ fontWeight: 'bold' }}>
          Assistente Virtual IA
        </Typography>
        <IconButton 
          color="inherit" 
          onClick={() => setIsOpen(false)} 
          size="small"
          sx={{
            '&:hover': {
              transform: 'rotate(90deg)',
              transition: 'transform 0.3s ease-in-out',
            }
          }}
        >
          <Close />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          bgcolor: 'background.default',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              bgcolor: message.isUser ? 'primary.main' : 'background.paper',
              color: message.isUser ? 'white' : 'text.primary',
              p: 1.5,
              borderRadius: 2,
              position: 'relative',
              boxShadow: 1,
              '&::before': message.isUser ? {
                content: '""',
                position: 'absolute',
                right: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: theme => `8px solid ${theme.palette.primary.main}`,
              } : {
                content: '""',
                position: 'absolute',
                left: -8,
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderRight: theme => `8px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <Typography variant="body2">{message.text}</Typography>
          </Box>
        ))}
        {isLoading && (
          <Box 
            sx={{ 
              alignSelf: 'flex-start', 
              p: 1,
              animation: `${blink} 1s infinite ease-in-out`
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Digitando...
            </Typography>
          </Box>
        )}
      </Box>

      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            disabled={isLoading}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
          <IconButton 
            color="primary" 
            onClick={handleSend}
            disabled={isLoading}
            sx={{
              '&:hover': {
                transform: 'scale(1.1)',
                transition: 'transform 0.2s ease-in-out',
              }
            }}
          >
            <Send />
          </IconButton>
        </Box>
      </Box>
    </Paper>
  );
} 