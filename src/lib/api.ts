/**
 * API client for PollyTalk backend services
 */

const API_BASE_URL = 'https://api.zervice.me/pollytalk';

// Types for authentication
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

// Helper function to handle API responses
const handleResponse = async <T>(response: Response): Promise<T> => {
  const data = await response.json();
  
  if (!response.ok) {
    throw {
      error: data.error || 'Unknown error',
      message: data.message || 'An unexpected error occurred',
      statusCode: response.status
    } as ErrorResponse;
  }
  
  return data as T;
};

// Authentication API
export const authApi = {
  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    return handleResponse<AuthResponse>(response);
  },
  
  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string, name?: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    });
    
    return handleResponse<AuthResponse>(response);
  },
  
  /**
   * Sign in with Google OAuth
   * This endpoint returns a URL to redirect the user to for Google authentication
   */
  getGoogleAuthUrl: async (): Promise<{ url: string }> => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const response = await fetch(`${API_BASE_URL}/auth/google/url?redirectUrl=${encodeURIComponent(redirectUrl)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return handleResponse<{ url: string }>(response);
  },
  
  /**
   * Exchange OAuth code for tokens
   */
  exchangeOAuthCode: async (code: string, provider: string): Promise<AuthResponse> => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const response = await fetch(`${API_BASE_URL}/auth/oauth/callback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code, provider, redirectUrl }),
    });
    
    return handleResponse<AuthResponse>(response);
  },
  
  /**
   * Sign out the current user
   */
  signOut: async (): Promise<void> => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    
    await fetch(`${API_BASE_URL}/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // Clear local storage regardless of response
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_refresh_token');
    localStorage.removeItem('auth_user');
  },
  
  /**
   * Get the current user profile
   */
  getCurrentUser: async (): Promise<User> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw {
        error: 'unauthorized',
        message: 'User is not authenticated',
        statusCode: 401
      } as ErrorResponse;
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    return handleResponse<User>(response);
  },
  
  /**
   * Refresh the authentication token
   */
  refreshToken: async (): Promise<{ token: string }> => {
    const refreshToken = localStorage.getItem('auth_refresh_token');
    if (!refreshToken) {
      throw {
        error: 'unauthorized',
        message: 'No refresh token available',
        statusCode: 401
      } as ErrorResponse;
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    });
    
    return handleResponse<{ token: string }>(response);
  },
  
  /**
   * Request a password reset email
   */
  forgotPassword: async (email: string): Promise<{ message: string }> => {
    const redirectUrl = `${window.location.origin}/auth/reset-password`;
    const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirectUrl }),
    });
    
    return handleResponse<{ message: string }>(response);
  },
  
  /**
   * Reset password with token
   */
  resetPassword: async (token: string, password: string): Promise<{ message: string }> => {
    const response = await fetch(`${API_BASE_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    
    return handleResponse<{ message: string }>(response);
  },
  
  /**
   * Update user profile
   */
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw {
        error: 'unauthorized',
        message: 'User is not authenticated',
        statusCode: 401
      } as ErrorResponse;
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    
    return handleResponse<User>(response);
  }
};

// Helper function to set authentication data
export const setAuthData = (data: AuthResponse): void => {
  localStorage.setItem('auth_token', data.token);
  localStorage.setItem('auth_refresh_token', data.refreshToken);
  localStorage.setItem('auth_user', JSON.stringify(data.user));
};

// Helper function to get stored user
export const getStoredUser = (): User | null => {
  const userJson = localStorage.getItem('auth_user');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson) as User;
  } catch (error) {
    return null;
  }
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};
