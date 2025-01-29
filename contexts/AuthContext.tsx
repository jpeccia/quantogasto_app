import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, storeAuthToken, removeAuthToken, getUserData, storeUserData, removeUserData } from '../lib/storage';
import { createUser } from '@/lib/api';
import { View, Text } from 'react-native';

type User = {
  id: number;
  token?: string;
  name: string;
  photo?: string;
  occupation?: string;
  income: number;
};

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  register: (userData: any) => Promise<void>;
  login: (credentials: any) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      const token = await getAuthToken();
      const userData = await getUserData();
      
      if (token && userData) {
        setIsAuthenticated(true);
        setUser(userData);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function register(userData: any) {
    const response = await createUser({
      nome: userData.name,
      foto_perfil: userData.photo || '',
      cargo: userData.occupation || '',
      renda: userData.income,
    });

    const token = response.token;
    const newUser: User = { ...response.id, token };

    await storeAuthToken(token);
    await storeUserData(newUser);

    setIsAuthenticated(true);
    setUser(newUser);
  }

  async function logout() {
    await removeAuthToken();
    await removeUserData();
    
    setIsAuthenticated(false);
    setUser(null);
  }

  async function updateUser(userData: Partial<User>) {
    if (!user) return;

    const updatedUser = { ...user, ...userData };
    await storeUserData(updatedUser);
    setUser(updatedUser);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        register,
        login: async () => {},
        logout,
        updateUser,
      }}
    >
      {isLoading ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-white">Carregando...</Text> {/* Texto dentro de <Text> */}
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro do AuthProvider");
  }
  return context;
};
