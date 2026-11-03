import { createContext, useState, useContext, useEffect } from 'react';
import { isTokenExpired } from '../utils/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');

    if (!token || !savedUser || isTokenExpired(token)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return null;
    }
    return JSON.parse(savedUser);
  });

  useEffect(() => {
    const handleExpired = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setUser(null);
    };
    window.addEventListener('auth-expired', handleExpired);
    return () => window.removeEventListener('auth-expired', handleExpired);
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}