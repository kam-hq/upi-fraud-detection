import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  phone: string;
  name: string;
  role: 'investigator' | 'admin' | 'public';
}

interface AuthContextType {
  user: User | null;
  login: (phone: string, otp: string, userType: 'investigator' | 'public') => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('ai-upi-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, otp: string, userType: 'investigator' | 'public'): Promise<boolean> => {
    // Mock authentication - replace with real API call
    if ((userType === 'investigator' && otp === '123456') || (userType === 'public' && otp === '654321')) {
      const mockUser: User = {
        id: '1',
        phone,
        name: userType === 'investigator' ? 'Security Investigator' : 'Public User',
        role: userType === 'investigator' ? 'investigator' : 'public'
      };
      setUser(mockUser);
      localStorage.setItem('ai-upi-user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ai-upi-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};