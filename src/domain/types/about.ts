export interface Skill {
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Especialista';
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Database' | 'Arquitetura' | 'Gestão';
}

export interface Language {
  name: string;
  level: 'Nativo' | 'Profissional' | 'Intermediário' | 'Básico';
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Certificate {
  name: string;
  platform: string;
  date: string;
  url: string;
  category: string;
}

export interface ContactInfo {
  icon: React.ReactNode;
  label: string;
  value: string;
}

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  url: string;
} 