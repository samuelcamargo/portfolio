import { Experience } from './about';

export interface TimelineItemProps {
  experience: Experience;
  index: number;
  total: number;
}

export interface SkillCardProps {
  name: string;
  level: string;
  category: string;
}

export interface CertificateCardProps {
  name: string;
  platform: string;
  date: string;
  url: string;
  category: string;
}

export interface SectionProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export interface FilterProps {
  selectedCategory: string;
  onCategoryChange: (_category: string) => void;
  categories: string[];
}

export interface SearchProps {
  value: string;
  onChange: (_value: string) => void;
  placeholder?: string;
}

export interface SortProps {
  value: 'az' | 'za' | 'newest' | 'oldest';
  onChange: (_value: 'az' | 'za' | 'newest' | 'oldest') => void;
} 