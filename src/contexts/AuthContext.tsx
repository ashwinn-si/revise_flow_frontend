import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiService, authAPI } from '../services/api';

export interface User {
  id: string;
  email: string;
  twoFactorEnabled: boolean;
  timezone?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; requiresTwoFactor?: boolean; error?: string }>;
  signup: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  verifyTwoFactor: (otp: string) => Promise<{ success: boolean; error?: string }>;
  refreshAuth: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  verifyResetToken: (token: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (token: string, password: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle auth failure events
  useEffect(() => {
    const handleAuthFailure = () => {
      console.log('Auth failure detected - clearing user state');
      setUser(null);
      toast.error('Your session has expired. Please login again.');
      navigate('/login', { replace: true });
    };

    window.addEventListener('auth-failure', handleAuthFailure);

    return () => {
      window.removeEventListener('auth-failure', handleAuthFailure);
    };
  }, [navigate]);

  // Initialize authentication on app start
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log('Initializing auth...');
        const success = await refreshAuth();
        if (!success) {
          console.log('Initial auth refresh failed');
          setUser(null);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const refreshAuth = async (): Promise<boolean> => {
    try {
      const response = await apiService.post('/auth/refresh');

      if (response.data?.accessToken) {
        apiService.setAuthToken(response.data.accessToken);

        if (response.data.user) {
          setUser(response.data.user);
        }

        return true;
      }

      return false;
    } catch (error: any) {
      console.log('Refresh auth failed:', error.response?.status);

      // If it's 401, clear auth state but don't show error (handled elsewhere)
      if (error.response?.status === 401) {
        setUser(null);
        apiService.setAuthToken(null);
      }

      return false;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await apiService.post('/auth/login', { email, password });

      if (response.data.accessToken) {
        apiService.setAuthToken(response.data.accessToken);
        setUser(response.data.user);
        toast.success('Login successful!');
        return { success: true };
      }

      if (response.data.requiresTwoFactor) {
        return { success: false, requiresTwoFactor: true };
      }

      return { success: false, error: 'Invalid credentials' };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials'
      };
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await apiService.post('/auth/signup', { email, password });
      toast.success('Signup successful! Please login.');
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Signup failed'
      };
    }
  };

  const verifyTwoFactor = async (otp: string) => {
    try {
      const response = await apiService.post('/auth/verify-otp', { otp });

      if (response.data.accessToken) {
        apiService.setAuthToken(response.data.accessToken);
        setUser(response.data.user);
        toast.success('Two-factor authentication successful!');
        return { success: true };
      }

      return { success: false, error: 'Invalid OTP' };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'OTP verification failed'
      };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      await authAPI.forgotPassword(email);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to send reset email'
      };
    }
  };

  const verifyResetToken = async (token: string) => {
    try {
      await authAPI.verifyResetToken(token);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Invalid or expired reset token'
      };
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authAPI.resetPassword(token, password);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.error || 'Failed to reset password'
      };
    }
  };

  const logout = () => {
    apiService.setAuthToken(null);
    setUser(null);

    toast.info('Logged out successfully');

    // Call logout endpoint to clear refresh token cookie
    apiService.post('/auth/logout').catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    verifyTwoFactor,
    refreshAuth,
    forgotPassword,
    verifyResetToken,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};