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

// Cores vibrantes neon para os níveis
const levelColors = {
  "Avançado": { 
    main: "#00FF9D", 
    light: "#7DFFCE", 
    dark: "#00B36F", 
    gradient: "linear-gradient(135deg, #00FF9D 0%, #00E676 100%)" 
  },
  "Intermediário": { 
    main: "#FFC400", 
    light: "#FFE17D", 
    dark: "#B38A00", 
    gradient: "linear-gradient(135deg, #FFC400 0%, #FFAB00 100%)" 
  },
  "Básico": { 
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

// Efeito de rotação
const rotateAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
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

export default function SkillsByLevel() {
  const [data, setData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [chartHovered, setChartHovered] = useState(false);
  const [centerData, setCenterData] = useState<{label: string, value: number} | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        
        if (!token) {
          throw new Error('Não autenticado');
        }

        const response = await fetch('/dashboard/skills/by-level', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          // Quando a API retornar erro, usar dados de mock para teste/desenvolvimento
          const mockData: ChartData[] = [
            { name: 'Avançado', value: 27 },
            { name: 'Intermediário', value: 11 },
            { name: 'Básico', value: 0 }
          ];
          
          setData(mockData);
          
          // Definir dados iniciais para o centro do donut (maior valor por padrão)
          if (mockData.length > 0) {
            const maxItem = mockData.reduce((max, item) => 
              item.value > max.value ? item : max, mockData[0]);
            setCenterData({label: maxItem.name, value: maxItem.value});
          }
          
          setLoading(false);
          return;
        }

        const responseData = await response.json();
        
        // Verificar se os dados têm a estrutura esperada
        if (!responseData.levels || !responseData.counts || 
            !Array.isArray(responseData.levels) || !Array.isArray(responseData.counts) ||
            responseData.levels.length !== responseData.counts.length) {
          throw new Error('Formato de dados inválido');
        }
        
        // Transformar os dados para o formato do gráfico
        const chartData: ChartData[] = responseData.levels.map((level: string, index: number) => ({
          name: level,
          value: responseData.counts[index]
        }));

        setData(chartData);
        
        // Definir dados iniciais para o centro do donut (maior valor por padrão)
        if (chartData.length > 0) {
          const maxItem = chartData.reduce((max, item) => 
            item.value > max.value ? item : max, chartData[0]);
          setCenterData({label: maxItem.name, value: maxItem.value});
        }

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
  
  // Obter cores para cada nível
  const levelMainColors = labels.map(label => 
    levelColors[label as keyof typeof levelColors]?.main || "#00FF9D"
  );

  // Configurações do gráfico
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
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
        color: '#00FF9D',
        top: 3,
        left: 0,
        blur: 10,
        opacity: 0.35
      },
      events: {
        dataPointSelection: function(event, chartContext, config) {
          const selectedLabel = labels[config.dataPointIndex];
          const selectedValue = series[config.dataPointIndex];
          setCenterData({label: selectedLabel, value: selectedValue});
        },
        dataPointMouseEnter: function(event, chartContext, config) {
          const selectedLabel = labels[config.dataPointIndex];
          const selectedValue = series[config.dataPointIndex];
          setCenterData({label: selectedLabel, value: selectedValue});
        },
        dataPointMouseLeave: function(_event, _chartContext, _config) {
          // Voltar para o valor maior ao sair
          if (data.length > 0) {
            const maxItem = data.reduce((max, item) => 
              item.value > max.value ? item : max, data[0]);
            setCenterData({label: maxItem.name, value: maxItem.value});
          }
        }
      },
      background: 'transparent'
    },
    colors: levelMainColors,
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
          levelColors[label as keyof typeof levelColors]?.light || "#7DFFCE"
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
        fillColors: levelMainColors
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
          return val.toString() + ' habilidades';
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
          type: 'darken',
        }
      },
      active: {
        filter: {
          type: 'none',
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
            color: '#00FF9D', 
            animation: `${pulseAnimation} 1.5s infinite ease-in-out`,
            '& .MuiCircularProgress-svg': {
              filter: 'drop-shadow(0 0 6px #00FF9D)'
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
        boxShadow: '0 10px 25px rgba(0, 255, 157, 0.08)',
        height: '100%',
        transition: 'all 0.5s ease',
        border: '1px solid rgba(0, 255, 157, 0.1)',
        backdropFilter: 'blur(10px)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px) scale(1.02)',
          boxShadow: '0 20px 30px rgba(0, 255, 157, 0.15)',
          border: '1px solid rgba(0, 255, 157, 0.2)',
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
          backgroundImage: 'linear-gradient(transparent 50%, rgba(0, 255, 157, 0.03) 50%)',
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
          background: 'linear-gradient(45deg, transparent 45%, rgba(0, 255, 157, 0.1) 50%, transparent 55%)',
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
          textShadow: '0 0 10px rgba(0, 255, 157, 0.4)',
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
            background: 'linear-gradient(90deg, #00FF9D, transparent)',
            transition: 'width 0.3s ease',
          },
          '&:hover::after': {
            width: '100%'
          }
        }}
      >
        Habilidades por Nível
      </Typography>
      
      {/* Elemento circular interno rotativo */}
      {chartHovered && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(0, 255, 157, 0.2)',
            opacity: 0.4,
            zIndex: 1,
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px dashed rgba(0, 255, 157, 0.4)',
              animation: `${rotateAnimation} 10s linear infinite`
            }
          }}
        />
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
            background: 'radial-gradient(circle, rgba(0, 255, 157, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
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