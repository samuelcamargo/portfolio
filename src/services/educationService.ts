// Tipos para a educação
export interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
}

export interface EducationInput {
  title: string;
  institution: string;
  period: string;
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

// Serviço de educação
const educationService = {
  // Listar todos os registros de educação
  async getEducationList(): Promise<Education[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/education`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar educação: ${response.status}`);
    }

    return response.json();
  },

  // Buscar educação por ID
  async getEducationById(id: string): Promise<Education> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/education/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar educação: ${response.status}`);
    }

    return response.json();
  },

  // Criar novo registro de educação
  async createEducation(educationData: EducationInput): Promise<Education> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/education`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(educationData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar educação: ${response.status}`);
    }

    return response.json();
  },

  // Editar registro de educação existente
  async updateEducation(id: string, educationData: EducationInput): Promise<Education> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/education/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(educationData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar educação: ${response.status}`);
    }

    return response.json();
  },

  // Excluir registro de educação
  async deleteEducation(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/education/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir educação: ${response.status}`);
    }
  }
};

export default educationService; 