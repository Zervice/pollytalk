/**
 * API client for PollyTalkie backend services
 */
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.pollytalkie.com';

console.log("API base url: " + API_BASE_URL)

// Types for authentication
export interface User {
    id: string;
    loginName: string;
    name?: string;
    avatar?: string;
    setting?: Setting;
}

export interface Setting {
    nativeLang: string,
    learningLang: string
    voiceSpeed: string,
    voiceSpeaker: string,
    sendStudyReport: boolean,
    sendPracticeReport: boolean,
    sendSenseReport: boolean
}

export interface MemberInfo {
    name: string;
    expireAt: number;
    studySeconds: number;
    source?: string;
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
        // Handle the specific error format from your API
        if (data.message && data.status) {
            throw {
                message: data.message,
                status: data.status,
                statusCode: data.status,
                error: data.message
            } as ErrorResponse;
        }

        // Fallback to original error handling
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
            body: JSON.stringify({receiver: email, type}),
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
            body: JSON.stringify({email, password}),
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
            body: JSON.stringify({email, password, code, id, name}),
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
            body: JSON.stringify({code, provider, redirectUrl}),
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
            body: JSON.stringify({email, redirectUrl}),
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
            body: JSON.stringify({token, password}),
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

// Contact form API
export const contactApi = {
    sendContactForm: async (data: { name: string; email: string; subject: string; message: string }): Promise<void> => {
        const response = await fetch(`${API_BASE_URL}/web/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        return handleResponse<void>(response);
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

// ---------------- Payment & Subscription APIs ----------------
export const paymentApi = {
    /** Get current member info */
    getMember: async (): Promise<unknown> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        const res = await fetch(`${API_BASE_URL}/web/member`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return handleResponse<unknown>(res);
    },

    /** Check if subscription is cancelable */
    checkCancelable: async (): Promise<{ cancelable: boolean; subscriptionId?: string }> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        const res = await fetch(`${API_BASE_URL}/web/payment/cancelable`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return handleResponse<{ cancelable: boolean; subscriptionId?: string }>(res);
    },

    /** Cancel subscription */
    cancelSubscription: async (): Promise<void> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        const res = await fetch(`${API_BASE_URL}/web/payment/cancel`, {
            method: 'DELETE',
            headers: {Authorization: `Bearer ${token}`},
        });
        return handleResponse<void>(res);
    },

    /** Get packages list to resolve package name */
    getPackages: async (type: string, channel = 'web'): Promise<unknown[]> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        const res = await fetch(`${API_BASE_URL}/web/payment?type=${encodeURIComponent(type)}&channel=${encodeURIComponent(channel)}`, {
            headers: {Authorization: `Bearer ${token}`},
        });
        return handleResponse<unknown[]>(res);
    },

    /** Start Stripe checkout session for subscription */
    createSubscriptionSession: async (packageId: string | number): Promise<{ url: string }> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        const body = new URLSearchParams({id: String(packageId), token});
        const res = await fetch(`${API_BASE_URL}/web/payment/subscription`, {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: body.toString(),
        });
        // backend returns 302 redirect; fetch won't follow cross-origin; try to parse url header or json
        if (res.status === 302) {
            const redirect = res.headers.get('Location');
            if (redirect) return {url: redirect} as { url: string };
        }
        return handleResponse<{ url: string }>(res);
    },

    /** Get billing history with pagination support */
    getBillingHistory: async (page: string | null = null): Promise<BillingHistoryResponse> => {
        const token = localStorage.getItem('auth_token');
        if (!token) throw new Error('Not authenticated');
        
        const url = new URL(`${API_BASE_URL}/web/payment/stripe/billing`);
        if (page) {
            url.searchParams.append('page', page);
        }
        
        const res = await fetch(url.toString(), {
            headers: {Authorization: `Bearer ${token}`},
        });
        
        const response = await handleResponse<BillingHistoryResponse>(res);
        
        return response;
    },
};

// Dashboard API types
export interface DashboardStats {
    streak: string;
    conversations: string;
    wordsLearned: string;
    learningTime: string;
}

export interface RecentActivity {
    name: string;
    id: string;
    time: string;
    studyTime: string;
}

// Dashboard APIs
export const dashboardApi = {
    /**
     * Get dashboard statistics
     */
    getStats: async (): Promise<DashboardStats> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/dashboard`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse<DashboardStats>(response);
    },

    /**
     * Get recent chat activities
     */
    getRecentChats: async (): Promise<RecentActivity[]> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/dashboard/recent/chats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return handleResponse<RecentActivity[]>(response);
    }
};

export interface LanguageSettings {
    learningLang: string;
    nativeLang: string;
}

export type SupportedLanguage = 'zh-CN' | 'en-US' | 'fr-FR' | 'es-ES' | 'de-DE' | 'ja-JP' | 'ko-KR';

// Billing and Subscription types
export interface BillingItem {
    id: string;
    currency: string;
    paidAt: string;
    status: string;
    amountDue: string;
    amountPaid: string;
    dueDate: string | null;
    periodEnd: string;
    periodStart: string;
    invoicePdf: string;
    created: string;
    description: string | null;
    customerEmail: string | null;
    billingReason: string;
}

export interface BillingHistoryResponse {
    data: BillingItem[];
    nextPage: string | null;
    hasMore: boolean;
}

export interface SubscriptionInfo {
    plan: string;
    status: string;
    nextBillingDate: string;
    paymentMethod: string;
    // billingHistory: BillingItem[];
    unlimited: boolean;
    freeTrial: boolean;
    totalHours: number | null;
    usedHours: number | null;
}

// User profile API
export const userApi = {
    /**
     * Update user name
     */
    updateUserName: async (name: string): Promise<void> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/user`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({name}),
        });

        return handleResponse<void>(response);
    },

    /**
     * Update user language settings
     */
    updateLanguageSettings: async (settings: LanguageSettings): Promise<void> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/user/setting`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                learningLang: settings.learningLang,
                nativeLang: settings.nativeLang
            }),
        });

        return handleResponse<void>(response);
    },

    /**
     * Change user password
     */
    changePassword: async (currentPassword: string, newPassword: string): Promise<void> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/auth/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                currentPassword,
                newPassword
            }),
        });

        return handleResponse<void>(response);
    },

    /**
     * Delete user account
     */
    deleteUser: async (data: { name: string }): Promise<void> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw {
                error: 'unauthorized',
                message: 'User is not authenticated',
                statusCode: 401
            } as ErrorResponse;
        }

        const response = await fetch(`${API_BASE_URL}/web/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        return handleResponse<void>(response);
    }
};
