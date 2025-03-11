// Tipos para habilidades
export interface Skill {
  id: string;
  name: string;
  level: string;
  category: string;
}

export interface SkillInput {
  name: string;
  level: string;
  category: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Função para obter o token JWT do cookie
const getAuthToken = (): string | null => {
  // Se estivermos no lado do cliente, pegamos o token dos cookies
  if (typeof window !== 'undefined') {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('auth_token='));
    return tokenCookie ? tokenCookie.split('=')[1] : null;
  }
  return null;
};

// Serviço de habilidades
const skillService = {
  // Listar todas as habilidades
  async getSkills(): Promise<Skill[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/skills`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar habilidades: ${response.status}`);
    }

    return response.json();
  },

  // Buscar habilidade por ID
  async getSkillById(id: string): Promise<Skill> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/skills/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar habilidade: ${response.status}`);
    }

    return response.json();
  },

  // Criar nova habilidade
  async createSkill(skillData: SkillInput): Promise<Skill> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/skills`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar habilidade: ${response.status}`);
    }

    return response.json();
  },

  // Editar habilidade existente
  async updateSkill(id: string, skillData: SkillInput): Promise<Skill> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/skills/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(skillData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar habilidade: ${response.status}`);
    }

    return response.json();
  },

  // Excluir habilidade
  async deleteSkill(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/skills/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir habilidade: ${response.status}`);
    }
  }
};

export default skillService; 