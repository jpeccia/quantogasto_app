import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Funções para armazenar e obter o token de autenticação
export const storeAuthToken = async (token: string) => {
  try {
    if (Platform.OS === 'web') {
      localStorage.setItem('authToken', token); // Usando localStorage no Web
    } else {
      await SecureStore.setItemAsync('authToken', token); // Usando SecureStore em dispositivos nativos
    }
  } catch (error) {
    console.error('Erro ao armazenar o token:', error);
  }
};

export const getAuthToken = async () => {
  try {
    if (Platform.OS === 'web') {
      return localStorage.getItem('authToken'); // Usando localStorage no Web
    } else {
      return await SecureStore.getItemAsync('authToken'); // Usando SecureStore em dispositivos nativos
    }
  } catch (error) {
    console.error('Erro ao obter o token:', error);
    return null;
  }
};

export const removeAuthToken = async () => {
  try {
    if (Platform.OS === 'web') {
      localStorage.removeItem('authToken'); // Removendo do localStorage no Web
    } else {
      await SecureStore.deleteItemAsync('authToken'); // Removendo do SecureStore em dispositivos nativos
    }
  } catch (error) {
    console.error('Erro ao remover o token:', error);
  }
};

// Funções para armazenar e obter os dados do usuário
export const storeUserData = async (user: any) => {
  try {
    await SecureStore.setItemAsync('userData', JSON.stringify(user));
  } catch (error) {
    console.error('Erro ao armazenar os dados do usuário:', error);
  }
};

export const getUserData = async () => {
  try {
    const userData = await SecureStore.getItemAsync('userData');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Erro ao obter os dados do usuário:', error);
    return null;
  }
};

export const removeUserData = async () => {
  try {
    await SecureStore.deleteItemAsync('userData');
  } catch (error) {
    console.error('Erro ao remover os dados do usuário:', error);
  }
};
