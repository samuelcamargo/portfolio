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
    const response = await fetch('https://api.github.com/users/samuelcampos/repos', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar repositórios');
    }

    const repositories: GithubRepository[] = await response.json();
    const projectsData = await Promise.all(
      repositories
        .filter(repo => !repo.name.includes('.github.io'))
        .map(async (repo) => {
          const commitsResponse = await fetch(
            `https://api.github.com/repos/samuelcampos/${repo.name}/commits/${repo.default_branch}`,
            {
              headers: {
                'Accept': 'application/vnd.github.v3+json',
              },
              next: { revalidate: 3600 }
            }
          );

          let lastCommit = {
            message: '',
            date: repo.updated_at
          };

          if (commitsResponse.ok) {
            const commitData = await commitsResponse.json();
            lastCommit = {
              message: commitData.commit.message,
              date: commitData.commit.author.date
            };
          }

          return {
            title: repo.name,
            description: repo.description || 'Descrição não disponível',
            tags: repo.topics.length > 0 ? repo.topics : [repo.language].filter(Boolean),
            github: repo.html_url,
            demo: repo.homepage || '',
            updatedAt: repo.updated_at,
            lastCommit
          };
        })
    );

    return projectsData.sort((a, b) => 
      new Date(b.lastCommit.date).getTime() - new Date(a.lastCommit.date).getTime()
    );
  } catch (error) {
    console.error('Erro ao buscar repositórios:', error);
    return [];
  }
} 