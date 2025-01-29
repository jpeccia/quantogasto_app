import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, storeAuthToken, removeAuthToken, getUserData, storeUserData } from '../lib/storage';
import { auth } from '../lib/api';

type User = {
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
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function register(userData: any) {
    const response = await auth.register(userData);
    await storeAuthToken(response.token);
    await storeUserData(response.user);
    setIsAuthenticated(true);
    setUser(response.user);
  }

  async function login(credentials: any) {
    const response = await auth.login(credentials);
    await storeAuthToken(response.token);
    await storeUserData(response.user);
    setIsAuthenticated(true);
    setUser(response.user);
  }

  async function logout() {
    await removeAuthToken();
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
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}