
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Substitua pela URL do seu back-end
});

// Função para registrar um usuário
export const registrarUsuario = async (dadosUsuario: {
  nome: string;
  fotoPerfil?: string;
  cargo?: string;
  renda: number;
}) => {
  try {
    const response = await api.post('/usuarios', dadosUsuario);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Função para obter o resumo financeiro
export const obterResumo = async () => {
  try {
    // Obtendo o token armazenado no AsyncStorage
    const token = await AsyncStorage.getItem('token');
    
    // Verificando se o token existe
    if (!token) {
      throw new Error('Token não encontrado');
    }

    // Fazendo a requisição para obter o resumo financeiro
    const response = await api.get('/resumo', {
      headers: {
        Authorization: `Bearer ${token}`, // Adicionando o token ao cabeçalho
      },
    });

    // Retornando os dados da resposta
    return response.data;
  } catch (error) {
    console.error('Erro ao obter resumo:', error);
    throw error; // Propagando o erro
  }
};


// Função para adicionar um gasto fixo
export const adicionarGastoFixo = async (dadosGasto: {
  nome: string;
  valor: number;
}) => {
  try {
    const response = await api.post('/gastos-fixos', dadosGasto, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar gasto fixo:', error);
    throw error;
  }
};

// Função para adicionar um gasto variável
export const adicionarGastoVariavel = async (dadosGasto: {
  nome: string;
  valor: number;
  data: string;
}) => {
  try {
    const response = await api.post('/gastos-variaveis', dadosGasto, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar gasto variável:', error);
    throw error;
  }
};

// Função para editar um gasto fixo
export const editarGastoFixo = async (gastoId: number, dadosGasto: {
  nome: string;
  valor: number;
}) => {
  try {
    const response = await api.put(`/gastos-fixos/${gastoId}`, dadosGasto, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar gasto fixo:', error);
    throw error;
  }
};

// Função para editar um gasto variável
export const editarGastoVariavel = async (gastoId: number, dadosGasto: {
  nome: string;
  valor: number;
  data: string;
}) => {
  try {
    const response = await api.put(`/gastos-variaveis/${gastoId}`, dadosGasto, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao editar gasto variável:', error);
    throw error;
  }
};

// Função para remover um gasto fixo
export const removerGastoFixo = async (gastoId: number) => {
  try {
    const response = await api.delete(`/gastos-fixos/${gastoId}`, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao remover gasto fixo:', error);
    throw error;
  }
};

// Função para remover um gasto variável
export const removerGastoVariavel = async (gastoId: number) => {
  try {
    const response = await api.delete(`/gastos-variaveis/${gastoId}`, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao remover gasto variável:', error);
    throw error;
  }
};

// Função para adicionar renda
export const adicionarRenda = async (valor: number) => {
  try {
    const response = await api.put('/renda', { valor }, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar renda:', error);
    throw error;
  }
};

// Função para obter dados do usuário
export const obterUsuario = async (usuarioId: number) => {
  try {
    const response = await api.get(`/usuarios/${usuarioId}`, {
      headers: { Authorization: `Bearer ${await AsyncStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao obter dados do usuário:', error);
    throw error;
  }
};

// Função para upload de foto de perfil
export const uploadFotoPerfil = async (foto: string) => {
  try {
    const formData = new FormData();
    formData.append('foto', {
      uri: foto,
      name: 'foto.jpg',
      type: 'image/jpeg',
    });

    const response = await api.post('/usuarios/foto', formData, {
      headers: {
        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    throw error;
  }
};