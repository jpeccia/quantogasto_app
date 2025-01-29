import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Base URL da sua API (substitua com a URL real)
const BASE_URL = 'http://192.168.68.106:8080';  // Verifique se está correto

type FinancialSummary = {
  renda: number;
  gastosFixos: number;
  gastosVariaveis: number;
};

// Tipagem para o usuário
type User = {
  nome: string;
  foto_perfil?: string;
  cargo?: string;
  renda: number;
  token: string; // Adicionando o campo 'token' para autenticação
};

// Função para obter o token de autenticação
const getAuthToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('authToken');
    return token; // Retorna o token armazenado
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    throw error;
  }
};

// Função para obter o resumo financeiro
export const getFinancialSummary = async (): Promise<FinancialSummary | null> => {
  try {
    const token = await getAuthToken(); // Obtém o token de forma segura

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await axios.get(`${BASE_URL}/resumo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Usa o token para autenticação
      },
    });

    return response.data;  // Retorna os dados do resumo financeiro
  } catch (error: any) {
    // Verificação mais detalhada do erro
    if (error.response) {
      // Caso haja uma resposta da API
      console.error(`Erro na API: ${error.response.status} - ${error.response.data.message || error.response.statusText}`);
    } else if (error.request) {
      // Caso o pedido tenha sido feito, mas não houve resposta
      console.error('Erro de rede: Nenhuma resposta recebida');
    } else {
      // Outros erros
      console.error('Erro ao configurar a requisição:', error.message);
    }

    throw new Error('Erro ao obter o resumo financeiro. Tente novamente mais tarde.');  // Mensagem amigável para o usuário
  }
};

// Função para criar o usuário
export const createUser = async (userData: {
  nome: string;
  foto_perfil: string;
  cargo: string;
  renda: number;
}) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuarios`, userData);
    const { id, token } = response.data;

    // Verifica se o id e token estão presentes na resposta
    if (!id || !token) {
      throw new Error('Dados do usuário ausentes na resposta.');
    }

    console.log(`Usuário criado com ID: ${id} e Token: ${token}`);

    // Armazenar o token de forma segura
    await SecureStore.setItemAsync('authToken', token);
    await SecureStore.setItemAsync('userId', id.toString());

    // Verifique se o id está correto
    console.log(`Buscando dados do usuário com ID: ${id}`);

    const userDataResponse = await getUserData(id); // Chama a função para obter os dados do usuário

    return { id, token, userData: userDataResponse };
  } catch (error) {
    console.error('Erro ao criar o usuário:', error);
    throw error;
  }
};

// Função para obter dados do usuário
export const getUserData = async (id: number) => {
  try {
    const token = await getAuthToken();  // Obtém o token de forma segura

    if (!token) {
      throw new Error('Token não encontrado');
    }

    const response = await axios.get(`${BASE_URL}/usuarios/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Usa o token para autenticação
      },
    });

    return response.data;  // Retorna os dados do usuário
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw error;  // Lança o erro para ser tratado no componente
  }
};

// Função para enviar a foto do perfil do usuário
export const uploadProfilePhoto = async (photoUri: string) => {
  const token = await getAuthToken(); // Obtém o token de forma segura

  if (!token) {
    throw new Error('Token não encontrado');
  }

  const formData = new FormData();
  formData.append('foto', {
    uri: photoUri,
    type: 'image/jpeg', // Ajuste o tipo conforme o arquivo
    name: 'photo.jpg',  // Defina o nome do arquivo
  });

  try {
    const response = await axios.post(`${BASE_URL}/usuarios/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`, // Envia o token no header
      },
    });

    return response.data;  // Retorna os dados da resposta
  } catch (error) {
    console.error('Erro ao enviar a foto:', error);
    throw error; // Lança o erro para ser tratado no componente
  }
};
