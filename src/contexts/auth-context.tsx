'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User, authApi, setAuthData, getStoredUser, isAuthenticated, ErrorResponse } from '@/lib/api'

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: ErrorResponse | null }>
  signUp: (email: string, password: string, name?: string) => Promise<{ error: ErrorResponse | null; data: User | null }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ error: ErrorResponse | null; data: User | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const initAuth = async () => {
      setIsLoading(true)
      
      // Try to get user from localStorage first
      const storedUser = getStoredUser()
      
      if (storedUser && isAuthenticated()) {
        try {
          // Verify the token by fetching current user
          const currentUser = await authApi.getCurrentUser()
          setUser(currentUser)
        } catch (error) {
          // If token is invalid, try to refresh it
          try {
            const { token } = await authApi.refreshToken()
            // Update token in localStorage
            localStorage.setItem('auth_token', token)
            // Fetch user again with new token
            const currentUser = await authApi.getCurrentUser()
            setUser(currentUser)
          } catch (refreshError) {
            // If refresh fails, clear auth data
            localStorage.removeItem('auth_token')
            localStorage.removeItem('auth_refresh_token')
            localStorage.removeItem('auth_user')
            setUser(null)
          }
        }
      } else {
        setUser(null)
      }
      
      setIsLoading(false)
    }

    initAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const authResponse = await authApi.signIn(email, password)
      setAuthData(authResponse)
      setUser(authResponse.user)
      return { error: null }
    } catch (error) {
      return { error: error as ErrorResponse }
    }
  }

  const signUp = async (email: string, password: string, name?: string) => {
    try {
      const authResponse = await authApi.signUp(email, password, name)
      setAuthData(authResponse)
      setUser(authResponse.user)
      return { data: authResponse.user, error: null }
    } catch (error) {
      return { data: null, error: error as ErrorResponse }
    }
  }

  const signOut = async () => {
    try {
      await authApi.signOut()
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      // Always clear local storage and state
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_refresh_token')
      localStorage.removeItem('auth_user')
      setUser(null)
    }
  }

  const signInWithGoogle = async () => {
    try {
      // Get the Google auth URL from the API
      const { url } = await authApi.getGoogleAuthUrl()
      
      // Redirect to Google auth page
      window.location.href = url
    } catch (error) {
      console.error('Error signing in with Google:', error)
    }
  }
  
  const updateProfile = async (data: Partial<User>) => {
    try {
      const updatedUser = await authApi.updateProfile(data)
      setUser(updatedUser)
      
      // Update stored user
      const userJson = localStorage.getItem('auth_user')
      if (userJson) {
        const storedUser = JSON.parse(userJson)
        localStorage.setItem('auth_user', JSON.stringify({ ...storedUser, ...data }))
      }
      
      return { data: updatedUser, error: null }
    } catch (error) {
      return { data: null, error: error as ErrorResponse }
    }
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    updateProfile
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
