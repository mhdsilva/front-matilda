/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance } from 'axios';

class ApiService {
  private api: AxiosInstance;

  constructor(baseURL: string) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async login(
    identifier: string,
    password: string
  ): Promise<{ jwt: string; user: any } | undefined> {
    try {
      const response = await this.api.post('/auth/local', {
        identifier,
        password,
      });
      return response.data; // Retorna o token JWT e os dados do usuário
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // Método de registro
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<{ jwt: string; user: any } | undefined> {
    try {
      const response = await this.api.post('/auth/local/register', {
        username,
        email,
        password,
      });
      return response.data; // Retorna o token JWT e os dados do usuário
    } catch (error: any) {
      this.handleError(error);
    }
  }

  // Tratamento de erros
  private handleError(error: any): void {
    console.error('Erro na API:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Erro na API');
  }
}

const api = new ApiService('http://localhost:1337');

export default api;
