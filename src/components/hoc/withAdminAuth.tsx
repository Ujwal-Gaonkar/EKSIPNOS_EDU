// src/pages/context/AuthContext.tsx
import { createContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: string; // Include any other user properties that you might need
}

interface AuthContextProps {
  isAuthenticated: boolean;
  user: User | null; // User can be null if not logged in
  login: (token: string, role: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = (token: string, role: string) => {
    setIsAuthenticated(true);
    setUser({ id: '1', name: 'John Doe', role });
    // Here, you can set the token in localStorage or handle any login logic
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Here, you can remove the token from localStorage or handle any logout logic
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
