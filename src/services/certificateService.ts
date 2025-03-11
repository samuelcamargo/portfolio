// Tipos para os certificados
export interface Certificate {
  id: string;
  name: string;
  platform: string;
  date: string;
  url: string;
  category: string;
}

export interface CertificateInput {
  name: string;
  platform: string;
  date: string;
  url: string;
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

// Serviço de certificados
const certificateService = {
  // Listar todos os certificados
  async getCertificates(): Promise<Certificate[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar certificados: ${response.status}`);
    }

    return response.json();
  },

  // Buscar certificados por categoria
  async getCertificatesByCategory(category: string): Promise<Certificate[]> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates/category/${category}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar certificados por categoria: ${response.status}`);
    }

    return response.json();
  },

  // Buscar certificado por ID
  async getCertificateById(id: string): Promise<Certificate> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar certificado: ${response.status}`);
    }

    return response.json();
  },

  // Criar novo certificado
  async createCertificate(certificateData: CertificateInput): Promise<Certificate> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certificateData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar certificado: ${response.status}`);
    }

    return response.json();
  },

  // Editar certificado existente
  async updateCertificate(id: string, certificateData: CertificateInput): Promise<Certificate> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(certificateData)
    });

    if (!response.ok) {
      throw new Error(`Erro ao atualizar certificado: ${response.status}`);
    }

    return response.json();
  },

  // Excluir certificado
  async deleteCertificate(id: string): Promise<void> {
    const token = getAuthToken();
    if (!token) {
      throw new Error('Não autenticado');
    }

    const response = await fetch(`${API_URL}/certificates/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao excluir certificado: ${response.status}`);
    }
  }
};

export default certificateService; 