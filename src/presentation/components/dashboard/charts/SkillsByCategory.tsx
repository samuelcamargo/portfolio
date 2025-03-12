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

// Cores neon ciberpunk para as categorias
const categoryColors: Record<string, { main: string, light: string, dark: string, gradient: string }> = {
  "Backend": { 
    main: "#00E5FF", 
    light: "#80F1FF", 
    dark: "#00A2B3", 
    gradient: "linear-gradient(135deg, #00E5FF 0%, #2979FF 100%)" 
  },
  "Frontend": { 
    main: "#7B42F6", 
    light: "#B69FFF", 
    dark: "#4924A1", 
    gradient: "linear-gradient(135deg, #7B42F6 0%, #B388FF 100%)" 
  },
  "Database": { 
    main: "#FF2E93", 
    light: "#FF8FCB", 
    dark: "#B21F6A", 
    gradient: "linear-gradient(135deg, #FF2E93 0%, #FF0DBE 100%)" 
  },
  "DevOps": { 
    main: "#00FF9D", 
    light: "#7DFFCE", 
    dark: "#00B36F", 
    gradient: "linear-gradient(135deg, #00FF9D 0%, #00E676 100%)" 
  },
  "Arquitetura": { 
    main: "#FFC400", 
    light: "#FFE17D", 
    dark: "#B38A00", 
    gradient: "linear-gradient(135deg, #FFC400 0%, #FFAB00 100%)" 
  },
  "Gestão": { 
    main: "#FF5F2D", 
    light: "#FF9E7A", 
    dark: "#B33D15", 
    gradient: "linear-gradient(135deg, #FF5F2D 0%, #FF3D00 100%)" 
  }
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

// Efeito de partículas flutuantes
const floatAnimation = keyframes`
  0% { transform: translateY(0) rotate(0); opacity: 0.8; }
  50% { transform: translateY(-15px) rotate(5deg); opacity: 0.5; }
  100% { transform: translateY(-30px) rotate(10deg); opacity: 0; }
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

export default function SkillsByCategory() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartHovered, setChartHovered] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        
        if (!token) {
          throw new Error('Não autenticado');
        }

        const response = await fetch('/dashboard/skills/by-category', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          // Quando a API retornar erro, usar dados de mock para teste/desenvolvimento
          const mockData: ChartData[] = [
            { name: 'Backend', value: 9 },
            { name: 'Frontend', value: 8 },
            { name: 'Database', value: 6 },
            { name: 'DevOps', value: 4 },
            { name: 'Arquitetura', value: 3 },
            { name: 'Gestão', value: 3 }
          ];
          
          setData(mockData);
          setLoading(false);
          return;
        }

        const responseData = await response.json();
        
        // Verificar se os dados têm a estrutura esperada
        if (!responseData.categories || !responseData.counts || 
            !Array.isArray(responseData.categories) || !Array.isArray(responseData.counts) ||
            responseData.categories.length !== responseData.counts.length) {
          throw new Error('Formato de dados inválido');
        }
        
        // Transformar os dados para o formato do gráfico
        const chartData: ChartData[] = responseData.categories.map((category: string, index: number) => ({
          name: category,
          value: responseData.counts[index]
        }));

        setData(chartData);
      } catch (err) {
        console.error('Erro ao buscar dados:', err);
        setError('Não foi possível carregar os dados');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChartMouseEnter = () => {
    setChartHovered(true);
  };

  const handleChartMouseLeave = () => {
    setChartHovered(false);
  };

  // Preparar dados para ApexCharts
  const series = [{
    name: 'Habilidades',
    data: data.map(item => item.value)
  }];

  const categories = data.map(item => item.name);

  // Obter cores para as categorias (usando cor padrão para categorias desconhecidas)
  const categoryMainColors = categories.map(category => 
    categoryColors[category]?.main || "#00E5FF"
  );

  // Configurações do gráfico ApexCharts
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: {
        show: false
      },
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
        blur: 3,
        opacity: 0.3,
        color: '#00E5FF'
      },
      background: 'transparent'
    },
    plotOptions: {
      bar: {
        distributed: true,
        borderRadius: 6,
        borderRadiusApplication: 'end',
        borderRadiusWhenStacked: 'last',
        columnWidth: '65%',
        dataLabels: {
          position: 'top',
        },
        rangeBarOverlap: true,
      }
    },
    colors: categoryMainColors,
    dataLabels: {
      enabled: false,
      style: {
        colors: ['#ffffff'],
        fontWeight: 600,
        fontSize: '12px',
        fontFamily: 'Space Grotesk, sans-serif'
      },
      background: {
        enabled: true,
        foreColor: '#1e293b',
        padding: 4,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.7
      },
      offsetY: -20
    },
    states: {
      hover: {
        filter: {
          type: 'darken',
        }
      },
      active: {
        filter: {
          type: 'darken',
        }
      }
    },
    grid: {
      show: true,
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
        opacity: 0.1
      },
      column: {
        opacity: 0.1
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      }
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          colors: categories.map(() => '#94a3b8'),
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '12px',
          fontWeight: 500
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
        position: 'back',
        stroke: {
          color: '#00E5FF',
          width: 1,
          dashArray: 3
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          colors: ['#94a3b8'],
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '12px',
          fontWeight: 500
        },
        formatter: function (value) {
          return Math.floor(value).toString();
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
      x: {
        show: true
      },
      y: {
        formatter: function (val) {
          return val.toString();
        }
      },
      marker: {
        show: false
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0
      }
    },
    legend: {
      show: true,
      position: 'bottom',
      labels: {
        colors: '#f8fafc',
        useSeriesColors: false
      },
      markers: {
        size: 12,
        strokeWidth: 0,
        offsetX: 0,
        offsetY: 0
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0
      }
    },
    theme: {
      mode: 'dark'
    }
  };

  // Adicionar eventos de mouse fora do objeto options
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

    // Esperar um pouco para o gráfico renderizar
    const timeout = setTimeout(handleChartEvents, 500);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [data]);

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
            color: '#00E5FF', 
            animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            '& .MuiCircularProgress-svg': {
              filter: 'drop-shadow(0 0 6px #00E5FF)'
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

  return (
    <Paper 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        background: 'linear-gradient(135deg, #1a2035 0%, #121828 100%)',
        boxShadow: '0 10px 25px rgba(0, 229, 255, 0.08)',
        height: '100%',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(0, 229, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 30px rgba(0, 229, 255, 0.15)',
          border: '1px solid rgba(0, 229, 255, 0.2)',
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
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 229, 255, 0.03) 50%)',
          backgroundSize: '100% 4px',
          zIndex: 1,
          opacity: 0.2,
          animation: `${scanlineAnimation} 10s linear infinite`,
          pointerEvents: 'none'
        },
        // Efeito de brilho superior
        '&::after': {
          content: '""',
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(45deg, transparent 45%, rgba(0, 229, 255, 0.1) 50%, transparent 55%)',
          transform: 'rotate(45deg) translate(0, 100%)',
          transition: 'transform 0.5s ease'
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
          textShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
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
            background: 'linear-gradient(90deg, #00E5FF, transparent)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        Habilidades por Categoria
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
            backgroundColor: '#00E5FF',
            boxShadow: '0 0 10px #00E5FF, 0 0 20px #00E5FF',
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
            left: '5%',
            width: '90%',
            height: '10%',
            background: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.15) 0%, rgba(0, 0, 0, 0) 80%)',
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
            type="bar" 
            height={350} 
          />
        )}
      </Box>
    </Paper>
  );
} 