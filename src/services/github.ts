interface GithubRepository {
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  created_at: string;
  language: string;
  updated_at: string;
  default_branch: string;
}

interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo: string;
  updatedAt: string;
  lastCommit: {
    message: string;
    date: string;
  };
}

export async function getGithubRepositories(): Promise<ProjectData[]> {
  try {
    // Log inicial
    console.log('=== Iniciando busca de repositórios ===');
    
    // Configuração do fetch
    const url = 'https://api.github.com/users/samuelcamargo/repos';
    const options = {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`
      },
      cache: 'no-store' as RequestCache
    };

    console.log('Fazendo requisição para:', url);
    const response = await fetch(url, options);
    
    // Log do resultado da requisição
    console.log('Resposta recebida:', {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erro na API:', error);
      return [];
    }

    const repos = await response.json();
    console.log(`Encontrados ${repos.length} repositórios`);

    // Processamento dos repositórios
    const projects = await Promise.all(repos.map(async (repo: GithubRepository) => {
      console.log(`Processando repositório: ${repo.name}`);
      
      return {
        title: repo.name,
        description: repo.description || 'Descrição não disponível',
        tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
        github: repo.html_url,
        demo: repo.homepage || '',
        updatedAt: repo.updated_at,
        lastCommit: {
          message: 'Último commit',
          date: repo.updated_at
        }
      };
    }));

    // Ordenação e retorno
    const sortedProjects = projects.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    console.log('=== Busca finalizada com sucesso ===');
    return sortedProjects;

  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    return [];
  }
} 