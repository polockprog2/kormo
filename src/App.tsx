import React, { useState } from 'react';
import { LanguageProvider } from './components/LanguageContext';
import { AppRouter } from './components/AppRouter';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'worker';
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Mock login logic
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email.includes('client') ? 'client' : 'worker'
      };
      setUser(mockUser);
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string, role: 'client' | 'worker') => {
    setLoading(true);
    try {
      // Mock registration logic
      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        role
      };
      setUser(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <LanguageProvider>
      <AppRouter 
        user={user}
        loading={loading}
        login={login}
        register={register}
        logout={logout}
      />
    </LanguageProvider>
  );
}