'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthChange } from '@/lib/authService';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: (User & { role: string }) | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  isBlogAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<(User & { role: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        setError('Connection to auth service timed out.');
      }
    }, 10000);

    try {
      const unsubscribe = onAuthChange((firebaseUser) => {
        if (firebaseUser) {
          // Simplest role implementation, can be hardened later
          const role = 'blog_admin';
          
          setUser({
            ...firebaseUser,
            role: role
          } as any);
        } else {
          setUser(null);
        }
        setLoading(false);
        setError(null);
        clearTimeout(timeout);
      });

      return () => {
        unsubscribe();
        clearTimeout(timeout);
      };
    } catch (err: any) {
      console.error('AuthProvider: Error setting up auth listener:', err);
      setLoading(false);
      setError('Failed to initialize authentication: ' + err.message);
      clearTimeout(timeout);
    }
  }, []);

  const value = {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    isBlogAdmin: user?.role === 'blog_admin',
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
