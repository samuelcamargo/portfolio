import { Certificate, Skill, Experience } from './about';

// Tipos para eventos de filtro e ordenação
export type FilterChangeHandler = (_category: string) => void;
export type SortChangeHandler = (_direction: 'az' | 'za' | 'newest' | 'oldest') => void;
export type SearchChangeHandler = (_term: string) => void;

// Tipos para callbacks de carregamento
export type LoadMoreHandler = () => void;
export type LoadingStateHandler = (_isLoading: boolean) => void;
export type ErrorHandler = (_error: string | null) => void;

// Tipos para eventos de seleção
export type SelectSkillHandler = (_skill: Skill) => void;
export type SelectCertificateHandler = (_certificate: Certificate) => void;
export type SelectExperienceHandler = (_experience: Experience) => void;

// Tipos para eventos de formulário
export interface FormSubmitHandler<T> {
  (_data: T): Promise<void> | void;
}

// Tipos para eventos de UI
export interface UIEventHandlers {
  onThemeChange: (_theme: 'light' | 'dark') => void;
  onLanguageChange: (_lang: 'pt' | 'en') => void;
  onMenuToggle: () => void;
  onScroll: (_event: React.UIEvent<HTMLElement>) => void;
}

// Tipos para eventos de filtro combinados
export interface FilterEventHandlers {
  onFilterChange: FilterChangeHandler;
  onSortChange: SortChangeHandler;
  onSearchChange: SearchChangeHandler;
  onClear: () => void;
}

// Tipos para respostas de API
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// Tipos para eventos de interseção
export interface IntersectionCallback {
  (_entries: IntersectionObserverEntry[]): void;
}

// Tipos para eventos de animação
export interface AnimationEventHandlers {
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
  onTransitionEnd?: () => void;
} 