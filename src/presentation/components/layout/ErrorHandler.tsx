'use client';

import { useEffect } from 'react';

/**
 * Componente responsável por gerenciar erros globais e promessas não tratadas
 */
export default function ErrorHandler() {
  // Adicionar gerenciador global de erros de promessas não tratadas
  useEffect(() => {
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      event.preventDefault();
      
      // Se o erro for sobre mensagem de canal fechado, apenas ignorar
      if (event.reason && event.reason.message && 
          event.reason.message.includes('message channel closed')) {
        // Ignorar silenciosamente erros de canal fechado
        // console.debug('Promessa cancelada devido ao fechamento do canal de mensagem');
        return;
      }
      
      // Registrar outros erros não tratados
      // Em produção, você pode querer enviar estes erros para um serviço de monitoramento
      // console.error('Erro de promessa não tratada:', event.reason);
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  // Este componente não renderiza nada visualmente
  return null;
} 