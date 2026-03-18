import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export const useAuth = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = storage.getItem('p5_user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const login = (username: string) => {
    storage.setItem('p5_user', username);
    setUser(username);
  };

  const logout = () => {
    storage.removeItem('p5_user');
    setUser(null);
  };

  return { user, login, logout, isLoggedIn: !!user };
};
