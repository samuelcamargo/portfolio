'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, CircularProgress, Paper, keyframes } from '@mui/material';

// Importação dinâmica para evitar problemas de SSR com o ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TimelineData {
  date: string;
  count: number;
}

// Animações e efeitos
const pulseAnimation = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

// Animação de brilho removida porque não estava sendo utilizada (corrigindo erro de lint)
// const glowAnimation = keyframes`...`

const floatAnimation = keyframes`
  0% { transform: translateY(0) rotate(0); opacity: 0.7; }
  50% { transform: translateY(-15px) rotate(5deg); opacity: 0.5; }
  100% { transform: translateY(-30px) rotate(10deg); opacity: 0; }
`;

const scanlineAnimation = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
`;

const flashAnimation = keyframes`
  0% { opacity: 0.1; }
  50% { opacity: 0.2; }
  51% { opacity: 0.05; }
  100% { opacity: 0.1; }
`;

// Função para obter o token de autenticação
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  return null;
};

export default function CertificatesTimeline() {
  const [data, setData] = useState<TimelineData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartHovered, setChartHovered] = useState(false);

  useEffect(() => {
    // Sinal de aborto para cancelar a requisição se o componente for desmontado
    const abortController = new AbortController();
    const signal = abortController.signal;
    
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        
        if (!token) {
          throw new Error('Não autenticado');
        }

        // Usar o signal para permitir o cancelamento da requisição
        const response = await fetch('/dashboard/certificates/timeline', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          signal: signal
        });

        // Verificar se a requisição foi abortada
        if (signal.aborted) {
          return;
        }

        if (!response.ok) {
          // Quando a API retornar erro, usar dados de mock para teste/desenvolvimento
          const currentYear = new Date().getFullYear();
          const mockData = [
            { date: `${currentYear-4}`, count: 2 },
            { date: `${currentYear-3}`, count: 5 },
            { date: `${currentYear-2}`, count: 8 },
            { date: `${currentYear-1}`, count: 10 },
            { date: `${currentYear}`, count: 7 }
          ];
          
          if (!signal.aborted) {
            setData(mockData);
            setLoading(false);
          }
          return;
        }

        const responseData = await response.json();
        
        // Verificar novamente se o componente foi desmontado após receber os dados
        if (signal.aborted) {
          return;
        }
        
        // Verificar se os dados têm o formato esperado e tratar diferentes formatos possíveis
        if (!responseData) {
          throw new Error('Nenhum dado recebido');
        }

        let timelineData: TimelineData[] = [];

        // Verificar qual é o formato dos dados retornados e processá-los adequadamente
        if (Array.isArray(responseData)) {
          // Verificar o formato dos itens no array
          if (responseData.length > 0) {
            const firstItem = responseData[0];
            
            if (typeof firstItem === 'object' && firstItem !== null) {
              // Verificar se tem as propriedades esperadas
              if ('date' in firstItem && 'count' in firstItem) {
                // Formato já é o esperado (array de {date, count})
                timelineData = responseData;
              } else {
                // Tentativa de adaptação de outros formatos possíveis
                timelineData = responseData.map(item => ({
                  date: item.date || item.period || item.month || item.year || 'Desconhecido',
                  count: item.count || item.total || item.value || 0
                }));
              }
            }
          }
        } else if (typeof responseData === 'object' && responseData !== null) {
          // O objeto pode ter diferentes formatos, tentamos adaptar
          if ('dates' in responseData && 'counts' in responseData) {
            // Formato: { dates: string[], counts: number[] }
            if (Array.isArray(responseData.dates) && Array.isArray(responseData.counts)) {
              timelineData = responseData.dates.map((date: string, index: number) => ({
                date: date,
                count: responseData.counts[index] || 0
              }));
            }
          } else {
            // Tentar extrair pares chave-valor como data-contagem
            timelineData = Object.entries(responseData).map(([key, value]) => ({
              date: key,
              count: typeof value === 'number' ? value : 0
            }));
          }
        }
        
        if (timelineData.length === 0) {
          console.warn('Dados da timeline em formato inesperado:', responseData);
        }
        
        // Configurar com segurança evitando atualização em componente desmontado
        if (!signal.aborted) {
          setData(timelineData);
        }
      } catch (err) {
        // Não reportar erros de aborto
        if (err instanceof DOMException && err.name === 'AbortError') {
          // console.debug('Requisição de dados da timeline abortada');
          return;
        }
        
        // console.error('Erro ao buscar dados:', err);
        if (!signal.aborted) {
          setError('Erro ao carregar dados da timeline. Tente novamente mais tarde.');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: abortar requisição pendente se o componente for desmontado
    return () => {
      abortController.abort();
    };
  }, []);

  // Evento para controle de hover no gráfico
  const handleChartMouseEnter = () => {
    setChartHovered(true);
  };

  const handleChartMouseLeave = () => {
    setChartHovered(false);
  };

  // Adicionar listeners de eventos manualmente após a renderização
  useEffect(() => {
    const handleChartEvents = () => {
      const chart = document.querySelector('.apexcharts-canvas');
      if (chart) {
        chart.addEventListener('mouseenter', handleChartMouseEnter);
        chart.addEventListener('mouseleave', handleChartMouseLeave);
      }
      
      return () => {
        if (chart) {
          chart.removeEventListener('mouseenter', handleChartMouseEnter);
          chart.removeEventListener('mouseleave', handleChartMouseLeave);
        }
      };
    };

    // Esperar o gráfico renderizar
    const timeout = setTimeout(handleChartEvents, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [data]);

  // Verificar se data é um array válido
  const isDataValid = Array.isArray(data) && data.length > 0;

  // Preparar dados para ApexCharts
  const series = [{
    name: 'Certificados',
    data: isDataValid ? data.map(item => item.count) : []
  }];

  const categories = isDataValid ? data.map(item => item.date) : [];

  // Configurações do gráfico
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'area',
      height: 350,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 12,
        opacity: 0.3,
        color: '#FF2E93'
      },
      animations: {
        enabled: true,
        speed: 1200,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 450
        }
      },
      background: 'transparent'
    },
    colors: ['#FF2E93'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: ['#6E01EF'],
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.2,
        stops: [0, 100]
      }
    },
    stroke: {
      curve: 'smooth',
      width: 4,
      lineCap: 'round',
      colors: ['#FF2E93']
    },
    grid: {
      borderColor: '#334155',
      strokeDashArray: 3,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      row: {
        opacity: 0.2
      },
      column: {
        opacity: 0.2
      }
    },
    dataLabels: {
      enabled: false
    },
    markers: {
      size: 6,
      colors: ['#1a2035'],
      strokeColors: '#FF2E93',
      strokeWidth: 3,
      hover: {
        size: 10,
        sizeOffset: 5
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#94a3b8',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: true,
        color: '#334155'
      },
      axisTicks: {
        show: true,
        color: '#334155'
      },
      crosshairs: {
        show: true,
        width: 2,
        position: 'back',
        opacity: 0.8,
        stroke: {
          color: '#FF2E93',
          width: 2,
          dashArray: 3
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#94a3b8',
          fontWeight: 400
        },
        formatter: function(val) {
          return val.toFixed(0).toString();
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    tooltip: {
      theme: 'dark',
      x: {
        show: true
      },
      y: {
        formatter: function(val) {
          return `${val} certificados`;
        }
      },
      marker: {
        show: true
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      offsetY: 10,
      labels: {
        colors: '#f8fafc'
      },
      itemMargin: {
        horizontal: 15,
        vertical: 10
      }
    },
    theme: {
      mode: 'dark'
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 350,
        width: '100%'
      }}>
        <CircularProgress 
          sx={{ 
            color: '#FF2E93', 
            animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            '& .MuiCircularProgress-svg': {
              filter: 'drop-shadow(0 0 6px #FF2E93)'
            }
          }} 
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="#FF2E93" sx={{ textShadow: '0 0 8px rgba(255, 46, 147, 0.6)' }}>
          {error}
        </Typography>
      </Box>
    );
  }

  if (!isDataValid) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="#94a3b8">
          Nenhum dado de certificados encontrado.
        </Typography>
      </Box>
    );
  }

  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        background: 'linear-gradient(135deg, #1a2035 0%, #121828 100%)',
        boxShadow: '0 10px 25px rgba(255, 46, 147, 0.08)',
        height: '100%',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(255, 46, 147, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 30px rgba(255, 46, 147, 0.15)',
          border: '1px solid rgba(255, 46, 147, 0.2)',
          '&::after': {
            transform: 'rotate(45deg) translate(10%, 100%)'
          }
        },
        // Efeito de scanline
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'linear-gradient(transparent 50%, rgba(255, 46, 147, 0.03) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 1,
          opacity: 0.2,
          animation: `${scanlineAnimation} 10s linear infinite`,
          pointerEvents: 'none'
        },
        // Efeito de reflexo/brilho
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, transparent 45%, rgba(255, 46, 147, 0.1) 50%, transparent 55%)',
          transform: 'rotate(45deg) translate(0, 100%)',
          transition: 'transform 0.5s ease'
        }
      }}
    >
      {/* Overlay de efeito de flicker/falha */}
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          background: 'rgba(255, 46, 147, 0.03)',
          zIndex: 3, 
          pointerEvents: 'none',
          opacity: 0.1,
          animation: `${flashAnimation} 4s infinite`
        }} 
      />
      
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          mb: 2, 
          color: '#f8fafc', 
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(255, 46, 147, 0.4)',
          letterSpacing: '1px',
          position: 'relative',
          display: 'inline-block',
          zIndex: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -5,
            left: 0,
            width: '30%',
            height: 2,
            background: 'linear-gradient(90deg, #FF2E93, transparent)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        Certificados por Período
      </Typography>
      
      {/* Partículas flutuantes */}
      {chartHovered && [...Array(6)].map((_, i) => (
        <Box
          key={`particle-${i}`}
          sx={{
            position: 'absolute',
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            borderRadius: '50%',
            backgroundColor: '#FF2E93',
            boxShadow: '0 0 10px #FF2E93, 0 0 20px #FF2E93',
            bottom: '20%',
            left: `${(i * 16) + Math.random() * 10}%`,
            zIndex: 2,
            opacity: 0.8,
            animation: `${floatAnimation} ${Math.random() * 3 + 2}s infinite linear ${Math.random() * 2}s`
          }}
        />
      ))}
      
      <Box 
        sx={{ 
          height: 350, 
          width: '100%',
          position: 'relative',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            bottom: '5%',
            left: '10%',
            width: '80%',
            height: '10%',
            background: 'radial-gradient(ellipse at center, rgba(255, 46, 147, 0.15) 0%, rgba(0, 0, 0, 0) 80%)',
            filter: 'blur(8px)',
            zIndex: 0,
            opacity: chartHovered ? 0.7 : 0.3,
            transition: 'opacity 0.5s ease',
          }
        }}
      >
        {typeof window !== 'undefined' && (
          <ReactApexChart 
            options={options} 
            series={series} 
            type="area" 
            height={350} 
          />
        )}
      </Box>
    </Paper>
  );
} 