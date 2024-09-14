"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

export interface AuthContextType {
  isAuthenticated: boolean;
  userId?: string;
  token?: string;
  name?: string;
  login: (token: string, name: string, userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [token, setToken] = useState<string | undefined>(undefined);
  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    // Verificar e recuperar os dados do localStorage ao iniciar
    const storedToken = localStorage.getItem('token');
    const storedName = localStorage.getItem('name');
    const storedUserId = localStorage.getItem('userId');

    if (storedToken && storedName && storedUserId) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setName(storedName);
      setUserId(storedUserId);
    }
  }, []);

  const login = (token: string, name: string, userId: string) => {
    console.log('Login called with:', { token, name, userId });
    setIsAuthenticated(true);
    setToken(token);
    setName(name);
    setUserId(userId);
    localStorage.setItem('token', token);
    localStorage.setItem('name', name);
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
    setToken(undefined);
    setName(undefined);
    setUserId(undefined);
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, token, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
