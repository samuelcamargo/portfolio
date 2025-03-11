// Tipos para experiências profissionais
export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface ExperienceInput {
  role: string;
  company: string;
  period: string;
  description: string;
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

// Serviço de experiências
const experienceService = {
  // Listar todas as experiências
  async getExperiences(): Promise<Experience[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/experiences`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar experiências: ${response.status}`);
    }

    return response.json();
  },

  // Buscar experiência por ID
  async getExperienceById(id: string): Promise<Experience> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/experiences/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar experiência: ${response.status}`);
    }

    return response.json();
  },

  // Criar nova experiência
  async createExperience(experienceData: ExperienceInput): Promise<Experience> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/experiences`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(experienceData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar experiência: ${response.status}`);
    }

    return response.json();
  },

  // Editar experiência existente
  async updateExperience(id: string, experienceData: ExperienceInput): Promise<Experience> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(experienceData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar experiência: ${response.status}`);
    }

    return response.json();
  },

  // Excluir experiência
  async deleteExperience(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/experiences/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir experiência: ${response.status}`);
    }
  }
};

export default experienceService; 