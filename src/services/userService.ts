// Tipos para os usuários
export interface User {
  id: string;
  username: string;
}

export interface UserWithPassword {
  username: string;
  password: string;
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

// Serviço de usuários
const userService = {
  // Listar todos os usuários
  async getUsers(): Promise<User[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar usuários: ${response.status}`);
    }

    return response.json();
  },

  // Obter perfil do usuário logado
  async getProfile(): Promise<User> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/users/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar perfil: ${response.status}`);
    }

    return response.json();
  },

  // Criar novo usuário
  async createUser(userData: UserWithPassword): Promise<User> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar usuário: ${response.status}`);
    }

    return response.json();
  },

  // Editar usuário existente
  async updateUser(id: string, userData: UserWithPassword): Promise<User> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar usuário: ${response.status}`);
    }

    return response.json();
  },

  // Excluir usuário
  async deleteUser(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir usuário: ${response.status}`);
    }
  }
};

export default userService; 