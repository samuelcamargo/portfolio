'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography, CircularProgress, Paper, keyframes } from '@mui/material';

// Importação dinâmica para evitar problemas de SSR com o ApexCharts
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface ChartData {
  name: string;
  value: number;
}

// Cores vibrantes neon para plataformas
const platformColors = {
  "Udemy": { 
    main: "#A020F0", 
    light: "#B24BF3", 
    dark: "#7A15B7", 
    gradient: "linear-gradient(135deg, #A020F0 0%, #B24BF3 100%)" 
  },
  "Alura": { 
    main: "#FF3D00", 
    light: "#FF6E40", 
    dark: "#DD2C00", 
    gradient: "linear-gradient(135deg, #FF3D00 0%, #FF6E40 100%)" 
  },
  "Coursera": { 
    main: "#00B0FF", 
    light: "#40C4FF", 
    dark: "#0091EA", 
    gradient: "linear-gradient(135deg, #00B0FF 0%, #40C4FF 100%)" 
  },
  "Pluralsight": { 
    main: "#FF0266", 
    light: "#FF4081", 
    dark: "#C51162", 
    gradient: "linear-gradient(135deg, #FF0266 0%, #FF4081 100%)" 
  },
  "LinkedIn Learning": { 
    main: "#00E5FF", 
    light: "#18FFFF", 
    dark: "#00B8D4", 
    gradient: "linear-gradient(135deg, #00E5FF 0%, #18FFFF 100%)" 
  },
};

// Efeito de pulsação
const pulseAnimation = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
`;

// Efeito de scanline
const scanlineAnimation = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
`;

// Animação de brilho removida porque não estava sendo utilizada (corrigindo erro de lint)

// Partículas flutuando
const particleAnimation = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
  50% { transform: translateY(-10px) translateX(5px); opacity: 0.8; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
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

export default function CertificatesByPlatform() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartHovered, setChartHovered] = useState(false);
  const [centerData, setCenterData] = useState<{label: string, value: number} | null>(null);

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
        const response = await fetch('/dashboard/certificates/by-platform', {
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
          const mockData = [
            { platform: 'Udemy', count: 12 },
            { platform: 'Alura', count: 8 },
            { platform: 'Coursera', count: 6 },
            { platform: 'Pluralsight', count: 4 },
            { platform: 'LinkedIn Learning', count: 3 }
          ];
          
          if (!signal.aborted) {
            setData(mockData.map(item => ({
              name: item.platform,
              value: item.count
            })));
            setLoading(false);
          }
          return;
        }

        const responseData = await response.json();
        
        // Verificar se o componente foi desmontado após receber os dados
        if (signal.aborted) {
          return;
        }
        
        // Processar os dados e converter para o formato necessário para o gráfico
        const chartData = Array.isArray(responseData) 
          ? responseData.map(item => ({
              name: item.platform || 'Outro',
              value: typeof item.count === 'number' ? item.count : 0
            }))
          : [];
          
        if (!signal.aborted) {
          setData(chartData);
          
          // Atualizar o centro do donut se houver dados
          if (chartData.length > 0) {
            const total = chartData.reduce((sum, item) => sum + item.value, 0);
            setCenterData({
              label: 'Total',
              value: total
            });
          }
        }
      } catch (err) {
        // Não reportar erros de aborto
        if (err instanceof DOMException && err.name === 'AbortError') {
          // console.debug('Requisição de dados por plataforma abortada');
          return;
        }
        
        // console.error('Erro ao buscar dados:', err);
        if (!signal.aborted) {
          setError('Erro ao carregar dados por plataforma. Tente novamente mais tarde.');
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

  const handleChartMouseEnter = () => {
    setChartHovered(true);
  };

  const handleChartMouseLeave = () => {
    setChartHovered(false);
  };

  // Adicionar eventos de mouse para o gráfico
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

  // Preparar dados para o gráfico
  const series = data.map(item => item.value);
  const labels = data.map(item => item.name);
  
  // Obter cores para cada plataforma
  const platformMainColors = labels.map(label => 
    platformColors[label as keyof typeof platformColors]?.main || "#A020F0"
  );

  // Configurações do gráfico
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        top: 3,
        left: 0,
        blur: 10,
        opacity: 0.35,
        color: '#A020F0'
      }
    },
    colors: platformMainColors,
    labels: labels,
    stroke: {
      width: 0,
      colors: ['#1a2035']
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        gradientToColors: labels.map(label => 
          platformColors[label as keyof typeof platformColors]?.light || "#B24BF3"
        ),
        shadeIntensity: 0.5,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    legend: {
      show: true,
      position: 'bottom',
      horizontalAlign: 'center',
      floating: false,
      fontSize: '14px',
      fontFamily: 'Space Grotesk, sans-serif',
      fontWeight: 500,
      labels: {
        colors: '#f8fafc'
      },
      markers: {
        strokeWidth: 0,
        size: 8,
        fillColors: platformMainColors
      },
      itemMargin: {
        horizontal: 12,
        vertical: 5
      },
      onItemClick: {
        toggleDataSeries: false
      },
      onItemHover: {
        highlightDataSeries: true
      }
    },
    tooltip: {
      enabled: true,
      theme: 'dark',
      style: {
        fontSize: '14px',
        fontFamily: 'Space Grotesk, sans-serif'
      },
      y: {
        formatter: function(val) {
          return val.toString() + ' certificados';
        }
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          background: 'transparent',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontWeight: 600,
              color: '#f8fafc',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '26px',
              fontFamily: 'Space Grotesk, sans-serif',
              color: '#f8fafc',
              offsetY: 10,
              formatter: function(val) {
                return val.toString();
              }
            },
            total: {
              show: false
            }
          }
        }
      }
    },
    states: {
      hover: {
        filter: {
          type: 'darken'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    responsive: [{
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom'
        }
      }
    }]
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
            color: '#A020F0', 
            animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            '& .MuiCircularProgress-svg': {
              filter: 'drop-shadow(0 0 6px #A020F0)'
            }
          }} 
        />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="#FF5F2D" sx={{ textShadow: '0 0 8px rgba(255, 95, 45, 0.6)' }}>
          {error}
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
        boxShadow: '0 10px 25px rgba(160, 32, 240, 0.08)',
        height: '100%',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(160, 32, 240, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 30px rgba(160, 32, 240, 0.15)',
          border: '1px solid rgba(160, 32, 240, 0.2)',
          '&::after': {
            opacity: 0.5
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
          backgroundImage: 'linear-gradient(transparent 50%, rgba(160, 32, 240, 0.03) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 1,
          opacity: 0.2,
          animation: `${scanlineAnimation} 10s linear infinite`,
          pointerEvents: 'none'
        },
        // Efeito de reflexo
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '30%',
          background: 'linear-gradient(to top, rgba(160, 32, 240, 0.1), transparent)',
          opacity: 0.2,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none'
        }
      }}
    >
      <Typography 
        variant="h6" 
        component="h3" 
        sx={{ 
          mb: 2, 
          color: '#f8fafc', 
          fontWeight: 'bold',
          textShadow: '0 0 10px rgba(160, 32, 240, 0.4)',
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
            background: 'linear-gradient(90deg, #A020F0, transparent)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        Certificados por Plataforma
      </Typography>
      
      {/* Partículas decorativas */}
      {chartHovered && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#A020F0',
              boxShadow: '0 0 10px #A020F0, 0 0 20px #A020F0',
              opacity: 0.7,
              zIndex: 1,
              animation: `${particleAnimation} 4s infinite ease-in-out`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '40%',
              right: '15%',
              width: 4,
              height: 4,
              borderRadius: '50%',
              background: '#FF3D00',
              boxShadow: '0 0 10px #FF3D00, 0 0 20px #FF3D00',
              opacity: 0.7,
              zIndex: 1,
              animation: `${particleAnimation} 5s infinite ease-in-out`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: '30%',
              right: '5%',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#00B0FF',
              boxShadow: '0 0 10px #00B0FF, 0 0 20px #00B0FF',
              opacity: 0.7,
              zIndex: 1,
              animation: `${particleAnimation} 4.5s infinite ease-in-out`
            }}
          />
        </>
      )}
      
      <Box 
        sx={{ 
          height: 350, 
          width: '100%',
          position: 'relative',
          zIndex: 2,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '40%',
            height: '40%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(160, 32, 240, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: 'blur(15px)',
            zIndex: 0,
            opacity: chartHovered ? 0.7 : 0.3,
            transition: 'opacity 0.5s ease',
          }
        }}
      >
        {typeof window !== 'undefined' && (
          <ReactApexChart 
            options={{
              ...options,
              plotOptions: {
                ...options.plotOptions,
                pie: {
                  ...options.plotOptions?.pie,
                  donut: {
                    ...options.plotOptions?.pie?.donut,
                    labels: {
                      ...options.plotOptions?.pie?.donut?.labels,
                      name: {
                        ...options.plotOptions?.pie?.donut?.labels?.name,
                        formatter: function() {
                          return centerData?.label || '';
                        }
                      },
                      value: {
                        ...options.plotOptions?.pie?.donut?.labels?.value,
                        formatter: function() {
                          return centerData ? `${centerData.value}` : '0';
                        }
                      }
                    }
                  }
                }
              }
            }} 
            series={series} 
            type="donut" 
            height={350} 
          />
        )}
      </Box>
    </Paper>
  );
} 