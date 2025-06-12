import { useState, useContext, createContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  mobileNumber: string;
  login: (mobile: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');

  const login = (mobile: string) => {
    setMobileNumber(mobile);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setMobileNumber('');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, mobileNumber, login, logout }}>
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