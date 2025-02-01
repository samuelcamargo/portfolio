import { Skill, Language, Education, Experience, Certificate } from '@/domain/types/about';
import { School, Work, Code, Language as LanguageIcon, Terminal, Star, EmojiEvents } from '@mui/icons-material';

export const skills: Skill[] = [
  // Backend
  { name: 'PHP', level: 'Avançado', category: 'Backend' },
  { name: 'Laravel', level: 'Avançado', category: 'Backend' },
  { name: 'Node.js', level: 'Avançado', category: 'Backend' },
  { name: 'Express.js', level: 'Avançado', category: 'Backend' },
  { name: 'Fastify', level: 'Intermediário', category: 'Backend' },
  { name: 'REST APIs', level: 'Avançado', category: 'Backend' },
  { name: 'GraphQL', level: 'Intermediário', category: 'Backend' },
  { name: 'Microservices', level: 'Avançado', category: 'Backend' },
  { name: 'WebSockets', level: 'Intermediário', category: 'Backend' },
  
  // Frontend
  { name: 'TypeScript', level: 'Avançado', category: 'Frontend' },
  { name: 'JavaScript', level: 'Avançado', category: 'Frontend' },
  { name: 'React', level: 'Avançado', category: 'Frontend' },
  { name: 'Next.js', level: 'Avançado', category: 'Frontend' },
  { name: 'Material UI', level: 'Avançado', category: 'Frontend' },
  { name: 'Tailwind CSS', level: 'Intermediário', category: 'Frontend' },
  { name: 'Redux', level: 'Avançado', category: 'Frontend' },
  { name: 'HTML5/CSS3', level: 'Avançado', category: 'Frontend' },
  
  // Database
  { name: 'MySQL', level: 'Avançado', category: 'Database' },
  { name: 'MongoDB', level: 'Intermediário', category: 'Database' },
  { name: 'PostgreSQL', level: 'Intermediário', category: 'Database' },
  { name: 'Redis', level: 'Intermediário', category: 'Database' },
  
  // DevOps
  { name: 'Docker', level: 'Avançado', category: 'DevOps' },
  { name: 'CI/CD', level: 'Avançado', category: 'DevOps' },
  { name: 'Git', level: 'Avançado', category: 'DevOps' },
  { name: 'AWS', level: 'Intermediário', category: 'DevOps' },
  { name: 'Linux', level: 'Avançado', category: 'DevOps' },
  { name: 'Jenkins', level: 'Intermediário', category: 'DevOps' },
  
  // Arquitetura
  { name: 'Clean Architecture', level: 'Avançado', category: 'Arquitetura' },
  { name: 'SOLID', level: 'Avançado', category: 'Arquitetura' },
  { name: 'Design Patterns', level: 'Avançado', category: 'Arquitetura' },
  { name: 'DDD', level: 'Avançado', category: 'Arquitetura' },
  { name: 'TDD', level: 'Avançado', category: 'Arquitetura' },
  { name: 'Event-Driven', level: 'Intermediário', category: 'Arquitetura' },
  
  // Gestão
  { name: 'Scrum', level: 'Avançado', category: 'Gestão' },
  { name: 'Kanban', level: 'Avançado', category: 'Gestão' },
  { name: 'Liderança', level: 'Avançado', category: 'Gestão' },
  { name: 'OKR', level: 'Intermediário', category: 'Gestão' },
  { name: 'Gestão de Times', level: 'Avançado', category: 'Gestão' }
];

export const languages: Language[] = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Profissional' },
  { name: 'Inglês Técnico', level: 'Profissional' }
];

export const education: Education[] = [
  {
    title: 'Pós-graduação em Inteligência Artificial Nos Negócios',
    institution: 'Universidade Anhembi Morumbi',
    period: '2024 - 2025'
  },
  {
    title: 'MBA em Gestão de Projetos',
    institution: 'Universidade Anhembi Morumbi',
    period: '2023 - 2024'
  },
  {
    title: 'Graduação em Gestão de TI',
    institution: 'Estácio',
    period: '2013 - 2016'
  },
  {
    title: 'Bacharel em Sistemas da Informação',
    institution: 'Universidade Bandeirante de São Paulo',
    period: '2009 - 2012'
  }
];

export const experiences: Experience[] = [
  {
    role: 'Gerente de TI',
    company: 'Campsoft',
    period: 'agosto de 2023 - Presente',
    description: 'Liderança de equipes técnicas, gestão de projetos com metodologias ágeis (Scrum), documentação estratégica e otimização de processos.'
  },
  {
    role: 'Líder Técnico',
    company: 'Campsoft',
    period: 'dezembro de 2020 - agosto de 2023',
    description: 'Gerenciamento de equipes de desenvolvimento, arquitetura de sistemas, implementação de soluções e revisão de código.'
  },
  {
    role: 'Programador Full Stack',
    company: 'Campsoft',
    period: 'julho de 2020 - dezembro de 2020',
    description: 'Desenvolvimento de aplicações back-end e front-end, utilizando PHP, JavaScript, e integração com APIs.'
  }
]; 