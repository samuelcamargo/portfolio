// Interfaces base
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para projetos
export interface Project extends BaseEntity {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

// Tipos para contato
export interface ContactForm {
  name: string;
  email: string;
  message: string;
}

// Tipos para habilidades
export interface Skill {
  name: string;
  level: 'Básico' | 'Intermediário' | 'Avançado' | 'Especialista';
  category: 'Frontend' | 'Backend' | 'DevOps' | 'Outros';
} 