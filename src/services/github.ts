interface GitHubApiRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  languages_url: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  fork: boolean;
  archived: boolean;
  disabled: boolean;
}

export async function getGithubRepositories(): Promise<Repository[]> {
  try {
    // Iniciando busca de repositórios
    // Token presente: true/false
    
    // Construir a URL de busca
    const baseUrl = 'https://api.github.com/users/samuelcamargo/repos';
    const params = new URLSearchParams({
      sort: 'updated',
      per_page: '100',
      type: 'owner'
    });
    
    const url = `${baseUrl}?${params.toString()}`;
    
    // Fazendo requisição para: url
    
    const headers: HeadersInit = {
      'Accept': 'application/vnd.github.v3+json'
    };
    
    if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    // Resposta recebida: status e ok
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with status ${response.status}`);
    }
    
    const data = await response.json() as GitHubApiRepo[];
    
    // Filtrando repositórios
    const repos = data.filter((repo) => {
      if (repo.fork) return false;
      if (repo.archived) return false;
      if (repo.disabled) return false;
      if (repo.name.includes('test') || repo.name.includes('example')) return false;
      return true;
    });
    
    // Encontrados X repositórios
    
    // Processando cada repositório
    const processedRepos = await Promise.all(
      repos.map(async (repo) => {
        // Processando repositório: nome
        
        const languages = await getRepositoryLanguages(repo.languages_url);
        
        return {
          id: repo.id,
          name: repo.name,
          description: repo.description || 'Sem descrição disponível',
          url: repo.html_url,
          homepage: repo.homepage,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          languages,
          lastUpdated: repo.updated_at,
          topics: repo.topics || [],
          owner: {
            login: repo.owner.login,
            avatar: repo.owner.avatar_url,
            url: repo.owner.html_url
          }
        };
      })
    );
    
    // Busca finalizada com sucesso
    
    return processedRepos;
  } catch (error) {
    throw new Error(`Failed to fetch repositories: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// Função para obter linguagens do repositório
async function getRepositoryLanguages(languagesUrl: string): Promise<Record<string, number>> {
  const headers: HeadersInit = {
    'Accept': 'application/vnd.github.v3+json'
  };
  
  if (process.env.NEXT_PUBLIC_GITHUB_TOKEN) {
    headers['Authorization'] = `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`;
  }
  
  try {
    const response = await fetch(languagesUrl, { headers });
    
    if (!response.ok) {
      return {};
    }
    
    return await response.json();
  } catch (error) {
    return {};
  }
} 