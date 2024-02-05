'use client'

import { createContext, useCallback, useState } from 'react'

import { api } from '@/services/api'

interface AuthProviderProps {
  children: React.ReactNode
}

interface AuthState {
  token: string
}

interface SignInCredentials {
  email: string
  password: string
}

export interface AuthContextData {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('@OrangePortfolios:token')

      if (token) {
        return { token }
      }
    }
    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post('/login', {
      email,
      password,
    })

    const { access_token: token } = response.data

    localStorage.setItem('@OrangePortfolios:token', token)

    setData({ token })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@OrangePortfolios:token')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}
