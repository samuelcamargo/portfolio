import { Certificate, Skill } from './about';

export interface AboutPageState {
  selectedCategory: string;
  certFilter: 'az' | 'za' | 'newest' | 'oldest';
  searchTerm: string;
  certCategory: string;
  visibleCertificates: number;
  visibleSkills: number;
  visibleExperiences: number;
  visibleEducation: number;
}

export interface FilterState {
  category: string;
  searchTerm: string;
  sortDirection: 'az' | 'za' | 'newest' | 'oldest';
}

export interface PaginationState {
  page: number;
  perPage: number;
  total: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// Estados específicos para cada seção
export interface SkillsSectionState {
  selectedSkills: Skill[];
  filteredSkills: Skill[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
}

export interface CertificatesSectionState {
  selectedCertificates: Certificate[];
  filteredCertificates: Certificate[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  sortOrder: 'az' | 'za' | 'newest' | 'oldest';
}

// Estado global da aplicação
export interface AppState {
  theme: 'light' | 'dark';
  language: 'pt' | 'en';
  isMenuOpen: boolean;
  isMobile: boolean;
  isLoading: boolean;
} 