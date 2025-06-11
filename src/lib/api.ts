/**
 * API client for PollyTalkie backend services
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.pollytalkie.com/';

// Types for authentication
export interface User {
  id: string;
  loginName: string;
  name?: string;
  avatar?: string;
}

export interface MemberInfo {
  name: string;
  expireAt: number;
  studySeconds: number;
}

export interface AuthResponse {
  user: User;
  member?: MemberInfo;
  token: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export interface VerifyCodeResponse {
  id: string;
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
   * Send verification code for signup
   */
  sendVerifyCode: async (email: string, type: string): Promise<VerifyCodeResponse> => {
    const response = await fetch(`${API_BASE_URL}/web/notify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiver: email, type }),
    });
    
    return handleResponse<VerifyCodeResponse>(response);
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/web/auth/signin`, {
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
  signUp: async (email: string, password: string, code: string, id: string, name?: string): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/web/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, code, id, name }),
    });
    
    return handleResponse<AuthResponse>(response);
  },
  
  /**
   * Sign in with Google OAuth
   * This endpoint returns a URL to redirect the user to for Google authentication
   */
  getGoogleAuthUrl: async (): Promise<{ url: string }> => {
    const redirectUrl = `${window.location.origin}/auth/callback`;
    const response = await fetch(`${API_BASE_URL}/web/auth/google?redirectUrl=${encodeURIComponent(redirectUrl)}`, {
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
    const response = await fetch(`${API_BASE_URL}/web/auth/callback`, {
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
    
    await fetch(`${API_BASE_URL}/web/auth/signout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    
    // Clear local storage regardless of response
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    localStorage.removeItem('auth_member');
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
    
    const response = await fetch(`${API_BASE_URL}/web/auth/me`, {
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
    const token = localStorage.getItem('auth_token');
    if (!token) {
      throw {
        error: 'unauthorized',
        message: 'User is not authenticated',
        statusCode: 401
      } as ErrorResponse;
    }
    
    const response = await fetch(`${API_BASE_URL}/web/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    });
    
    return handleResponse<{ token: string }>(response);
  },
  
  /**
   * Request a password reset email
   */
  forgotPassword: async (email: string): Promise<void> => {
    const redirectUrl = `${window.location.origin}/auth/reset-password`;
    const response = await fetch(`${API_BASE_URL}/web/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, redirectUrl }),
    });
    
    return handleResponse<void>(response);
  },
  
  /**
   * Reset password with token
   */
  resetPassword: async (token: string, password: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/web/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    });
    
    return handleResponse<void>(response);
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
    
    const response = await fetch(`${API_BASE_URL}/web/auth/profile`, {
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
  localStorage.setItem('auth_user', JSON.stringify(data.user));
  if (data.member) {
    localStorage.setItem('auth_member', JSON.stringify(data.member));
  }
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
