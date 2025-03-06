'use client';

import { useState, useEffect } from 'react';
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

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBalloon, setShowBalloon] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: 'Olá! Sou o assistente virtual do Samuel. Como posso ajudar?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mostrar o balão após 1 segundo
    const balloonTimer = setTimeout(() => {
      setShowBalloon(true);
    }, 1000);

    return () => clearTimeout(balloonTimer);
  }, []);

  const handleOpen = () => {
    setShowBalloon(false);
    setIsOpen(true);
  };

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
      <Box sx={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
        {showBalloon && (
          <Paper
            sx={{
              position: 'absolute',
              bottom: '100%',
              right: { xs: '-10px', sm: 0 },
              mb: 2,
              p: 3,
              width: { xs: 280, sm: 320 },
              maxWidth: '90vw',
              borderRadius: 3,
              bgcolor: 'background.paper',
              boxShadow: theme => theme.shadows[10],
              animation: `${fadeInUp} 0.5s ease-out`,
              border: '1px solid',
              borderColor: 'primary.main',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -10,
                right: { xs: 30, sm: 20 },
                width: 0,
                height: 0,
                borderLeft: '10px solid transparent',
                borderRight: '10px solid transparent',
                borderTop: theme => `10px solid ${theme.palette.background.paper}`,
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                bottom: -11,
                right: { xs: 29, sm: 19 },
                width: 0,
                height: 0,
                borderLeft: '11px solid transparent',
                borderRight: '11px solid transparent',
                borderTop: theme => `11px solid ${theme.palette.primary.main}`,
                zIndex: -1,
              }
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: 'text.primary',
                fontSize: { xs: '0.95rem', sm: '1rem' },
                lineHeight: 1.6,
                textAlign: 'center'
              }}
            >
              Oi! Eu sou uma IA assistente do Samuel. 
              <Box component="span" sx={{ display: 'block', mt: 1 }}>
                Clique em mim para saber tudo sobre o Samuel! 😊
              </Box>
            </Typography>
          </Paper>
        )}
        <Fab
          color="primary"
          aria-label="chat"
          onClick={handleOpen}
          sx={{
            width: { xs: 56, sm: 64 },
            height: { xs: 56, sm: 64 },
            animation: `${pulse} 2s infinite ease-in-out`,
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.1)',
              animation: 'none',
            },
            '& .MuiTypography-root': {
              animation: `${blink} 1.5s infinite ease-in-out`,
              fontWeight: 'bold',
              fontSize: { xs: '1.1rem', sm: '1.2rem' },
            }
          }}
        >
          <Typography>IA</Typography>
        </Fab>
      </Box>
    );
  }

  return (
    <Paper
      sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        width: { xs: 'calc(100% - 40px)', sm: 400 },
        height: { xs: 450, sm: 500 },
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        boxShadow: theme => theme.shadows[10],
        zIndex: 9999,
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: { xs: 2, sm: 3 },
        animation: `${fadeInUp} 0.3s ease-out`,
      }}
    >
      <Box 
        sx={{ 
          p: { xs: 1.5, sm: 2 },
          bgcolor: 'primary.main',
          background: theme => `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}
      >
        <Typography 
          variant="h6" 
          color="white" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}
        >
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
              bgcolor: 'rgba(255, 255, 255, 0.1)'
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
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: { xs: 0.8, sm: 1 },
          bgcolor: 'background.default',
        }}
      >
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: message.isUser ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              bgcolor: message.isUser ? 'primary.main' : 'background.paper',
              color: message.isUser ? 'white' : 'text.primary',
              p: { xs: 1.2, sm: 1.5 },
              borderRadius: 2,
              position: 'relative',
              boxShadow: 1,
              mb: 0.5,
              '&::before': message.isUser ? {
                content: '""',
                position: 'absolute',
                right: -6,
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderLeft: theme => `6px solid ${theme.palette.primary.main}`,
              } : {
                content: '""',
                position: 'absolute',
                left: -6,
                top: '50%',
                transform: 'translateY(-50%)',
                borderTop: '6px solid transparent',
                borderBottom: '6px solid transparent',
                borderRight: theme => `6px solid ${theme.palette.background.paper}`,
              },
            }}
          >
            <Typography 
              variant="body2" 
              sx={{ 
                fontSize: { xs: '0.9rem', sm: '0.95rem' },
                lineHeight: 1.5 
              }}
            >
              {message.text}
            </Typography>
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
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ fontSize: { xs: '0.9rem', sm: '0.95rem' } }}
            >
              Digitando...
            </Typography>
          </Box>
        )}
      </Box>

      <Box 
        sx={{ 
          p: { xs: 1.5, sm: 2 },
          borderTop: 1, 
          borderColor: 'divider', 
          bgcolor: 'background.paper' 
        }}
      >
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
                fontSize: { xs: '0.9rem', sm: '0.95rem' },
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
                bgcolor: 'primary.main',
                color: 'white',
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