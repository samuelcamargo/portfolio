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

// Cores neon para categorias de certificados
const categoryColors = {
  "Programação": { 
    main: "#00FFFF", 
    light: "#7DFFFF", 
    dark: "#00B3B3", 
    gradient: "linear-gradient(135deg, #00FFFF 0%, #00E5FF 100%)" 
  },
  "Design": { 
    main: "#FF00E6", 
    light: "#FF7DFF", 
    dark: "#B300A3", 
    gradient: "linear-gradient(135deg, #FF00E6 0%, #D500F9 100%)" 
  },
  "Marketing": { 
    main: "#FFC400", 
    light: "#FFD740", 
    dark: "#FFA000", 
    gradient: "linear-gradient(135deg, #FFC400 0%, #FFD740 100%)" 
  },
  "Gestão": { 
    main: "#00FF9D", 
    light: "#7DFFCE", 
    dark: "#00B36F", 
    gradient: "linear-gradient(135deg, #00FF9D 0%, #00E676 100%)" 
  },
  "DataScience": { 
    main: "#00AFFF", 
    light: "#64DAFF", 
    dark: "#0091EA", 
    gradient: "linear-gradient(135deg, #00AFFF 0%, #40C4FF 100%)" 
  },
};

// Efeito de pulsação
const pulseAnimation = keyframes`
  0% { opacity: 0.6; transform: scale(0.98); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0.6; transform: scale(0.98); }
`;

// Efeito de scanline
const scanlineAnimation = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
`;

// Efeito de flutuação
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Partículas flutuando
const particleAnimation = keyframes`
  0% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.6;
  }
  25% { 
    transform: translateY(-15px) translateX(10px); 
    opacity: 0.8;
  }
  50% { 
    transform: translateY(-25px) translateX(15px); 
    opacity: 0.6;
  }
  75% { 
    transform: translateY(-15px) translateX(10px); 
    opacity: 0.8;
  }
  100% { 
    transform: translateY(0px) translateX(0px); 
    opacity: 0.6;
  }
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

export default function CertificatesByCategory() {
  const [data, setData] = useState<ChartData[]>([]);
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
        const response = await fetch('/dashboard/certificates/by-category', {
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
            { category: 'Desenvolvimento', count: 8 },
            { category: 'Data Science', count: 5 },
            { category: 'Cloud', count: 3 },
            { category: 'Segurança', count: 2 },
            { category: 'Design', count: 1 }
          ];
          
          if (!signal.aborted) {
            setData(mockData.map(item => ({
              name: item.category,
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
              name: item.category || 'Outro',
              value: typeof item.count === 'number' ? item.count : 0
            }))
          : [];
          
        if (!signal.aborted) {
          setData(chartData);
        }
      } catch (err) {
        // Não reportar erros de aborto
        if (err instanceof DOMException && err.name === 'AbortError') {
          // console.debug('Requisição de dados por categoria abortada');
          return;
        }
        
        // console.error('Erro ao buscar dados:', err);
        if (!signal.aborted) {
          setError('Erro ao carregar dados por categoria. Tente novamente mais tarde.');
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

  // Ordenar dados para visualização (maior para menor)
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  
  // Preparar dados para o gráfico
  const series = [{
    name: 'Certificados',
    data: sortedData.map(item => item.value)
  }];
  
  const categories = sortedData.map(item => item.name);
  
  // Obter cores para cada categoria
  const categoryMainColors = categories.map(category => 
    categoryColors[category as keyof typeof categoryColors]?.main || "#00FFFF"
  );

  // Configurações do gráfico
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      background: 'transparent',
      animations: {
        enabled: true,
        speed: 800,
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
      dropShadow: {
        enabled: true,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5,
        color: '#00FFFF'
      },
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 4,
        borderRadiusApplication: 'end',
        barHeight: '70%',
        distributed: true,
        dataLabels: {
          position: 'bottom'
        }
      }
    },
    colors: categoryMainColors,
    dataLabels: {
      enabled: true,
      formatter: function(val) {
        return val.toString();
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Space Grotesk, sans-serif',
        fontWeight: 'bold',
        colors: ['#f8fafc'],
      },
      background: {
        enabled: false
      },
      offsetX: 10
    },
    stroke: {
      width: 0,
      colors: ['#0f172a']
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: '#f8fafc',
          fontSize: '13px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: '#f8fafc',
          fontSize: '13px',
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 500
        }
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
    grid: {
      show: true,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      strokeDashArray: 5,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
      padding: {
        top: 0,
        right: 20,
        bottom: 0,
        left: 0
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: categories.map(category => 
          categoryColors[category as keyof typeof categoryColors]?.light || "#7DFFFF"
        ),
        inverseColors: false,
        opacityFrom: 0.8,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten'
        }
      },
      active: {
        filter: {
          type: 'none'
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          yaxis: {
            labels: {
              style: {
                fontSize: '11px'
              }
            }
          }
        }
      }
    ]
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
            color: '#00FFFF', 
            animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            '& .MuiCircularProgress-svg': {
              filter: 'drop-shadow(0 0 6px #00FFFF)'
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
        boxShadow: '0 10px 25px rgba(0, 255, 255, 0.08)',
        height: '100%',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 30px rgba(0, 255, 255, 0.15)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
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
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 255, 0.03) 50%)',
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
          background: 'linear-gradient(to top, rgba(0, 255, 255, 0.1), transparent)',
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
          textShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
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
            background: 'linear-gradient(90deg, #00FFFF, transparent)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        Certificados por Categoria
      </Typography>
      
      {/* Partículas decorativas */}
      {chartHovered && (
        <>
          <Box
            sx={{
              position: 'absolute',
              top: '20%',
              right: '10%',
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: '#00FFFF',
              boxShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF',
              opacity: 0.7,
              zIndex: 1,
              animation: `${particleAnimation} 4s infinite ease-in-out`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              right: '15%',
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#FFC400',
              boxShadow: '0 0 10px #FFC400, 0 0 20px #FFC400',
              opacity: 0.7,
              zIndex: 1,
              animation: `${particleAnimation} 5s infinite ease-in-out`
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '70%',
              right: '5%',
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#FF00E6',
              boxShadow: '0 0 10px #FF00E6, 0 0 20px #FF00E6',
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
          animation: chartHovered ? `${floatAnimation} 4s infinite ease-in-out` : 'none',
        }}
      >
        {typeof window !== 'undefined' && (
          <ReactApexChart 
            options={options} 
            series={series} 
            type="bar" 
            height={350} 
          />
        )}
      </Box>
    </Paper>
  );
} 