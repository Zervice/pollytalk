'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, MemberInfo, authApi, setAuthData, getStoredUser, isAuthenticated } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  member: MemberInfo | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, code: string, id: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  sendVerifyCode: (email: string, type: string) => Promise<{id: string}>;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  member: null,
  isLoading: true,
  isAuthenticated: false,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  updateProfile: async () => ({ id: '', loginName: '' }),
  sendVerifyCode: async () => ({ id: '' }),
  signInWithGoogle: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [member, setMember] = useState<MemberInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get stored user data
        const storedUser = getStoredUser();
        
        if (storedUser && isAuthenticated()) {
          try {
            // Verify the token by fetching current user
            const currentUser = await authApi.getCurrentUser();
            setUser(currentUser);
          } catch (error) {
            // If token is invalid, try to refresh it
            try {
              const { token } = await authApi.refreshToken();
              // Update token in localStorage
              localStorage.setItem('auth_token', token);
              // Fetch user again with new token
              const currentUser = await authApi.getCurrentUser();
              setUser(currentUser);
            } catch (refreshError) {
              // If refresh fails, clear auth data
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_refresh_token');
              localStorage.removeItem('auth_user');
              setUser(null);
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authApi.signIn(email, password);
      setAuthData(response);
      setUser(response.user);
      if (response.member) {
        setMember(response.member);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };
  
  const sendVerifyCode = async (email: string, type: string) => {
    try {
      return await authApi.sendVerifyCode(email, type);
    } catch (error) {
      console.error('Error sending verification code:', error);
      throw error;
    }
  };
  
  const signUp = async (email: string, password: string, code: string, id: string, name?: string) => {
    try {
      const response = await authApi.signUp(email, password, code, id, name);
      setAuthData(response);
      setUser(response.user);
      if (response.member) {
        setMember(response.member);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };
  
  const signOut = async () => {
    try {
      await authApi.signOut();
      setUser(null);
      setMember(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };
  
  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authApi.updateProfile(data);
      setUser(updatedUser);
      // Update stored user data
      localStorage.setItem('auth_user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  const signInWithGoogle = async () => {
    try {
      // Get the Google auth URL from the API
      const { url } = await authApi.getGoogleAuthUrl();
      
      // Redirect to Google auth page
      window.location.href = url;
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      member,
      isLoading,
      isAuthenticated: !!user,
      signIn,
      signUp,
      signOut,
      updateProfile,
      sendVerifyCode,
      signInWithGoogle,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context
}
