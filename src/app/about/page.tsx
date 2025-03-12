'use client';
import * as React from 'react';
import { Container, Typography, Box, Paper, Grid, Chip, useTheme, TextField, Button, IconButton } from '@mui/material';
import { School, Work, Code, Language, Terminal, Star, EmojiEvents, Sort, CalendarToday, Link as LinkIcon } from '@mui/icons-material';
import ChatBot from '@/presentation/components/ChatBot/ChatBot';
import { Skill, Experience, Certificate } from '../../domain/types/about';

// Interface para o componente TimelineItem
interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
}

// Componente TimelineItem para exibir experiências
const TimelineItem: React.FC<TimelineItemProps> = ({ experience, index, total }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        pb: index === total - 1 ? 0 : 8,
        opacity: 0,
        animation: 'fadeIn 0.5s ease-out forwards',
        animationDelay: `${index * 0.2}s`,
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
      }}
    >
      {/* Linha vertical */}
      {index !== total - 1 && (
        <Box
          sx={{
            position: 'absolute',
            left: { xs: '15px', md: '20px' },
            top: '40px',
            bottom: 0,
            width: '2px',
            bgcolor: 'primary.main',
            opacity: 0.3,
          }}
        />
      )}

      {/* Círculo do timeline */}
      <Box
        sx={{
          width: { xs: '30px', md: '40px' },
          height: { xs: '30px', md: '40px' },
          borderRadius: '50%',
          bgcolor: 'primary.main',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          boxShadow: '0 0 0 4px rgba(124, 58, 237, 0.1)',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '2px solid',
            borderColor: 'primary.main',
            animation: 'ripple 1.5s infinite',
            opacity: 0,
          },
          '@keyframes ripple': {
            from: {
              opacity: 1,
              transform: 'scale(1)',
            },
            to: {
              opacity: 0,
              transform: 'scale(1.5)',
            },
          },
        }}
      >
        <Work sx={{ color: 'white', fontSize: { xs: '1rem', md: '1.25rem' } }} />
      </Box>

      {/* Conteúdo */}
      <Box sx={{ ml: { xs: 2, md: 4 }, flex: 1 }}>
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, md: 3 },
            bgcolor: 'background.paper',
            borderRadius: 2,
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateX(8px)',
            },
          }}
        >
          <Typography
            variant="h5"
            gutterBottom
            color="primary"
            sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}
          >
            {experience.role}
          </Typography>
          <Typography
            variant="h6"
            gutterBottom
            color="text.secondary"
            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
          >
            {experience.company}
          </Typography>
          <Typography
            variant="subtitle2"
            gutterBottom
            color="text.secondary"
            sx={{ mb: 2, opacity: 0.8 }}
          >
            {experience.period}
          </Typography>
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: { xs: '0.9rem', md: '1rem' },
              lineHeight: 1.6,
            }}
          >
            {experience.description}
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default function AboutPage() {
  const [skills, setSkills] = React.useState<Skill[]>([]);
  const [languages, setLanguages] = React.useState<{name: string, level: string}[]>([]);
  const [experiences, setExperiences] = React.useState<Experience[]>([]);
  const [education, setEducation] = React.useState<{title: string, institution: string, period: string}[]>([]);
  const [allCertificates, setAllCertificates] = React.useState<Certificate[]>([]);
  
  // Estados de loading para cada seção
  const [loadingSkills, setLoadingSkills] = React.useState<boolean>(true);
  const [loadingLanguages, setLoadingLanguages] = React.useState<boolean>(true);
  const [loadingExperiences, setLoadingExperiences] = React.useState<boolean>(true);
  const [loadingEducation, setLoadingEducation] = React.useState<boolean>(true);
  const [loadingCertificates, setLoadingCertificates] = React.useState<boolean>(true);
  
  // Estados de erro para cada seção
  const [errorSkills, setErrorSkills] = React.useState<string | null>(null);
  const [errorLanguages, setErrorLanguages] = React.useState<string | null>(null);
  const [errorExperiences, setErrorExperiences] = React.useState<string | null>(null);
  const [errorEducation, setErrorEducation] = React.useState<string | null>(null);
  const [errorCertificates, setErrorCertificates] = React.useState<string | null>(null);
  
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [certFilter, setCertFilter] = React.useState<'az' | 'za' | 'newest' | 'oldest'>('newest');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [certCategory, setCertCategory] = React.useState<string>('all');
  
  // Componentes de skeleton para diferentes seções
  const SkillsSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Paper
            elevation={0}
            sx={{
              p: 2.5,
              bgcolor: 'background.paper',
              borderRadius: 2,
              height: '90px',
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 50%, ${theme.palette.background.paper} 100%)`,
                animation: 'shimmer 1.5s infinite',
              },
              '@keyframes shimmer': {
                '0%': {
                  transform: 'translateX(-100%)',
                },
                '100%': {
                  transform: 'translateX(100%)',
                },
              },
            }}
          />
        </Grid>
      ))}
    </>
  );
  
  const TimelineSkeleton = () => (
    <>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          sx={{
            display: 'flex',
            position: 'relative',
            pb: 8,
            opacity: 0.7,
          }}
        >
          <Box
            sx={{
              width: { xs: '30px', md: '40px' },
              height: { xs: '30px', md: '40px' },
              borderRadius: '50%',
              bgcolor: theme.palette.background.default,
              flexShrink: 0,
            }}
          />
          <Box sx={{ ml: { xs: 2, md: 4 }, flex: 1 }}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2, md: 3 },
                bgcolor: 'background.paper',
                borderRadius: 2,
                height: '160px',
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 50%, ${theme.palette.background.paper} 100%)`,
                  animation: 'shimmer 1.5s infinite',
                },
                '@keyframes shimmer': {
                  '0%': {
                    transform: 'translateX(-100%)',
                  },
                  '100%': {
                    transform: 'translateX(100%)',
                  },
                },
              }}
            />
          </Box>
        </Box>
      ))}
    </>
  );
  
  const EducationSkeleton = () => (
    <>
      {[1, 2].map((item) => (
        <Grid item xs={12} md={6} key={item}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: '150px',
              bgcolor: 'background.paper',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 50%, ${theme.palette.background.paper} 100%)`,
                animation: 'shimmer 1.5s infinite',
              },
            }}
          />
        </Grid>
      ))}
    </>
  );
  
  const CertificatesSkeleton = () => (
    <>
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <Grid item xs={12} sm={6} md={4} key={item}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              height: '160px',
              bgcolor: 'background.paper',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 50%, ${theme.palette.background.paper} 100%)`,
                animation: 'shimmer 1.5s infinite',
              },
            }}
          />
        </Grid>
      ))}
    </>
  );
  
  const LanguagesSkeleton = () => (
    <>
      {[1, 2, 3].map((item) => (
        <Grid item xs={12} sm={4} key={item}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              height: '100px',
              textAlign: 'center',
              bgcolor: 'background.paper',
              borderRadius: 2,
              position: 'relative',
              overflow: 'hidden',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 50%, ${theme.palette.background.paper} 100%)`,
                animation: 'shimmer 1.5s infinite',
              },
            }}
          />
        </Grid>
      ))}
    </>
  );

  // Função para carregar dados de uma API com tratamento de erros
  const fetchData = async <T,>(
    url: string, 
    setter: React.Dispatch<React.SetStateAction<T>>, 
    dataName: string,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    try {
      // eslint-disable-next-line no-console
      console.log(`Iniciando carregamento de ${dataName}`);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Erro na API ${dataName}: ${response.status} ${response.statusText}`);
      }

      const results = await response.json();
      // eslint-disable-next-line no-console
      console.log(`${dataName} carregados:`, results);

      setter(results);
      setLoading(false);
      setError(null);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Erro ao carregar ${dataName}:`, error);
      setLoading(false);
      setError(`Falha ao carregar ${dataName}. Tente novamente mais tarde.`);
    }
  };

  // Carregar os dados ao montar o componente
  React.useEffect(() => {
    // URL base da API a partir da variável de ambiente
    const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
    
    if (!API_URL) {
      // eslint-disable-next-line no-console
      console.error('URL da API não configurada. Verifique a variável NEXT_PUBLIC_API_URL no arquivo .env.local');
      
      // Definir erros para todas as seções
      const errorMessage = 'URL da API não configurada. Verifique suas configurações.';
      setErrorSkills(errorMessage);
      setErrorLanguages(errorMessage);
      setErrorExperiences(errorMessage);
      setErrorEducation(errorMessage);
      setErrorCertificates(errorMessage);
      
      // Desativar loadings
      setLoadingSkills(false);
      setLoadingLanguages(false);
      setLoadingExperiences(false);
      setLoadingEducation(false);
      setLoadingCertificates(false);
      return;
    }
    
    // Usar Promise.all para carregar todos os dados em paralelo
    Promise.all([
      fetch(`${API_URL}/skills`),
      fetch(`${API_URL}/languages`),
      fetch(`${API_URL}/experiences`),
      fetch(`${API_URL}/education`),
      fetch(`${API_URL}/certificates`)
    ])
    .then(responses => {
      // Verifica se alguma resposta não está ok
      const failedResponses = responses.filter(response => !response.ok);
      if (failedResponses.length > 0) {
        throw new Error(`${failedResponses.length} requisições falharam`);
      }
      
      // Retorna todas as respostas convertidas para JSON
      return Promise.all(responses.map(response => response.json()));
    })
    .then(data => {
      // Define os dados para cada estado
      setSkills(data[0]);
      setLanguages(data[1]);
      setExperiences(data[2]);
      setEducation(data[3]);
      setAllCertificates(data[4]);
      
      // Desativa os estados de loading
      setLoadingSkills(false);
      setLoadingLanguages(false);
      setLoadingExperiences(false);
      setLoadingEducation(false);
      setLoadingCertificates(false);
    })
    .catch(error => {
      console.error('Erro ao carregar dados:', error);
      
      // Para cada endpoint, realizar solicitações individuais para identificar quais falharam
      fetchData<Skill[]>(
        `${API_URL}/skills`, 
        setSkills, 
        "habilidades", 
        setLoadingSkills, 
        setErrorSkills
      );
      
      fetchData<{name: string, level: string}[]>(
        `${API_URL}/languages`, 
        setLanguages, 
        "idiomas", 
        setLoadingLanguages, 
        setErrorLanguages
      );
      
      fetchData<Experience[]>(
        `${API_URL}/experiences`, 
        setExperiences, 
        "experiências", 
        setLoadingExperiences, 
        setErrorExperiences
      );
      
      fetchData<{title: string, institution: string, period: string}[]>(
        `${API_URL}/education`, 
        setEducation, 
        "formação acadêmica", 
        setLoadingEducation, 
        setErrorEducation
      );
      
      fetchData<Certificate[]>(
        `${API_URL}/certificates`, 
        setAllCertificates, 
        "certificados", 
        setLoadingCertificates, 
        setErrorCertificates
      );
    });
  }, []);

  const categories = React.useMemo(() => {
    if (!Array.isArray(skills) || skills.length === 0) {
      return [];
    }
    return Array.from(new Set(skills.map((skill) => skill.category)));
  }, [skills]);

  const certCategories = React.useMemo(() => {
    if (!Array.isArray(allCertificates) || allCertificates.length === 0) {
      return [];
    }
    return Array.from(new Set(allCertificates.map((cert: Certificate) => cert.category)));
  }, [allCertificates]);

  const sortedCertificates = React.useMemo(() => {
    if (!Array.isArray(allCertificates) || allCertificates.length === 0) {
      return [];
    }
    
    let sorted = [...allCertificates];
    
    // Filtro por categoria
    if (certCategory !== 'all') {
      sorted = sorted.filter(cert => cert.category === certCategory);
    }
    
    // Filtro por busca
    if (searchTerm) {
      sorted = sorted.filter(cert => 
        cert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Ordenação
    switch (certFilter) {
      case 'az':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'za':
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
    }

    return sorted;
  }, [certFilter, searchTerm, certCategory, allCertificates]);

  const certificatesToShow = sortedCertificates;

  const filteredSkillsToShow = React.useMemo(() => {
    // Verificação adicional para garantir que skills é um array
    if (!Array.isArray(skills) || skills.length === 0) {
      return [];
    }
    
    return selectedCategory === 'all' 
      ? skills 
      : skills.filter((skill) => skill.category === selectedCategory);
  }, [selectedCategory, skills]);

  const experiencesToShow = experiences;
  const educationToShow = education;

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        overflow: 'hidden',
        px: { xs: 2, md: 3 }
      }}
    >
      <Box 
        sx={{ 
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '0',
            right: '0',
            width: '100%',
            height: '100%',
            background: `radial-gradient(circle at 50% 0%, ${theme.palette.primary.main}15 0%, transparent 50%)`,
            zIndex: -1,
          }
        }}
      >
        {/* Introdução com efeito de typing */}
        <Box sx={{ mb: 6, textAlign: 'center', maxWidth: '1000px', mx: 'auto' }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '80px',
                height: '3px',
                bottom: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                borderRadius: '2px',
              }
            }}
          >
            Sobre Mim
          </Typography>
        </Box>

        {/* Bio em cards modernos */}
        <Grid container spacing={3} sx={{ mb: 8, maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <Terminal color="primary" sx={{ fontSize: '1.75rem' }} />
                <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  Background Técnico
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}>
                Sou um entusiasta da tecnologia que combina paixão por desenvolvimento com visão estratégica. Como Gerente de Desenvolvimento, lidero equipes técnicas em projetos complexos, mantendo-me ativamente envolvido na programação. Especializado em PHP, Laravel, TypeScript e Node.js, busco constantemente inovação e excelência técnica. Minha abordagem única une expertise em desenvolvimento, gestão ágil e implementação de soluções escaláveis, sempre com foco em entregar valor real aos projetos.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                bgcolor: 'background.paper',
                borderRadius: 3,
                position: 'relative',
                overflow: 'hidden',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-3px)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '3px',
                  background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
                }
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}>
                <School color="primary" sx={{ fontSize: '1.75rem' }} />
                <Typography variant="h5" fontWeight="bold" sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
                  Formação
                </Typography>
              </Box>
              <Typography sx={{ fontSize: '1rem', lineHeight: 1.7, color: 'text.secondary' }}>
                Minha formação inclui uma graduação em Gestão de TI, um MBA em Gestão de Projetos e uma Pós-graduação em
                Inteligência Artificial aplicada aos negócios. Essa combinação de conhecimentos me permite alinhar demandas
                técnicas com estratégias de negócios.
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Skills com categorias e níveis */}
        <Box sx={{ mb: 8, maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 3,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
            }}
          >
            <Code color="primary" sx={{ fontSize: '1.75rem' }} /> Habilidades Técnicas
          </Typography>

          {/* Filtro de categorias */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            <Chip
              label="Todas"
              onClick={() => setSelectedCategory('all')}
              sx={{
                bgcolor: selectedCategory === 'all' ? 'primary.main' : 'background.paper',
                color: selectedCategory === 'all' ? 'white' : 'text.primary',
                '&:hover': {
                  bgcolor: selectedCategory === 'all' ? 'primary.dark' : 'background.default',
                },
              }}
            />
            {categories.map((category: string) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                sx={{
                  bgcolor: selectedCategory === category ? 'primary.main' : 'background.paper',
                  color: selectedCategory === category ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: selectedCategory === category ? 'primary.dark' : 'background.default',
                  },
                }}
              />
            ))}
          </Box>

          <Grid container spacing={2}>
            {loadingSkills ? (
              <SkillsSkeleton />
            ) : errorSkills ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4, 
                  color: 'error.main',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography>{errorSkills}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {
                      setLoadingSkills(true);
                      setErrorSkills(null);
                      fetchData<Skill[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/skills`, 
                        setSkills, 
                        "habilidades", 
                        setLoadingSkills, 
                        setErrorSkills
                      );
                    }}
                  >
                    Tentar novamente
                  </Button>
                </Box>
              </Grid>
            ) : Array.isArray(filteredSkillsToShow) && filteredSkillsToShow.length > 0 ? (
              filteredSkillsToShow.map((skill) => (
              <Grid item xs={12} sm={6} md={4} key={skill.name}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 0 15px ${theme.palette.primary.main}15`,
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="h6">{skill.name}</Typography>
                    <Chip
                      label={skill.level}
                      size="small"
                      icon={<Star sx={{ fontSize: '1rem' }} />}
                      sx={{
                        bgcolor: skill.level === 'Avançado' ? 'primary.main' : 'secondary.main',
                        color: 'white',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    {skill.category}
                  </Typography>
                </Paper>
              </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhuma habilidade encontrada
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Timeline de Experiência */}
        <Box sx={{ mb: 8, maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
            }}
          >
            <Work color="primary" sx={{ fontSize: '1.75rem' }} /> Experiência Profissional
          </Typography>
          <Box sx={{ px: { xs: 2, md: 4 } }}>
            {loadingExperiences ? (
              <TimelineSkeleton />
            ) : errorExperiences ? (
              <Box sx={{ 
                textAlign: 'center', 
                py: 4, 
                color: 'error.main',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2
              }}>
                <Typography>{errorExperiences}</Typography>
                <Button 
                  variant="outlined" 
                  color="primary" 
                  onClick={() => {
                    setLoadingExperiences(true);
                    setErrorExperiences(null);
                    fetchData<Experience[]>(
                      `${process.env.NEXT_PUBLIC_API_URL}/experiences`, 
                      setExperiences, 
                      "experiências", 
                      setLoadingExperiences, 
                      setErrorExperiences
                    );
                  }}
                >
                  Tentar novamente
                </Button>
              </Box>
            ) : experiencesToShow.length > 0 ? (
              experiencesToShow.map((exp, index) => (
                <TimelineItem
                  key={index}
                  experience={exp}
                  index={index}
                  total={experiences.length}
                />
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography color="text.secondary">
                  Nenhuma experiência encontrada
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Educação em Grid Moderna */}
        <Box sx={{ mb: 8, maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
            }}
          >
            <School color="primary" sx={{ fontSize: '1.75rem' }} /> Formação Acadêmica
          </Typography>
          <Grid container spacing={3}>
            {loadingEducation ? (
              <EducationSkeleton />
            ) : errorEducation ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4, 
                  color: 'error.main',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography>{errorEducation}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {
                      setLoadingEducation(true);
                      setErrorEducation(null);
                      fetchData<{title: string, institution: string, period: string}[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/education`, 
                        setEducation, 
                        "formação acadêmica", 
                        setLoadingEducation, 
                        setErrorEducation
                      );
                    }}
                  >
                    Tentar novamente
                  </Button>
                </Box>
              </Grid>
            ) : educationToShow.length > 0 ? (
              educationToShow.map((edu, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      height: '100%',
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                      },
                      position: 'relative',
                      overflow: 'hidden',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '4px',
                        height: '100%',
                        background: `linear-gradient(to bottom, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                      }
                    }}
                  >
                    <Typography variant="h5" gutterBottom color="primary" fontWeight="bold" sx={{ ml: 2 }}>
                      {edu.title}
                    </Typography>
                    <Typography color="text.secondary" sx={{ ml: 2 }}>
                      {edu.institution}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ ml: 2 }}>
                      {edu.period}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhuma formação acadêmica encontrada
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* Certificados e Especializações */}
        <Box sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
            }}
          >
            <EmojiEvents color="primary" sx={{ fontSize: '1.75rem' }} /> Certificados
          </Typography>

          {/* Filtros */}
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: 2, 
              justifyContent: 'center',
              alignItems: 'center',
              mb: 3
            }}>
              <TextField
                size="small"
                placeholder="Buscar certificados..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ minWidth: 250 }}
              />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant={certFilter === 'az' ? 'contained' : 'outlined'}
                  onClick={() => setCertFilter('az')}
                  startIcon={<Sort />}
                  size="small"
                >
                  A-Z
                </Button>
                <Button
                  variant={certFilter === 'za' ? 'contained' : 'outlined'}
                  onClick={() => setCertFilter('za')}
                  startIcon={<Sort sx={{ transform: 'rotate(180deg)' }} />}
                  size="small"
                >
                  Z-A
                </Button>
                <Button
                  variant={certFilter === 'newest' ? 'contained' : 'outlined'}
                  onClick={() => setCertFilter('newest')}
                  startIcon={<CalendarToday />}
                  size="small"
                >
                  Mais recentes
                </Button>
                <Button
                  variant={certFilter === 'oldest' ? 'contained' : 'outlined'}
                  onClick={() => setCertFilter('oldest')}
                  startIcon={<CalendarToday sx={{ transform: 'rotate(180deg)' }} />}
                  size="small"
                >
                  Mais antigos
                </Button>
              </Box>
            </Box>

            {/* Filtro por categoria */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 1 }}>
              <Chip
                label="Todas"
                onClick={() => setCertCategory('all')}
                sx={{
                  bgcolor: certCategory === 'all' ? 'primary.main' : 'background.paper',
                  color: certCategory === 'all' ? 'white' : 'text.primary',
                  '&:hover': {
                    bgcolor: certCategory === 'all' ? 'primary.dark' : 'background.default',
                  },
                }}
              />
              {certCategories.map((category) => (
                <Chip
                  key={category}
                  label={category}
                  onClick={() => setCertCategory(category)}
                  sx={{
                    bgcolor: certCategory === category ? 'primary.main' : 'background.paper',
                    color: certCategory === category ? 'white' : 'text.primary',
                    '&:hover': {
                      bgcolor: certCategory === category ? 'primary.dark' : 'background.default',
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Grid de certificados */}
          <Grid container spacing={3}>
            {loadingCertificates ? (
              <CertificatesSkeleton />
            ) : errorCertificates ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4, 
                  color: 'error.main',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography>{errorCertificates}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {
                      setLoadingCertificates(true);
                      setErrorCertificates(null);
                      fetchData<Certificate[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/certificates`, 
                        setAllCertificates, 
                        "certificados", 
                        setLoadingCertificates, 
                        setErrorCertificates
                      );
                    }}
                  >
                    Tentar novamente
                  </Button>
                </Box>
              </Grid>
            ) : certificatesToShow.length > 0 ? (
              certificatesToShow.map((cert: Certificate, index: number) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: '100%',
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      '&:hover': {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 0 15px ${theme.palette.primary.main}15`,
                      }
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: 'text.secondary',
                          display: 'block',
                          mb: 1
                        }}
                      >
                        Data de finalização: {new Date(cert.date).toLocaleDateString('pt-BR')}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: '1rem',
                          fontWeight: 'bold',
                          mb: 1,
                          minHeight: 48,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}
                      >
                        {cert.name}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={cert.category}
                        size="small"
                        sx={{
                          bgcolor: 'primary.main',
                          color: 'white',
                        }}
                      />
                      <IconButton
                        component="a"
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          color: 'primary.main',
                          '&:hover': {
                            color: 'primary.dark',
                          }
                        }}
                      >
                        <LinkIcon />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 4, width: '100%' }}>
                <Typography color="text.secondary">
                  Nenhum certificado encontrado com os filtros atuais.
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>

        {/* Idiomas com Visual Moderno */}
        <Box sx={{ maxWidth: '1000px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 6,
              textAlign: 'center',
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1.5
            }}
          >
            <Language color="primary" sx={{ fontSize: '1.75rem' }} /> Idiomas
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            {loadingLanguages ? (
              <LanguagesSkeleton />
            ) : errorLanguages ? (
              <Grid item xs={12}>
                <Box sx={{ 
                  textAlign: 'center', 
                  py: 4, 
                  color: 'error.main',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Typography>{errorLanguages}</Typography>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    onClick={() => {
                      setLoadingLanguages(true);
                      setErrorLanguages(null);
                      fetchData<{name: string, level: string}[]>(
                        `${process.env.NEXT_PUBLIC_API_URL}/languages`, 
                        setLanguages, 
                        "idiomas", 
                        setLoadingLanguages, 
                        setErrorLanguages
                      );
                    }}
                  >
                    Tentar novamente
                  </Button>
                </Box>
              </Grid>
            ) : languages.length > 0 ? (
              languages.map((lang, index) => (
                <Grid item xs={12} sm={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      textAlign: 'center',
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 0 20px ${theme.palette.primary.main}20`,
                      },
                    }}
                  >
                    <Typography
                      variant="h5"
                      gutterBottom
                      sx={{
                        fontWeight: 'bold',
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        color: 'transparent',
                      }}
                    >
                      {lang.name}
                    </Typography>
                    <Typography color="text.secondary" variant="subtitle1">
                      {lang.level}
                    </Typography>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Typography color="text.secondary">
                    Nenhum idioma encontrado
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Box>
      <ChatBot />
    </Container>
  );
} 