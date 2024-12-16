import { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export type Token = {
  accessToken: string;
  refreshToken: string;
};

interface IAuthContext {
  userId: string;
  role: string;
  email: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
  register: () => void;
}

interface IAuthProvider {
  children: React.ReactNode;
}

interface IUser {
  id: string;
  email: string;
  role: 'Reader' | 'Author';
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUser>({ id: 'someuuid', email: 'example@gmail.com', role: 'Reader'});
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      const decode = jwtDecode<IUser>(token);
      setUser({ id: decode.id, email: decode.email, role: decode.role });
    }
    setIsLoading(false);
  }, [isAuthenticated]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  const register = () => {
    setIsAuthenticated(true);
  };

  return (
    <AuthContext.Provider value={{ userId: user.id, role: user.role, email: user.email, isAuthenticated, isLoading, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен быть использован внутри AuthProvider');
  }
  return context;
};
