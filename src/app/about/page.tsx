'use client';
import * as React from 'react';
import { Container, Typography, Box, Paper, Grid, Chip, useTheme, TextField, Button, IconButton } from '@mui/material';
import { School, Work, Code, Language, Terminal, Star, EmojiEvents, Sort, CalendarToday, Link as LinkIcon } from '@mui/icons-material';
import ChatBot from '@/presentation/components/ChatBot/ChatBot';

const skills = [
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

const languages = [
  { name: 'Português', level: 'Nativo' },
  { name: 'Inglês', level: 'Profissional' },
  { name: 'Inglês Técnico', level: 'Profissional' }
];

const education = [
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

const experiences = [
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
  },
  {
    role: 'PHP Developer',
    company: 'Gmaxcorp',
    period: 'agosto de 2014 - julho de 2020',
    description: 'Desenvolvimento de websites e e-commerce, desenvolvimento de aplicações, design de sistemas, implantação, documentação e levantamento de requisitos.'
  },
  {
    role: 'Program Developer',
    company: 'Foursys',
    period: 'janeiro de 2013 - dezembro de 2013',
    description: 'Manutenção de sistemas legados do Banco Bradesco em VisualBasic, desenvolvimento de sistemas com Crystal Report.'
  },
  {
    role: 'Systems Analyst',
    company: 'Top Website',
    period: 'maio de 2012 - outubro de 2012',
    description: 'Análise e desenvolvimento de sistemas para internet, planejamento e implementação de soluções web.'
  },
  {
    role: 'Front End Developer',
    company: 'Habilis BR',
    period: 'janeiro de 2011 - maio de 2012',
    description: 'Desenvolvimento front-end com foco em CSS/CSS3, JavaScript, jQuery e integração com APIs.'
  },
  {
    role: 'Analista de Planejamento',
    company: 'Teltelematica',
    period: 'janeiro de 2010 - dezembro de 2010',
    description: 'Liderança de departamento com 800 funcionários de telecomunicações, elaboração e apresentação de relatórios, análise de desempenho.'
  }
];

interface Certificate {
  name: string;
  platform: string;
  date: string;
  url: string;
  category: string;
}

const allCertificates: Certificate[] = [
  {
    name: 'Node.js: criptografia e tokens JWT',
    platform: 'Alura',
    date: '2025-03-08',
    url: 'https://cursos.alura.com.br/certificate/db2a6a62-fe9d-4d48-b067-1273b1cfb819?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Six Sigma White Belt',
    platform: 'Six Sigma',
    date: '2025-02-22',
    url: 'https://dashboard.educate360.com/certification/eyJpdiI6IlpnbHlRTFNEQW9HOGdXK3FvMGc2dFE9PSIsInZhbHVlIjoiOXlRZ1RldTdMeTJpMkhCeGJBaU9Vdz09IiwibWFjIjoiM2JmMmY0ZjUxNGNjMzU2ZmI1ZjU1NDdhM2JiMjQ1ZDk1ZTBiYTk3NDY5NWNjNDc3YjMxMGQ3ODljMWFlNzQwMiIsInRhZyI6IiJ9',
    category: 'Agile'
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified AI Foundations Associate',
    platform: 'Oracle',
    date: '2025-02-21',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=40FDA11B0CAFCF5AA29FF0D6430DE8170FB4705701EE1D2B1A81C8A970273DF4',
    category: 'Backend'
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Certified Foundations Associate',
    platform: 'Oracle',
    date: '2025-02-21',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=0598FCF399E6C908387297D4A5710F0AEA1D9EE832E0D8FEB8B1C5FD714E8EDD',
    category: 'Backend'
  },
  {
    name: 'Oracle Cloud Infrastructure 2024 Data Certified Foundations Associate',
    platform: 'Oracle',
    date: '2025-02-21',
    url: 'https://catalog-education.oracle.com/pls/certview/sharebadge?id=0598FCF399E6C908387297D4A5710F0A273706A1D38AF6EC5F8DE7F6FDDD84AA',
    category: 'Backend'
  },
  {
    name: 'Node.js: implementando testes em uma API Rest',
    platform: 'Alura',
    date: '2025-01-29',
    url: 'https://cursos.alura.com.br/certificate/6a72f8f5-5287-4458-8283-2b71eda08002?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Node.js: testes unitários e de integração',
    platform: 'Alura',
    date: '2025-01-25',
    url: 'https://cursos.alura.com.br/certificate/50ddccd6-b228-413a-9b00-b79bc36282b0?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Next.js: autenticação e gerenciamento de Tokens',
    platform: 'Alura',
    date: '2025-01-22',
    url: 'https://cursos.alura.com.br/certificate/ea3c0e14-ec49-41dc-a0d1-b264f864d120?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'Next.js: tour pelo Next.js',
    platform: 'Alura',
    date: '2025-01-22',
    url: 'https://cursos.alura.com.br/certificate/530ea428-5112-4696-b1f7-c42062367986?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'Next.js: explorando o framework',
    platform: 'Alura',
    date: '2025-01-18',
    url: 'https://cursos.alura.com.br/certificate/bc033d6e-6f3c-4d47-8987-94f687527ad3?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'Padrões de projeto com TypeScript: aprimorando uma API com arquitetura limpa',
    platform: 'Alura',
    date: '2024-11-11',
    url: 'https://cursos.alura.com.br/certificate/34143cbb-b6b7-475f-9605-4c790bc9ba49?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Nest.js: adicionando funcionalidades com Redis, JWT e logging',
    platform: 'Alura',
    date: '2024-10-11',
    url: 'https://cursos.alura.com.br/certificate/041a72ec-e32d-4faf-98b3-ad0426800013?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Nest.js: lidando com migrações, relacionamentos ORM e erros em uma API',
    platform: 'Alura',
    date: '2024-10-10',
    url: 'https://cursos.alura.com.br/certificate/116a5129-2ab0-4ecb-8c35-1a0ba4b1eb48?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Nest.js: Persistindo dados com TypeORM e PostgreSQL',
    platform: 'Alura',
    date: '2024-10-10',
    url: 'https://cursos.alura.com.br/certificate/92d8b45c-a0d1-455d-9c09-b3fcc722344d?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Nest.js: criando uma API Restful',
    platform: 'Alura',
    date: '2024-09-11',
    url: 'https://cursos.alura.com.br/certificate/5c937510-f9d1-4389-bb3b-da67c0105db3?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'TypeScript: desenvolvendo validações e tratando erros',
    platform: 'Alura',
    date: '2024-09-11',
    url: 'https://cursos.alura.com.br/certificate/73554b5f-aea8-404f-ad49-8426cd43efb0?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'Node.js: lidando com buscas, filtros, paginação e erros em uma API',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/e52eb0f0-54d5-4810-b6b0-0b986d2607b2?lang=pt_BR',
    category: 'Backend'
  },
   {
    name: 'Typescript: construção de uma API com tipagem segura',
    platform: 'Alura',
    date: '2023-09-03',
    url: 'https://cursos.alura.com.br/certificate/3a2c9ffa-b0bf-4a91-ab44-0435492e3b39?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'ORM com Node.js: avançando nas funcionalidades do Sequelize',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/39e16648-b0a3-460a-98c9-5c401edfe5a9?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'WebSockets: implemente autenticação e avance no Socket.IO',
    platform: 'Alura',
    date: '2024-10-31',
    url: 'https://cursos.alura.com.br/certificate/49a392b7-e5a2-4261-bd90-6ee6497c1322?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'WebSockets: implemente comunicações em tempo real com Socket.IO e MongoDB',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/e52eb0f0-54d5-4810-b6b0-0b986d2607b2?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'ORM com Node.js: desenvolvendo uma API com Sequelize e SQLite',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/71ba6f06-5554-4e69-9801-5849c33d58f1?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Node.js: criando uma API Rest com Express e MongoDB',
    platform: 'Alura',
    date: '2024-10-29',
    url: 'https://cursos.alura.com.br/certificate/eb32147d-8653-4ca0-bdd6-2b170c6170d0?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'HTTP: entendendo a web por baixo dos panos',
    platform: 'Alura',
    date: '2024-10-28',
    url: 'https://cursos.alura.com.br/certificate/7c176f1e-4531-4bc9-99c7-b6f29233ff60?lang=pt_BR',
    category: 'Web'
  },
  {
    name: 'JavaScript: programação Orientada a Objetos',
    platform: 'Alura',
    date: '2024-11-02',
    url: 'https://cursos.alura.com.br/certificate/44ace3da-cac9-403a-8915-9761be87a750?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'ORM com Node.js: desenvolvendo uma API com Sequelize e SQLite',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/7c176f1e-4531-4bc9-99c7-b6f29233ff60?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'WebSockets: implemente comunicações em tempo real com Socket.IO e MongoDB',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/118a5499-d8dc-472f-b3c5-1c5663e3b3e1?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Node.js: criando uma API Rest com Express e MongoDB',
    platform: 'Alura',
    date: '2024-10-29',
    url: 'https://cursos.alura.com.br/certificate/a396ee4d-4cde-4bf8-a04e-229c39973c9c?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'HTTP: entendendo a web por baixo dos panos',
    platform: 'Alura',
    date: '2024-10-28',
    url: 'https://cursos.alura.com.br/certificate/6fa67d25-0812-4b33-bbd5-de8dc85289bf?lang=pt_BR',
    category: 'Web'
  },
  {
    name: 'ORM com Node.js: API com Sequelize e MySQL',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/fce403a1-33f4-4640-8183-0e53efbe3ca7?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Node.js e JWT: autenticação com tokens',
    platform: 'Alura',
    date: '2024-10-30',
    url: 'https://cursos.alura.com.br/certificate/193eab79-1532-4ade-97fe-0576c7372de6?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Ansible: implementando sua Infraestrutura como código',
    platform: 'Alura',
    date: '2024-10-27',
    url: 'https://cursos.alura.com.br/certificate/0cf6c04d-b547-41a3-bd56-0a56f6f4e5b6?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Integração Contínua: Pipeline Docker no Github Actions',
    platform: 'Alura',
    date: '2024-10-27',
    url: 'https://cursos.alura.com.br/certificate/a396ee4d-4cde-4bf8-a04e-229c39973c9c?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Integração Contínua: testes automatizados e pipeline no Github Actions',
    platform: 'Alura',
    date: '2024-10-27',
    url: 'https://cursos.alura.com.br/certificate/6fa67d25-0812-4b33-bbd5-de8dc85289bf?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Monitoramento: Prometheus, Grafana e Alertmanager',
    platform: 'Alura',
    date: '2024-10-27',
    url: 'https://cursos.alura.com.br/certificate/fce403a1-33f4-4640-8183-0e53efbe3ca7?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Observabilidade: coletando métricas de uma aplicação com Prometheus',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/193eab79-1532-4ade-97fe-0576c7372de6?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'DevOps: construindo e gerindo containers com o Docker',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/50cc2742-dec1-490b-aed5-8d600f88dfd2?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'DevOps: explorando conceitos, comandos e scripts no Linux CLI',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/19dd44ff-48f5-44ed-93f6-a825e8742aec?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'DevOps: trabalhando com repositórios no GitHub',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/9c0527cf-1cac-49b3-a982-1176f04641cb?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'DevOps: trabalhando com tráfego seguro em comunicações web',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/ae85240e-2fd6-4b87-aa5c-ba78f1b06e4b?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Infraestrutura como código: preparando máquinas na AWS com Ansible e Terraform',
    platform: 'Alura',
    date: '2024-10-26',
    url: 'https://cursos.alura.com.br/certificate/71aeaa0f-e1d7-4ab7-9b20-e6a9ed9b5fb6?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'Laravel: construindo APIs',
    platform: 'Alura',
    date: '2024-10-25',
    url: 'https://cursos.alura.com.br/certificate/6cc3a962-7bf1-4ea9-940d-a5752f66e222?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Laravel: e-mails, eventos assíncronos, uploads e testes',
    platform: 'Alura',
    date: '2024-10-25',
    url: 'https://cursos.alura.com.br/certificate/24ea5802-7b48-43a7-9bae-f3ca2ba673ef?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Laravel: transações, service container e autenticação',
    platform: 'Alura',
    date: '2024-10-24',
    url: 'https://cursos.alura.com.br/certificate/cfaad14e-2304-463f-8df2-a34b410f0b1b?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Laravel: criando uma aplicação com MVC',
    platform: 'Alura',
    date: '2024-10-10',
    url: 'https://cursos.alura.com.br/certificate/52b4744b-103e-448e-b3bb-704e92f856c8?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Laravel: validando formulários, usando sessões e definindo relacionamentos',
    platform: 'Alura',
    date: '2024-10-10',
    url: 'https://cursos.alura.com.br/certificate/5d22fd75-9122-4b8a-893b-740aaf91d525?lang=pt_BR',
    category: 'Backend'
  },
  {
    name: 'Docker: criando e gerenciando containers',
    platform: 'Alura',
    date: '2024-10-05',
    url: 'https://cursos.alura.com.br/certificate/fe9126ad-c9fd-4596-b51d-a7d2a34c4ff6?lang=pt_BR',
    category: 'DevOps'
  },
  {
    name: 'TypeScript Part 1: Evolving Your JavaScript',
    platform: 'Alura',
    date: '2024-10-05',
    url: 'https://cursos.alura.com.br/certificate/554bd9ef-b4c3-4f12-b8ec-b04bce47f594?lang=pt_BR',
    category: 'Frontend'
  },
  {
    name: 'Produtividade: otimizando sua rotina com inteligência artificial',
    platform: 'Alura',
    date: '2024-10-01',
    url: 'https://cursos.alura.com.br/certificate/3bc818a1-4778-401a-ae62-362f9e4a8cb4?lang=pt_BR',
    category: 'Soft Skills'
  },
  {
    name: 'Equipes ágeis: organizando os papéis em uma equipe',
    platform: 'Alura',
    date: '2024-09-29',
    url: 'https://cursos.alura.com.br/certificate/69cc76df-d392-46a7-93a3-253a9a2e4a97?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Métricas Ágeis: como medir resultados em um Ambiente Ágil',
    platform: 'Alura',
    date: '2024-09-29',
    url: 'https://cursos.alura.com.br/certificate/59d6da43-176d-4360-ab01-d93052a67dad?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'LGPD: conhecendo a legislação para proteger dados pessoais',
    platform: 'Alura',
    date: '2024-08-28',
    url: 'https://cursos.alura.com.br/certificate/3789d552-b6f3-4e51-83b8-ca386847678c?lang=pt_BR',
    category: 'Compliance'
  },
  {
    name: 'OKR: construindo metas ágeis',
    platform: 'Alura',
    date: '2024-08-21',
    url: 'https://cursos.alura.com.br/certificate/6485ddfd-3cc6-4a73-8d26-94ed27d83eb7?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Ferramentas para agilidade: visão geral sobre controle de projetos e produtos',
    platform: 'Alura',
    date: '2024-08-19',
    url: 'https://cursos.alura.com.br/certificate/e82e9d0d-8bc8-4866-a6e0-5fe2accf7a42?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Management 3.0: gerencie o ambiente, não as pessoas',
    platform: 'Alura',
    date: '2024-08-19',
    url: 'https://cursos.alura.com.br/certificate/e6c45cfb-bf3a-4a02-af79-f9ff02cfcf20?lang=pt_BR',
    category: 'Management'
  },
  {
    name: 'Kanban: análises para implementação',
    platform: 'Alura',
    date: '2024-08-02',
    url: 'https://cursos.alura.com.br/certificate/cc552f9c-8ac5-456a-b788-49fc1e8c2972?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Cultura e Métodos Ágeis: pilares para uma imersão avançada',
    platform: 'Alura',
    date: '2024-07-31',
    url: 'https://cursos.alura.com.br/certificate/90f0b953-e1b7-4e77-97d7-eff5224e68d8?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Scrum: agilidade em seu projeto',
    platform: 'Alura',
    date: '2024-07-31',
    url: 'https://cursos.alura.com.br/certificate/322e65a1-3e45-4877-816b-928562c5f893?lang=pt_BR',
    category: 'Agile'
  },
  {
    name: 'Liderança transformacional: criando uma cultura de excelência',
    platform: 'Alura',
    date: '2024-07-30',
    url: 'https://cursos.alura.com.br/certificate/a39d9917-edc7-4a6f-a3fc-536ccb56f2be?lang=pt_BR',
    category: 'Management'
  },
  {
    name: 'Team Building: técnicas e práticas para times ágeis',
    platform: 'Alura',
    date: '2024-07-28',
    url: 'https://cursos.alura.com.br/certificate/b83295f0-1a17-4f85-acfc-df81627677ae?lang=pt_BR',
    category: 'Management'
  },
  {
    name: 'Gestão Ágil: explorando conceitos da agilidade',
    platform: 'Alura',
    date: '2024-07-27',
    url: 'https://cursos.alura.com.br/certificate/10eda76c-13a5-43cc-80f0-58b92aca8e67?lang=pt_BR',
    category: 'Management'
  },
  {
    name: 'Gestão Ágil: Gestão de Processos para Agilidade',
    platform: 'Alura',
    date: '2024-07-27',
    url: 'https://cursos.alura.com.br/certificate/42d744c8-25dd-40fb-a6b3-c8ed7ee580a2?lang=pt_BR',
    category: 'Management'
  },
  {
    name: 'Product Management: agilize o desenvolvimento de produtos',
    platform: 'Alura',
    date: '2024-07-27',
    url: 'https://cursos.alura.com.br/certificate/c2f6f712-9004-494b-9d0b-b5a93fad639f?lang=pt_BR',
    category: 'Management'
  }
];

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
}

function TimelineItem({ experience, index, total }: TimelineItemProps) {
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
}

export default function AboutPage() {
  const theme = useTheme();
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');
  const [certFilter, setCertFilter] = React.useState<'az' | 'za' | 'newest' | 'oldest'>('newest');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [certCategory, setCertCategory] = React.useState<string>('all');
  const [visibleCertificates, setVisibleCertificates] = React.useState(12);
  const [visibleSkills, setVisibleSkills] = React.useState(9);
  const [visibleExperiences, setVisibleExperiences] = React.useState(3);
  const [visibleEducation, setVisibleEducation] = React.useState(2);
  
  const certificatesContainerRef = React.useRef<HTMLDivElement>(null);
  const skillsContainerRef = React.useRef<HTMLDivElement>(null);
  const experiencesContainerRef = React.useRef<HTMLDivElement>(null);
  const educationContainerRef = React.useRef<HTMLDivElement>(null);

  // Funções para carregar mais itens
  const loadMoreCertificates = React.useCallback(() => {
    setVisibleCertificates(prev => prev + 12);
  }, []);

  const loadMoreSkills = React.useCallback(() => {
    setVisibleSkills(prev => prev + 9);
  }, []);

  const loadMoreExperiences = React.useCallback(() => {
    setVisibleExperiences(prev => prev + 3);
  }, []);

  const loadMoreEducation = React.useCallback(() => {
    setVisibleEducation(prev => prev + 2);
  }, []);

  // Observer genérico para lazy loading
  const createObserver = React.useCallback((callback: () => void) => {
    return new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        callback();
      }
    }, {
      root: null,
      rootMargin: '20px',
      threshold: 0.1
    });
  }, []);

  // Setup dos observers
  React.useEffect(() => {
    const observers = [
      { ref: certificatesContainerRef, callback: loadMoreCertificates },
      { ref: skillsContainerRef, callback: loadMoreSkills },
      { ref: experiencesContainerRef, callback: loadMoreExperiences },
      { ref: educationContainerRef, callback: loadMoreEducation }
    ].map(({ ref, callback }) => {
      const observer = createObserver(callback);
      if (ref.current) {
        observer.observe(ref.current);
      }
      return { observer, ref };
    });

    return () => {
      observers.forEach(({ observer, ref }) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [createObserver, loadMoreCertificates, loadMoreSkills, loadMoreExperiences, loadMoreEducation]);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const certCategories = Array.from(new Set(allCertificates.map(cert => cert.category)));

  const sortedCertificates = React.useMemo(() => {
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
  }, [certFilter, searchTerm, certCategory]);

  // Slice dos certificados visíveis
  const visibleCertificatesList = sortedCertificates.slice(0, visibleCertificates);

  // Filtragem de skills com lazy loading
  const visibleFilteredSkills = React.useMemo(() => {
    const filtered = selectedCategory === 'all' 
      ? skills 
      : skills.filter(skill => skill.category === selectedCategory);
    return filtered.slice(0, visibleSkills);
  }, [selectedCategory, visibleSkills]);

  // Experiências visíveis
  const visibleExperiencesList = experiences.slice(0, visibleExperiences);

  // Educação visível
  const visibleEducationList = education.slice(0, visibleEducation);

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
          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.75 }}>
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
            {categories.map((category) => (
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
            {visibleFilteredSkills.map((skill) => (
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
            ))}
          </Grid>
        </Box>

        {visibleSkills < filteredSkills.length && (
          <Box 
            ref={skillsContainerRef}
            sx={{ 
              textAlign: 'center', 
              py: 4,
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${theme.palette.primary.main}`,
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
            <Typography color="text.secondary">
              Carregando mais habilidades...
            </Typography>
          </Box>
        )}

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
            {visibleExperiencesList.map((exp, index) => (
              <TimelineItem
                key={index}
                experience={exp}
                index={index}
                total={visibleExperiencesList.length}
              />
            ))}
          </Box>
        </Box>

        {visibleExperiences < experiences.length && (
          <Box 
            ref={experiencesContainerRef}
            sx={{ 
              textAlign: 'center', 
              py: 4,
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${theme.palette.primary.main}`,
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }}
            />
            <Typography color="text.secondary">
              Carregando mais experiências...
            </Typography>
          </Box>
        )}

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
            {visibleEducationList.map((edu, index) => (
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
            ))}
          </Grid>
        </Box>

        {visibleEducation < education.length && (
          <Box 
            ref={educationContainerRef}
            sx={{ 
              textAlign: 'center', 
              py: 4,
              opacity: 0.7,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 2
            }}
          >
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                border: `2px solid ${theme.palette.primary.main}`,
                borderTopColor: 'transparent',
                animation: 'spin 1s linear infinite',
              }}
            />
            <Typography color="text.secondary">
              Carregando mais formações...
            </Typography>
          </Box>
        )}

        {/* Certificados e Especializações */}
        <Box sx={{ mb: 8, maxWidth: '1200px', mx: 'auto', px: { xs: 2, md: 3 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 4,
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

          {/* Lista de Certificados */}
          <Grid container spacing={2}>
            {visibleCertificatesList.map((cert, index) => (
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
            ))}
          </Grid>

          {/* Loading indicator */}
          {visibleCertificates < sortedCertificates.length && (
            <Box 
              ref={certificatesContainerRef}
              sx={{ 
                textAlign: 'center', 
                py: 4,
                opacity: 0.7,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${theme.palette.primary.main}`,
                  borderTopColor: 'transparent',
                  animation: 'spin 1s linear infinite',
                  '@keyframes spin': {
                    '0%': {
                      transform: 'rotate(0deg)',
                    },
                    '100%': {
                      transform: 'rotate(360deg)',
                    },
                  },
                }}
              />
              <Typography color="text.secondary">
                Carregando mais certificados...
              </Typography>
            </Box>
          )}

          {sortedCertificates.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography color="text.secondary">
                Nenhum certificado encontrado com os filtros atuais.
              </Typography>
            </Box>
          )}
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
            {languages.map((lang, index) => (
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
            ))}
          </Grid>
        </Box>
      </Box>
      <ChatBot />
    </Container>
  );
} 