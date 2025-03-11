// Definições de tipos globais para o projeto

// Definição para GitHub Repository e projetos
interface Repository {
  id: number;
  name: string;
  description: string;
  url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  languages: Record<string, number>;
  lastUpdated: string;
  topics: string[];
  owner: {
    login: string;
    avatar: string;
    url: string;
  };
} 