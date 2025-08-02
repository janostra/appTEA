import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type UserRole = 'adulto' | 'niño';

interface User {
  id: string;
  name: string;
  role: UserRole;
  email?: string;
  ID?: number; // Para compatibilidad con el backend
}

interface AuthContextProps {
  user: User | null;
  login: (userData: User) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAdult: boolean;
  isChild: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Cargar sesión guardada al inicio
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // 🔑 Login con persistencia
  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem('user', JSON.stringify(userData));
  };

  // 🚪 Logout con limpieza
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  // 🎭 Helpers para roles
  const isAdult = user?.role === 'adulto';
  const isChild = user?.role === 'niño';

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAdult, 
      isChild 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
